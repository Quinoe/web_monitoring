import { useSignal } from "@preact/signals";
import { Route, getRoute, routes } from "../routes/_layout.tsx";

export function Menu({ routes, currentRoute }: { routes: Route[], currentRoute: string }) {
    const routePath = getRoute(routes, currentRoute)?.path ?? '';

    return (
        <ul>
            {
                routes.map(({ path, name, icon }) => {
                    const isActive = routePath === path 
                    return (
                        <li
                        class={isActive ? "bg-[#7ABFFF] rounded-md flex text-[white] gap-[10px] p-[10px]" : "gap-[10px] flex p-[10px]"}
                        onClick={() => {
                            window.location.replace(path);
                        }}
                    >
                        <div>
                            <i className={`fa ${icon}`}>

                            </i>
                        </div>
                        <div>

                        {name}
                        </div>
                    </li>
                    )
                })
            }
        </ul>
    );
}
