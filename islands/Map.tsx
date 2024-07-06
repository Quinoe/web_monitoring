import { IS_BROWSER } from "$fresh/runtime.ts";
import { useEffect } from "preact/hooks";

export function Map() {
    if (!IS_BROWSER) return null
  
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
            html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="32" height="32">
                    <circle cx="32" cy="32" r="30" fill="#3498db" />
                    <text x="32" y="37" font-size="20" text-anchor="middle" fill="#fff">A</text>
                   </svg>`,
            iconSize: [32, 32],
            iconAnchor: [16, 32]
        });

        // Add the custom marker to the map
        L.marker([51.505, -0.09], { icon: customIcon }).addTo(map);
    }, [])
    return (
        <div id="map" class="h-[400px]">
        </div>
    );
}
