import { SignoutPage } from "../../islands/SignoutPage.tsx";
import type { WithSession } from "https://deno.land/x/fresh_session@beta-0.3.0/mod.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

export const handler: Handlers<
    unknown,
    WithSession<"KEY_A" | "KEY_B" | "KEY_C", "authenticated">
> = {
    GET(_req, ctx) {

        // The session is accessible via the `ctx.state`
        const { session } = ctx.state;

        // Session operation methods
        // Destroy session key and data.
        session.destroy()

        const headers = new Headers();
        headers.set("location", "/login");
        return new Response(null, {
            status: 303, // See Other
            headers,
        });
    },

};

export default function SignOut() {
    return (
        <SignoutPage />
    )
}