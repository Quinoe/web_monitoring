import { z } from "zod";

import { Query } from "https://deno.land/x/sql_builder/mod.ts";
import { Where } from "https://deno.land/x/sql_builder@v1.9.2/where.ts";

// Define the Zod schema for the `clients` table
export const clientSchema = z.object({
    id_pelanggan: z.string().max(255),
    client_name: z.string().nonempty(),
    cpe: z.string().nonempty(),
    port: z.string().nonempty(),
    service: z.string(),
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
    address: z.string().nonempty(),
    pic_name: z.string().nonempty(),
    pic_email: z.string(),
    registered_date: z.string().nonempty(), // assuming registered_date is a string; if it's a date object, use z.date()
});

export const clientSchemaWithStatus = z.object({
    id_pelanggan: z.string().max(255),
    client_name: z.string().nonempty(),
    cpe: z.string().nonempty(),
    port: z.string().nonempty(),
    service: z.string(),
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
    address: z.string().nonempty(),
    pic_name: z.string().nonempty(),
    pic_email: z.string(),
    registered_date: z.string().nonempty(), // assuming registered_date is a string; if it's a date object, use z.date(),
    status: z.string().max(255),
    last_updated_status: z.string(),
    ip: z.string()
});


export const ClientsSchema = z.array(clientSchema);

export const ClientsSchemaWithStatus = z.array(clientSchemaWithStatus);

export type ClientType = z.infer<typeof clientSchema>;
export type ClientTypeWithStatus = z.infer<typeof clientSchemaWithStatus>;
export type ClientsType = z.infer<typeof ClientsSchema>;

const buildInsertQuery = (tableName: string, data: ClientType) => {
    const builder = new Query();
    const sql = builder.table(tableName).insert(data).build();
    return sql;
};

const buildSelectQuery = (tableName: string, schema: typeof clientSchema) => {
    const builder = new Query();
    const fields = Object.keys(schema.shape);
    const sql = builder.table(tableName).select(...fields).build();
    return sql;
};

const buildUpdateQuery = (
    tableName: string,
    data: Partial<ClientType>,
) => {
    const builder = new Query();
    const sql = builder.table(tableName).where(Where.eq('id_pelanggan', data.id_pelanggan)).update(data)
        .build();
    return sql;
};

const buildDeleteQuery = (tableName: string, id: string) => {
    const builder = new Query();
    const sql = builder.table(tableName).where(Where.eq("id_pelanggan", id)).delete()
        .build();
    return sql;
};

export const query = {
    buildInsertQuery,
    buildSelectQuery,
    buildUpdateQuery,
    buildDeleteQuery,
};
