import { useSignal } from "@preact/signals";
import { Route, getRoute } from "../routes/_layout.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";

export const routes: Route[] = [
    {
        name: 'Dashboard',
        path: '/',
        icon: 'fa-chart-pie'
    },
    {
        name: 'Clients',
        path: '/clients',
        icon: 'fa-building'
    },
    {
        name: 'CPE',
        path: '/cpe',
        icon: 'fa-building'
    },
    {
        name: 'Sign out',
        path: '/signout',
        icon: (color: string) => (
            <div class="w-[16px] h-[16px items-center justify-center flex">
                <svg fill={color} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" /></svg>
            </div>
        )
    }
]
export function Menu({ currentRoute }: { currentRoute: string }) {
    const routePath = getRoute(routes, currentRoute)?.path ?? '';

    return (
        <ul>
            {
                routes.map((route) => {
                    const isActive = routePath === route.path
                    return (
                        <li
                            class={isActive ? "bg-[#7ABFFF] cursor-pointer items-center rounded-md flex text-[white] gap-[10px] p-[10px]" : "cursor-pointer items-center flex gap-[10px] flex p-[10px]"}
                            onClick={() => {
                                window.location.replace(route.path);
                            }}
                        >
                            <div className="flex h-full items-center">
                                {
                                    typeof route.icon === 'string' && (
                                        <i className={`fa ${route.icon}`}>
                                        </i>
                                    )
                                }
                                {
                                    typeof route.icon === "function" && IS_BROWSER && (
                                        route.icon?.(isActive ? 'white' : '#737791')
                                    )
                                }

                            </div>
                            <div>

                                {route.name}
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    );
}
