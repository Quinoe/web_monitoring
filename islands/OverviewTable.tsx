import { useEffect, useState } from "preact/hooks";
import { trpc } from "../utils/trpc.ts";
import type { inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '../router.ts';
import { ClientType } from "../models/Clients.ts";

type RouterOutput = inferRouterOutputs<AppRouter>;

type PostCreateOutput = RouterOutput['clients.get'];


export function OverviewTable() {
    const [clients, setClients] = useState<PostCreateOutput>()
    const fetchPosts = (query: string) => trpc["clients.search"].query({ query, limit: 3 }).then(setClients);

    useEffect(() => {
        fetchPosts('')
    }, [])

    return (
        <div class="flex flex-col">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div class="overflow-hidden">
                        <table class="min-w-full text-center text-sm font-light text-surface dark:text-white">
                            <thead class="border-b border-neutral-200 bg-neutral-50 font-medium dark:border-white/10 dark:text-neutral-800">
                                <tr>
                                    <th scope="col" class=" px-6 py-4">ID Pelanggan</th>
                                    <th scope="col" class=" px-6 py-4">
                                        Client name
                                    </th>
                                    <th scope="col" class=" px-6 py-4">Last downtime</th>
                                    <th scope="col" class=" px-6 py-4">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="text-[black]">
                                {
                                    (clients as ClientType[])?.map(({ id_pelanggan , client_name, }) => {
                                        return (
                                            <tr class="border-b border-neutral-200 dark:border-white/10">
                                    <td class="whitespace-nowrap  px-6 py-4 font-medium">
                                        {id_pelanggan}
                                    </td>
                                    <td class="whitespace-nowrap  px-6 py-4">
                                      {client_name}
                                    </td>
                                    <td class="whitespace-nowrap  px-6 py-4">
                                      07/01/2024 07:00:00
                                    </td>
                                    <td class="whitespace-nowrap  px-6 py-4">
                                        <div className="flex text-center  justify-center border-[1px] bg-[#DCFCE7] border-[#3CD856] text-[#3CD856] rounded-md w-[100px] p-[10px]">
                                            Active
                                        </div>
                                    </td>
                                </tr>
                                        )
                                    })
                                }
                                
                                x
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
