import { PageProps } from "$fresh/server.ts";
import { CPEPage } from "../../islands/CPEpage.tsx";

export const handler: Handlers<
  unknown,
  WithSession<"KEY_A" | "KEY_B" | "KEY_C", "success">
> = {
  GET(_req, ctx) {
    const { session } = ctx.state;

    if (Boolean(session.get("authenticated"))) {
      return ctx.render();
    }

    const headers = new Headers();

    headers.set("location", "/login");

    return new Response(null, {
      status: 303, // See Other
      headers,
    });
  },
};

export default function Greet(props: PageProps) {
  return <CPEPage />;
}
