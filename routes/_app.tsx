import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
  return (
    <html data-theme="light" class="!bg-[#FAFBFC] !text-[#151D48]">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>monitoring-web</title>
        <link rel="stylesheet" href="/styles.css" />
        <link
          async
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        />
        <link
          async
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/solid.min.css"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/daisyui@4.12.10/dist/full.min.css"
          rel="stylesheet"
          type="text/css"
        />

        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossorigin=""
        />
        <script
          src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
          integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
          crossorigin=""
        ></script>
        <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
        <script
          src="https://unpkg.com/gijgo@1.9.14/js/gijgo.min.js"
          type="text/javascript"
        ></script>
        <link
          href="https://unpkg.com/gijgo@1.9.14/css/gijgo.min.css"
          rel="stylesheet"
          type="text/css"
        />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
