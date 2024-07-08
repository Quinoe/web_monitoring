import type { WithSession } from "https://deno.land/x/fresh_session@beta-0.3.0/mod.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import TrpcDemo from "../../islands/TrpcDemo.tsx";

export const handler: Handlers<
    unknown,
    WithSession<"authenticated", "true" | "false">
> = {
    GET(_req, ctx) {
        return ctx.render();
    },
    async POST(req, ctx) {
        const form = await req.formData();
        const email = form.get("email")?.toString();
        const password = form.get("password")?.toString();

        // The session is accessible via the `ctx.state`
        const { session } = ctx.state;


        // Authenticate user
        if (email === "admin" && password === "adminadmin") {
            session.set("authenticated", "true");
        }

        const headers = new Headers();
        headers.set("location", "/");
        return new Response(null, {
          status: 303, // See Other
          headers,
        });
    },
};

export default function Login(props: PageProps<unknown, WithSession<"KEY_A" | "KEY_B" | "KEY_C", "authenticated">>) {
    const { route } = props;
    const isLogin = route.includes('/login');
    return (
        <div class="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div class="max-w-screen-xl bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div class="flex-1 bg-indigo-100 text-center hidden lg:flex">
                    <div class="w-full bg-center bg-no-repeat"
                        style="background-image: url('https://web.pln.co.id/statics/uploads/2023/04/WhatsApp-Image-2023-04-12-at-10.03.31.jpeg'); background-size: cover;">
                    </div>
                </div>
                <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div class="mt-12 flex flex-col items-center">
                        <h1 class="text-2xl xl:text-3xl font-extrabold">
                            {isLogin ? 'Login' : 'Sign up'}
                        </h1>
                        <div class="w-full flex-1 mt-8">
                            <div class="mx-auto max-w-xs">
                                <form method="post">
                                    <input
                                        class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        name="email"
                                        placeholder="Email"
                                    />
                                    <input
                                        class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                    />
                                    <button
                                        type="submit"
                                        class="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                        {
                                            !isLogin && (
                                                <svg class="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round">
                                                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                                    <circle cx="8.5" cy="7" r="4" />
                                                    <path d="M20 8v6M23 11h-6" />
                                                </svg>
                                            )
                                        }
                                        <span class="ml-3">
                                            {isLogin ? 'Login' : 'Sign up'}
                                        </span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
