// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $_layout from "./routes/_layout.tsx";
import * as $api_joke from "./routes/api/joke.ts";
import * as $api_trpc_path_ from "./routes/api/trpc/[path].ts";
import * as $clients_index from "./routes/clients/index.tsx";
import * as $index from "./routes/index.tsx";
import * as $login_layout from "./routes/login/_layout.tsx";
import * as $login_index from "./routes/login/index.tsx";
import * as $settings_index from "./routes/settings/index.tsx";
import * as $signout_index from "./routes/signout/index.tsx";
import * as $signup_layout from "./routes/signup/_layout.tsx";
import * as $signup_index from "./routes/signup/index.tsx";
import * as $ClientList from "./islands/ClientList.tsx";
import * as $ClientsPage from "./islands/ClientsPage.tsx";
import * as $Counter from "./islands/Counter.tsx";
import * as $Map from "./islands/Map.tsx";
import * as $Menu from "./islands/Menu.tsx";
import * as $SettingsPage from "./islands/SettingsPage.tsx";
import * as $SignoutPage from "./islands/SignoutPage.tsx";
import * as $TrpcDemo from "./islands/TrpcDemo.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/_layout.tsx": $_layout,
    "./routes/api/joke.ts": $api_joke,
    "./routes/api/trpc/[path].ts": $api_trpc_path_,
    "./routes/clients/index.tsx": $clients_index,
    "./routes/index.tsx": $index,
    "./routes/login/_layout.tsx": $login_layout,
    "./routes/login/index.tsx": $login_index,
    "./routes/settings/index.tsx": $settings_index,
    "./routes/signout/index.tsx": $signout_index,
    "./routes/signup/_layout.tsx": $signup_layout,
    "./routes/signup/index.tsx": $signup_index,
  },
  islands: {
    "./islands/ClientList.tsx": $ClientList,
    "./islands/ClientsPage.tsx": $ClientsPage,
    "./islands/Counter.tsx": $Counter,
    "./islands/Map.tsx": $Map,
    "./islands/Menu.tsx": $Menu,
    "./islands/SettingsPage.tsx": $SettingsPage,
    "./islands/SignoutPage.tsx": $SignoutPage,
    "./islands/TrpcDemo.tsx": $TrpcDemo,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
