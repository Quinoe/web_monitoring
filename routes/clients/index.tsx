import { PageProps } from "$fresh/server.ts";

import { ClientsPage } from "../../islands/ClientsPage.tsx";

export default function Greet(props: PageProps) {
  return (
    <ClientsPage />
  );
}
