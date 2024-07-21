
import { trpc } from "../utils/trpc.ts";
import { useState, useEffect } from "preact/hooks";
import { signal } from "@preact/signals";

import type { inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '../router.ts';
import { ClientTypeWithStatus } from "../models/Clients.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { getStatus } from "./OverviewTable.tsx";

type RouterOutput = inferRouterOutputs<AppRouter>;

type PostCreateOutput = RouterOutput['clients.search'];

const searchQuery = signal('')


export function ClinetList() {
    const [clients, setClients] = useState<PostCreateOutput>([]);

    const fetchPosts = (query: string) => trpc["clients.search"].query({ query }).then(setClients);

    useEffect(() => {
        fetchPosts('')
    }, [])

    useEffect(() => {
        fetchPosts(searchQuery.value)
    }, [searchQuery.value])

    if (!IS_BROWSER) {
        return null
    }

    const handleInputChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        searchQuery.value = target.value
    };

    return (
        <div
            class="flex h-full"
            style={{
                flexDirection: "column",
                gap: "10px",
            }}
        >
            <div>
                <label
                    for="default-search"
                    class="mb-2 text-sm font-medium text-gray-900 sr-only"
                >
                    Search
                </label>
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            class="w-4 h-4 text-gray-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        value={searchQuery.value}
                        class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
                        onInput={handleInputChange}
                        placeholder="Search..."
                    />
                </div>
            </div>
            <div
                style={{
                    flexDirection: "column",
                }}
                class="border-[1px] flex border-[#ccc] flex-1 bg-[white] w-full h-full rounded-lg"
            >
                {
                    (clients as ClientTypeWithStatus[]).map((client) => {
                        return (
                            <div class="border-b-[1px] border-[#ccc] flex justify-between px-[10px] py-[10px]">
                                <div
                                    class="flex"
                                    style={{
                                        flexDirection: "column",
                                    }}
                                >
                                    <div>
                                        <strong>
                                            {client.client_name}
                                        </strong>
                                    </div>
                                    <div class="flex gap-[10px]">
                                        <div>
                                            {client.cpe}
                                        </div>
                                        <div>
                                            -
                                        </div>
                                        <div>
                                            -
                                        </div>
                                    </div>
                                    <div class="text-[14px]">
                                        {client.address}
                                    </div>
                                </div>
                                <div>
                                    {getStatus(client.status)}
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    );
}
