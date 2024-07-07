import { SettingsPage } from "../../islands/SettingsPage.tsx";

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


export default function Settings() {
    return (
        <div className="p-[20px] bg-[white] rounded-lg h-full w-full flex min-h-[80vh]">
            <SettingsPage />
        </div>
    )
}