import { PageProps } from "$fresh/server.ts";
import { Navbar } from "../components/Navbar.tsx";
import { Sidebar } from "../components/Sidebar.tsx";
import { Menu } from "../islands/Menu.tsx";

export type Route = {
    name: string,
    path: string,
    icon: string
}

export const routes: Route[] = [
    {
        name: 'Dashboard',
        path: '/',
        icon:'fa-chart-pie'
    },
    {
        name: 'Clients',
        path: '/clients',
        icon: 'fa-building'
    }
]

export const getRoute = (_routes: Route[], route: string) => {
    return _routes.find(({ path }) => {
        const _path = route.split('/')[1]
        return path.includes(_path)
       })
}


export default function Layout({ Component, route }: PageProps) {

    return (
        <div className="bg-[#FAFBFC] flex h-[fit-content]">
            <Sidebar>
                <Menu routes={routes} currentRoute={route} />
            </Sidebar>
            <div class="flex flex-column w-full h-[100vh] ml-[160px] overlow--y-auto" style={{
                flexDirection: 'column'
            }}>
                <Navbar>
                    <div class="flex w-full justify-between">
                        <div>
                            <strong className="text-2xl">
                               {getRoute(routes, route)?.name}
                            </strong>
                        </div>
                        <div>
                            Test
                        </div>
                    </div>
                </Navbar>
                <div class="p-[10px] mt-[64px]">
                    <Component />
                </div>
            </div>
        </div>
    );
}
