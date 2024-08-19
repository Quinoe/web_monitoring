import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";

import { getDenoKvSessionPlugin } from "https://deno.land/x/fresh_session@beta-0.3.0/mod.ts";

export default defineConfig({
  plugins: [
    tailwind(),
    getDenoKvSessionPlugin("/", {
      client: await Deno.openKv(),
      cookieOptions: { maxAge: 60 * 60 * 10 },
    }),
  ],
});
