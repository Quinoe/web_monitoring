import { useEffect, useState } from "preact/hooks";
import { trpc } from "../utils/trpc.ts";
import type { inferRouterOutputs } from '@trpc/server';
import { effect } from '@preact/signals'
import type { AppRouter } from '../router.ts';
import { ClientTypeWithStatus, query } from "../models/Clients.ts";
import { filterType } from "./OverviewCard.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";

type RouterOutput = inferRouterOutputs<AppRouter>;

type PostCreateOutput = RouterOutput['clients.search'];

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getStatus = (status: string) => {
    switch (status) {
        case 'down':
            return (
                <div className="flex text-center  justify-center border-[1px] bg-[#FFE2E5] border-[#FA5A7D] text-[#FA5A7D] rounded-md w-[80px] p-[4px]">
                    {capitalizeFirstLetter(status)}
                </div>
            )

        case 'active':
            return (
                <div className="flex text-center  justify-center border-[1px] bg-[#DCFCE7] border-[#3CD856] text-[#3CD856] rounded-md w-[80px] p-[4px]">
                    {capitalizeFirstLetter(status)}
                </div>
            )


        default:
            return ''
    }
}

export function OverviewTable() {


    if (!IS_BROWSER) {
        return null
    }

    const [filter, setFilter] = useState<'active' | 'down' | ''>('')

    const [clients, setClients] = useState<PostCreateOutput>()
    const fetchPosts = (query: string, type?: 'active' | 'down' | '') => trpc["clients.search"].mutate({
        query,
        type
    }).then((data) => {
        setClients(data)
    });

    effect(() => {
        setFilter(filterType.value)
    })

    useEffect(() => {
        fetchPosts('', filter)
    }, [filter])

    useEffect(() => {
        fetchPosts('')
    }, [])

    return (
        <div class="flex flex-col">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div class="overflow-y-auto max-h-[250px]">
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
                                    (clients as ClientTypeWithStatus[])?.map(({ id_pelanggan, client_name, status, last_updated_status }) => {
                                        return (
                                            <tr class="border-b border-neutral-200 dark:border-white/10">
                                                <td class="whitespace-nowrap  px-6 py-4 font-medium">
                                                    {id_pelanggan}
                                                </td>
                                                <td class="whitespace-nowrap  px-6 py-4">
                                                    {client_name}
                                                </td>
                                                <td class="whitespace-nowrap  px-6 py-4">
                                                    {last_updated_status}
                                                </td>
                                                <td class="whitespace-nowrap  px-6 py-4">
                                                    {getStatus(status)}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
