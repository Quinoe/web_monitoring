import { initTRPC } from "@trpc/server";
import { z } from "zod";

import {
  clientSchema,
  ClientsSchemaWithStatus,
  ClientType,
  ClientTypeWithStatus,
} from "./models/Clients.ts"; // Import the schema and type
import { Client } from "https://deno.land/x/mysql/mod.ts";
import { createClient } from "npm:@supabase/supabase-js";
import { endOfMonth, startOfMonth, subMonths } from "npm:date-fns";
import { createCpeSchema } from "./models/CPE.ts";
import stringCompare from 'npm:string-comparison'

const t = initTRPC.create();
const router = t.router;
const publicProceducre = t.procedure;

const client = await new Client().connect({
  hostname: "127.0.0.1",
  username: "root",
  db: "snape_db",
  password: "adminadmin",
});

const supabaseUrl = "https://smslhuphdqodyajevqhg.supabase.co"; // Replace with your Supabase URL
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtc2xodXBoZHFvZHlhamV2cWhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA0MDI2NTEsImV4cCI6MjAzNTk3ODY1MX0.AKuC62F2Z_uVdLdY3PF6anvjp6XjkEsvpm46sm7EMU4"; // Replace with your Supabase key
const supabase = createClient(supabaseUrl, supabaseKey);

function convertToMySQLDate(dateString: string) {
  // Split the date and time parts
  const [datePart, timePart] = dateString.split(", ");

  // Split the date part into month, day, and year
  const [month, day, year] = datePart.split("/").map((part) =>
    parseInt(part, 10)
  );

  // Ensure the date is valid
  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    throw new Error("Invalid date");
  }

  // Format month and day to be two digits
  const formattedMonth = String(month).padStart(2, "0");
  const formattedDay = String(day).padStart(2, "0");

  // Return the formatted date as YYYY-MM-DD
  return `${year}-${formattedMonth}-${formattedDay}`;
}

const getStartAndEndOfMonth = (date: Date) => {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  return { start, end };
};

const getStatus = (status: string) => {
  switch (true) {
    case status.toLowerCase().includes("up"):
      return "active";
    case status.toLowerCase().includes("down"):
    case status.toLowerCase().includes("admin down"):
      return "down";
    default:
      return status;
  }
};

const getClientsWithStatus = async (
  data: ClientType[],
  status?: "active" | "down",
) => {
  const clients = await Promise.all(
    data.map(async ({ registered_date, ...rest }: any) => {
      const { data: cpe, error: cpeError } = await supabase
        .from("cpe")
        .select("*")
        .eq("cpe_name", rest.cpe)
        .single();

      if (!cpe) {
        return {
          ...rest,
          registered_date: new Date(registered_date).toLocaleString(),
          latitude: Number(rest.latitude),
          longitude: Number(rest.longitude),
          status: '-',
          last_updated_status: '-',
          ip: '-'
        }
      }

      const { data: cpeStatus, error: cpeStatusError } = await supabase
        .from("cpe_status")
        .select("*")
        .eq("ip", cpe.ip)

      const latestStatus = (cpeStatus ?? []).filter((status) => {
        const interfaceData = status?.inteface ?? ''
        const port = rest?.port ?? ''
        return interfaceData.trim() === port.trim()
      })?.sort((a, b) => {
        return (b.updated_at ?? 0) - (a.updated_at ?? 0)
      })[0]

      return {
        ...rest,
        registered_date: new Date(registered_date).toLocaleString(),
        latitude: Number(rest.latitude),
        longitude: Number(rest.longitude),
        status: getStatus(
          cpeError || cpeStatusError ? "" : (latestStatus?.status ?? ''),
        ),
        last_updated_status: latestStatus?.updated_at || latestStatus?.created_at  ? `${latestStatus?.updated_at ?? latestStatus?.created_at}` : '',
        ip: cpe.ip
      };
    }),
  );

  return clients.filter(({ status: clientStatus }) =>
    status === undefined ? true : status === clientStatus
  ).sort((a, b) => {
  return (+b.last_updated_status ?? 0) - (+a.last_updated_status ?? 0)
  });
};

// Define a schema that allows any JSON object
const dynamicObjectSchema = z.record(z.unknown());

// Define the schema for an array of such objects
const updateSchema = z.array(dynamicObjectSchema);

export const appRouter = router({
  "clients.get": publicProceducre.query(async () => {
    const { data: clientsData, error: clientsError } = await supabase
      .from("clients")
      .select("*");

    if (clientsError) {
      return new Response(JSON.stringify({ error: clientsError.message }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      const clients = await getClientsWithStatus(clientsData);

      const validatedClients = ClientsSchemaWithStatus.parse(
        clients,
      ) as ClientTypeWithStatus[];

      return validatedClients;
    } catch (e: any) {
      return new Response(JSON.stringify({ error: e.message || e.errors }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
  }),
  "clients.search": publicProceducre
    .input(z.object({
      query: z.string(),
      limit: z.number().optional(),
      type: z.string().optional()
    }))
    .mutation(async ({ input }) => {
      const { query, limit, type } = input;

      const { data, error } = limit
        ? await supabase
          .from("clients")
          .select("*")
          .ilike("client_name", `%${query}%`).limit(limit)
        : await supabase
          .from("clients")
          .select("*")
          .ilike("client_name", `%${query}%`);

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      const clients = await getClientsWithStatus(data);

      const list = clients.filter((client) => {
        if (type) {
          return client.status === type
        }
        return true
      })

      try {
        const validatedClients = ClientsSchemaWithStatus.parse(
          list
        ) as any as ClientTypeWithStatus[];
        return validatedClients;
      } catch (e) {
        return new Response(JSON.stringify({ error: e.errors }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
    }),
  "clients.aggregate": publicProceducre.query(async () => {
    const currentMonth = new Date();
    const lastMonth = subMonths(currentMonth, 1);

    const { start: currentMonthStart, end: currentMonthEnd } =
      getStartAndEndOfMonth(currentMonth);
    const { start: lastMonthStart, end: lastMonthEnd } = getStartAndEndOfMonth(
      lastMonth,
    );

    const currentMonthData = await supabase
      .from("clients")
      .select("*")
      .gte("registered_date", currentMonthStart.toISOString())
      .lte("registered_date", currentMonthEnd.toISOString());

    const lastMonthData = await supabase
      .from("clients")
      .select("*")
      .gte("registered_date", lastMonthStart.toISOString())
      .lte("registered_date", lastMonthEnd.toISOString());

    const totalClients = await supabase
      .from("clients")
      .select("*");

    const activeClients = await getClientsWithStatus(
      totalClients.data as ClientType[],
      "active",
    );

    const downClients = await getClientsWithStatus(
      totalClients.data as ClientType[],
      "down",
    );

    if (currentMonthData.error || lastMonthData.error) {
      throw new Error("Error fetching data from Supabase");
    }

    const currentMonthTotal = currentMonthData.data.length;
    const lastMonthTotal = lastMonthData.data.length;
    const difference = currentMonthTotal - lastMonthTotal;
    const percentageChange = lastMonthTotal === 0
      ? (currentMonthTotal === 0 ? 0 : 100)
      : ((difference / lastMonthTotal) * 100);

    return {
      currentMonthTotal,
      lastMonthTotal,
      difference,
      percentageChange,
      totalClient: totalClients.data?.length ?? 0,
      totalActiveClients: activeClients.length ?? 0,
      totalInactiveClients: downClients.length ?? 0,
    };
  }),
  "clients.create": publicProceducre
    .input(clientSchema)
    .mutation(async ({ input }) => {
      input.registered_date = convertToMySQLDate(input.registered_date);
      const { data, error } = await supabase
        .from("clients")
        .insert([{ ...input, status: "", created_at: Date.now() }]);

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      return data;
    }),
  "clients.delete": publicProceducre
    .input(z.object({
      id: z.string(),
    }))
    .mutation(async ({ input }) => {
      const { data, error } = await supabase
        .from("clients")
        .delete()
        .eq("id_pelanggan", input.id);

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      return data;
    }),
  "clients.update": publicProceducre
    .input(clientSchema)
    .mutation(async ({ input }) => {
      input.registered_date = convertToMySQLDate(input.registered_date);
      const { data, error } = await supabase
        .from("clients")
        .update({
          ...input,
          updated_at: Date.now(),
        })
        .eq("id_pelanggan", input.id_pelanggan);

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      return data;
    }),
  "cpe.create": publicProceducre
    .input(createCpeSchema)
    .mutation(async ({ input: cpe }) => {
      const { ip, ...rest } = cpe;

      // Check if the IP exists in the table
      const { data: existingCPE, error: selectError } = await supabase
        .from("cpe")
        .select("*")
        .eq("ip", ip)
        .single();

      if (selectError && selectError.code !== "PGRST116") {
        // Handle error (other than "No rows returned" error)
        throw new Error(`Error checking IP: ${selectError.message}`);
      }

      if (existingCPE) {
        throw new Error(`Entity exist`);
      } else {
        // If IP does not exist, insert a new entry
        const { error: insertError } = await supabase
          .from("cpe")
          .insert({
            uuid: crypto.randomUUID(),
            ip,
            ...rest,
            created_at: Date.now(),
          });

        if (insertError) {
          throw new Error(`Error inserting IP: ${insertError.message}`);
        }
      }
    }),
  "cpe.get": publicProceducre
    .query(async () => {
      // Check if the IP exists in the table
      const { data } = await supabase
        .from("cpe")
        .select("*");

      return data;
    }),
  "cpe.update": publicProceducre
    .input(createCpeSchema)
    .mutation(async ({ input }) => {
      const { data, error } = await supabase
        .from("cpe")
        .update({
          ...input,
          updated_at: Date.now(),
        })
        .eq("uuid", input.uuid);

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      return data;
    }),
  "cpe.delete": publicProceducre.input(createCpeSchema)
    .mutation(async ({ input }) => {
      // Check if the IP exists in the table
      const { data, error } = await supabase
        .from("cpe")
        .delete()
        .eq("uuid", input.uuid);

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      return data;
    }),
  "cpe_status.update": publicProceducre
    .input(updateSchema)
    .mutation(async ({ input }) => {
      const updatedAt = Date.now();


      for (const cpe of input) {
        const { ip, ...rest } = cpe;

        // Check if the IP exists in the table
        const { data: existingCPE, error: selectError } = await supabase
          .from("cpe_status")
          .select("*")
          .eq("ip", ip)
          .eq("interface", cpe.interface || cpe.port)

        if (selectError && selectError.code !== "PGRST116") {
          // Handle error (other than "No rows returned" error)
          throw new Error(`Error checking IP: ${selectError.message}`);
        }

        const cpe_status = {
          "interface": rest.interface || rest.port,
          "status": rest.status || rest.link,
          "protocol": rest.protocol || '',
          "description": rest.description || rest.desc,
        }

        if (existingCPE?.[0] !== undefined) {
          const updated = {
            ...existingCPE?.[0],
            ...cpe_status,
            ip,
            updated_at: updatedAt,
          };

          // If IP exists, update the entry
          const { error: updateError } = await supabase
            .from("cpe_status")
            .update(updated)
            .eq('uuid', updated.uuid)
            .eq("ip", ip)
            .eq("interface", cpe.interface || cpe.port);


          if (updateError) {
            throw new Error(`Error updating status` + updateError.message);
          }
        } else {
          const updated = {
            ...existingCPE?.[0],
            ...cpe_status,
            uuid: crypto.randomUUID(),
            ip,
            created_at: updatedAt,
          };
          // If IP exists, update the entry
          const { error: createError } = await supabase
            .from("cpe_status")
            .insert(updated);

          if (createError) {
            throw new Error(`Error updating status`);
          }
        }
      }
    }),
});

export type AppRouter = typeof appRouter;
