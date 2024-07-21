import { z } from "zod";

export const createCpeSchema = z.object({
    ip: z.string().max(255),
    cpe_name: z.string().max(255),
    uuid: z.string().nullish()
});

// Define the Zod schema for the `clients` table
export const updateCpeSchema = z.object({
    ip: z.string().max(255),
    status: z.string().max(255),
    protocol: z.string().max(255),
    interface: z.string().max(255),
    description: z.string().max(255),
});

export const updateCPEsSchema = z.array(updateCpeSchema);

export type UpdateCPEType = z.infer<typeof updateCpeSchema>;
export type CreateCPEType = z.infer<typeof createCpeSchema>;
export type UpdateCPEsType = z.infer<typeof updateCPEsSchema>;