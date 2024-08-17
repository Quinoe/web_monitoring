import { FreshContext } from "$fresh/server.ts";
import xlsxParser from 'npm:xlsx-parse-json';
import { parseMultipartRequest } from "npm:@mjackson/multipart-parser";

import { createClient } from "npm:@supabase/supabase-js";

const supabaseUrl = "https://smslhuphdqodyajevqhg.supabase.co"; // Replace with your Supabase URL
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtc2xodXBoZHFvZHlhamV2cWhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA0MDI2NTEsImV4cCI6MjAzNTk3ODY1MX0.AKuC62F2Z_uVdLdY3PF6anvjp6XjkEsvpm46sm7EMU4"; // Replace with your Supabase key
export const supabase = createClient(supabaseUrl, supabaseKey);

export const handler = async (req: any, _ctx: any): Response => {
    if (req.method === "POST") {
        // The parser `yield`s each MultipartPart as it becomes available
        let sheetName = ''
        let excelData: any
        for await (let part of parseMultipartRequest(req)) {
            if (part.name === 'sheet_name') {
                sheetName = await part.text()
            } else {
                // Get the reader from the ReadableStream
                const reader = part.body.getReader();


                const chunks: any[] = []

                let done = false;

                console.log(chunks)

                // Read from the stream and write to the file
                while (!done) {
                    const { done: readerDone, value } = await reader.read();
                    if (value) {
                        chunks.push(value);
                    }

                    if (readerDone) {
                        done = readerDone
                        break;

                    }

                }


                const data = await xlsxParser
                    .onFileSelection(new Blob(chunks))

                excelData = data

            }

        }

        console.log(sheetName, excelData)
        if (excelData) {
            const columns = [{
                excel_name: 'IP',
                db_name: 'ip',
            }, {
                excel_name: 'CPE',
                db_name: 'cpe_name',
            }, {
                excel_name: 'Command',
                db_name: 'command'
            }, {
                excel_name: 'Username',
                db_name: 'username'
            }, {
                excel_name: 'Password',
                db_name: 'password'
            }]


            const data = excelData[sheetName]

            let transfromedData: any[] = []
            data.forEach((item: any) => {
                let row: Record<string, any> = {
                    uuid: crypto.randomUUID(),
                    created_at: Date.now()
                }
                columns.forEach(({ excel_name, db_name }) => {
                    row[db_name] = item[excel_name]
                })

                transfromedData.push(row)
            })

            const { error: insertError } = await supabase
                .from("cpe")
                .insert(transfromedData);

            if (insertError) {
                return new Response(`Error inserting IP: ${insertError.message}`, {
                    status: 200, // See Other
                });
            }

            return new Response(JSON.stringify(excelData[sheetName]), {
                status: 200, // See Other
            });
        }


        return new Response("Method Not Allowed", { status: 405 });
    };
}