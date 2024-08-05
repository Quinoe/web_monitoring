import { FreshContext } from "$fresh/server.ts";
import xlsxParser from 'npm:xlsx-parse-json';
import { parseMultipartRequest } from "npm:@mjackson/multipart-parser";

import { createClient } from "npm:@supabase/supabase-js";

const supabaseUrl = "https://smslhuphdqodyajevqhg.supabase.co"; // Replace with your Supabase URL
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtc2xodXBoZHFvZHlhamV2cWhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA0MDI2NTEsImV4cCI6MjAzNTk3ODY1MX0.AKuC62F2Z_uVdLdY3PF6anvjp6XjkEsvpm46sm7EMU4"; // Replace with your Supabase key
export const supabase = createClient(supabaseUrl, supabaseKey);

function camelToSnake(camelStr: string) {
    // Replace spaces with underscores and convert to lowercase
    return camelStr
        .replace(/ /g, '_') // Replace spaces with underscores
        .toLowerCase();     // Convert all characters to lowercase
}

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


                const chunks = []

                let done = false;

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

        if (excelData) {
        


            const data = excelData[sheetName]


            let transfromedData: any[] = []
            data.forEach((item: any) => {
                let row: Record<string, any> = {
                    created_at: Date.now(),
                    status: ''
                }
                const columns = Object.keys(data[0]).map((name) => {
                    return {
                        excel_name: name,
                        db_name: camelToSnake(name)
                    }
                })
                columns.forEach(({ excel_name, db_name }) => {
                    if (db_name === 'registered_date') {
                        row[db_name] = convertToMySQLDate(item[excel_name])
                    } else {
                        row[db_name] = item[excel_name]
                    }
                })


                transfromedData.push(row)
            })

            console.log(transfromedData)

            const { error: insertError } = await supabase
                .from("clients")
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