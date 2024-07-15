import { IS_BROWSER } from "$fresh/runtime.ts";
import { useEffect, useState } from "preact/hooks";
import { trpc } from "../utils/trpc.ts";
import type { inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '../router.ts';
import { ClientType } from "../models/Clients.ts";
import { render } from "$fresh/src/server/render.ts";

type RouterOutput = inferRouterOutputs<AppRouter>;

type PostCreateOutput = RouterOutput['clients.get'];

export function Map() {
    if (!IS_BROWSER) return null

    const [clients, setClients] = useState<PostCreateOutput>()
    const fetchPosts = () => trpc["clients.get"]
        .query()
        .then((data) => {
            setClients(data)
            return data
        });
    
    useEffect(() => {
        const L = (window as any).L;
        // Initialize the map
        var map = L.map('map').setView([51.505, -0.09], 13);

        // Add a tile layer to the map
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);

        // Create custom SVG icon
        var customIcon = L.divIcon({
            className: 'custom-icon',
            html: `<svg xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:svg="http://www.w3.org/2000/svg" id="svg21438" viewBox="0 0 158.08 170.43" version="1.0">
  <g id="layer1" transform="translate(-70.313 -10.68)">
    <g id="g21428" transform="translate(-21.737 312.57)">
      <g id="g21509" transform="matrix(1.3315 0 0 1.3315 -42.115 49.948)" fill="#3d7ca6">
        <path id="path14319" d="m168.85-195.74c-1.13-3.81-3-11.51-9-11.51s-8 7.68-9 11.51l-16 53.73c5 7.68 45 7.68 49.91 0l-15.91-53.73z"/>
        <path id="path14333" d="m167.77-225.26c0 4.14-3.35 7.5-7.5 7.5-4.14 0-7.5-3.36-7.5-7.5s3.36-7.5 7.5-7.5c4.15 0 7.5 3.36 7.5 7.5z"/>
        <path id="path14345" d="m175.06-236.91s4.07 4.17 4.07 12.1m-4.07 12.05s4.07-4.17 4.07-12.1" fill-rule="evenodd" stroke="#3d7ca6" stroke-linecap="round" stroke-width="6.3702"/>
        <path id="path14347" d="m188.95-248.99s8.14 8.35 8.14 24.21m-8.14 24.1s8.14-8.34 8.14-24.2" fill-rule="evenodd" stroke="#3d7ca6" stroke-linecap="round" stroke-width="6.3702"/>
        <path id="path14349" d="m204.09-261.06s12.22 12.51 12.22 36.3m-12.22 36.16s12.22-12.52 12.22-36.31" fill-rule="evenodd" stroke="#3d7ca6" stroke-linecap="round" stroke-width="6.3702"/>
        <path id="path14351" d="m144.77-236.91s-4.07 4.17-4.07 12.1m4.07 12.05s-4.07-4.17-4.07-12.1" fill-rule="evenodd" stroke="#3d7ca6" stroke-linecap="round" stroke-width="6.3702"/>
        <path id="path14353" d="m131.31-248.99s-8.15 8.35-8.15 24.21m8.15 24.1s-8.15-8.34-8.15-24.2" fill-rule="evenodd" stroke="#3d7ca6" stroke-linecap="round" stroke-width="6.3702"/>
        <path id="path14355" d="m116.16-261.06s-12.21 12.51-12.21 36.3m12.21 36.16s-12.21-12.52-12.21-36.31" fill-rule="evenodd" stroke="#3d7ca6" stroke-linecap="round" stroke-width="6.3702"/>
      </g>
    </g>
  </g>
</svg>
`,
            iconSize: [32, 32],
            iconAnchor: [16, 32]
        });

        (window as any).map = map

        const renderMap = async () => {
            const data = await fetchPosts() as unknown as ClientType[]

            const markers: any[] = []
            data.forEach(({ latitude, longitude }) => {
                markers.push(L.marker([latitude, longitude], { icon: customIcon }).addTo(map))    
                console.log(latitude < 8, longitude)
            })

            var group = L.featureGroup(markers);

            map.fitBounds(group.getBounds());
        }

        renderMap()
   
    }, [])
    return (
        <div id="map" class="h-[400px]">
        </div>
    );
}
