import { PageProps } from "$fresh/server.ts";
import { Navbar } from "../components/Navbar.tsx";
import { Sidebar } from "../components/Sidebar.tsx";
import { Menu } from "../islands/Menu.tsx";
import { routes } from '../islands/Menu.tsx'

export type Route = {
    name: string,
    path: string,
    icon: any
}

export const getRoute = (_routes: Route[], route: string) => {
    return _routes.find(({ path }) => {
        const _path = route.split('/')[1]
        return path.includes(_path)
    })
}

export default function Layout({ Component, route }: PageProps) {

    const isLoginPage = route.includes('/login') || route.includes('/signup') || route.includes('/forgot_password')

    return (
        <div className="bg-[#FAFBFC] flex h-[100vh] overflow-y-auto">
            {
                !isLoginPage && (
                    <Sidebar>
                            <img src="https://media.licdn.com/dms/image/C5622AQG-tb--hN3jAw/feedshare-shrink_800/0/1675391537773?e=2147483647&v=beta&t=cYvUPHZUlhYfL0xGODf4ZJfSpQjHqnWUHPxWMErNheo" alt="icon" />

                        <div class="mt-[64px]">
                        <Menu currentRoute={route} />

                        </div>
                    </Sidebar>
                )
            }

            {
                !isLoginPage && (
                    <div class="flex flex-column w-full h-[100vh] ml-[160px] overlow--y-auto w-[88%]" style={{
                        flexDirection: 'column',
                        width: '88%'
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
                )
            }

            {
                isLoginPage && (
                    <Component />
                )
            }

          
        </div>
    );
}
