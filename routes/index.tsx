import { OverviewCard } from "../islands/OverviewCard.tsx";
import { OverviewTable } from "../islands/OverviewTable.tsx";
import { Map } from "../islands/Map.tsx";
import { ClinetList, DashboardPage } from "../islands/ClientList.tsx";
import { Handlers } from "$fresh/server.ts";
import { WithSession } from "https://deno.land/x/fresh_session@beta-0.3.0/mod.ts";

export const handler: Handlers<
  unknown,
  WithSession<"authenticated", "true" | "false">
> = {
  GET(_req, ctx) {
    const { session } = ctx.state;

    if (Boolean(session.get("authenticated"))) {
      return ctx.render();
    }

    const headers = new Headers();

    headers.set("location", "/login");

    return new Response(null, {
      status: 303, // See Other
      headers,
    });

  },

};

export default function Home() {
  return (
    <div
      className="flex gap-[20px]"
      style={{
        flexDirection: "column",
      }}
    >
      
      <div class="flex gap-[20px] h-full">

        <div class="bg-[white] rounded-lg flex-1 p-[10px] h-full w-[100%] px-[20px] flex flex-col w-fit gap-[10px]">
          <OverviewCard />

          <div class="h-[300px] w-[95%]">
            <OverviewTable />
          </div>
        </div>
      </div>

      <div class="bg-[white] p-[10px] w-full px-[20px] flex w-fit gap-[10px] rounded-lg">
        <DashboardPage />
      </div>


    </div>
  );
}
