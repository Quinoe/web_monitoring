import { trpc } from "../utils/trpc.ts";
import { useState, useEffect } from "preact/hooks";
import { signal } from "@preact/signals";

import type { inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '../router.ts';


type RouterOutput = inferRouterOutputs<AppRouter>;

type PostAggregateOutput = RouterOutput['clients.aggregate'];

export function OverviewCard() {
    const [aggregate, setAggregate] = useState<PostAggregateOutput>()
    const statuses = [
        {
            key: "total_clients",
            icon: "fa-building",
            background: "#DEF5FF",
            description: `${aggregate?.percentageChange}% new clients from last month`,
            title: "Total clients",
            iconBackground: "#7ABFFF",
            count: aggregate?.totalClient,
        },
        {
            key: "total_status_down",
            icon: (
                <div class="w-[18px] h-[18px]">
                    <svg fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
                    </svg>
                </div>
            ),
            background: "#FFE2E5",
            title: "Down",
            description: "",
            iconBackground: "#FA5A7D",
            count: aggregate?.totalInactiveClients,
        },
        {
            key: "total_status_active",
            icon: "fa-signal",
            background: "#DCFCE7",
            title: "Active",
            description: "",
            iconBackground: "#3CD856",
            count: aggregate?.totalActiveClients,
        },
        {
            key: "total_new_clients",
            icon: "fa-building",
            background: "#F3E8FF",
            title: "New clients",
            description: "",
            iconBackground: "#BF83FF",
            count: aggregate?.currentMonthTotal,
        },
    ] as any[];


    const fetchClientAggregate = () => trpc["clients.aggregate"].query().then((data) => {
        setAggregate(data)
    });

    useEffect(() => {
        fetchClientAggregate()
    }, [])


    return (
        <div class="flex gap-[10px]">
            {
                aggregate ? (
                    <>
                        {statuses.map(
                            ({
                                title,
                                iconBackground,
                                background,
                                count,
                                icon,
                                description,
                            }) => {
                                return (
                                    <div
                                        class="w-[130px] h-[200px] flex justify-between p-[10px] rounded-lg"
                                        style={{
                                            flexDirection: "column",
                                            background: background,
                                        }}
                                    >
                                        <div style={{
                                            background: iconBackground
                                        }} class="rounded-full  w-[32px] h-[32px] flex justify-center items-center">
                                            {
                                                (typeof icon === 'string' && icon.length) ? (
                                                    <i class={`fa ${icon} text-white`}></i>
                                                ) : (
                                                    icon
                                                )
                                            }

                                        </div>
                                        <div className="text-2xl font-bold">
                                            {count}
                                        </div>
                                        <div className="text-md">
                                            {title}
                                        </div>
                                        <div className="text-xs">
                                            {description}
                                        </div>
                                    </div>
                                );
                            }
                        )}
                    </>
                ) : (
                    <div>
                        Loading...
                    </div>
                )
            }

        </div>

    );
}
