import { IS_BROWSER } from "$fresh/runtime.ts";
import { consumeToken } from "$std/media_types/_util.ts";
import { useEffect, useRef } from "preact/hooks";
import { createPopper } from 'npm:@popperjs/core'
import { getStatus } from "./OverviewTable.tsx";
import { render } from 'preact-render-to-string';

export function Map({ clients }: any) {
    if (!IS_BROWSER) return null

    const isPopupOpen = useRef(false)
    const popupElementRef = useRef<any>(null)
    const popperInstanceRef = useRef<any>(null)

    useEffect(() => {

        const handleOutsideClick = (event: MouseEvent) => {
            if (
                isPopupOpen.current &&
                popupElementRef.current &&
                !popupElementRef.current.contains(event.target as Node)
            ) {
                popupElementRef.current.style.display = 'none';
                isPopupOpen.current = false;
            }
        };

        const renderMap = async () => {
            const L = (window as any).L;

            var popupElement = document.getElementById('popup') as HTMLElement;
            popupElementRef.current = popupElement;

            const addMarkers = (map: any) => {
                let customIcon = (id: string, status: string) => L.divIcon({
                    className: `custom-icon ${id}`,
                    html: `<div class="flex relative"><div class="absolute top-[-10px] right-[-2px] rounded-full w-[10px] h-[10px] ${status}"></div> <svg xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:svg="http://www.w3.org/2000/svg" id="svg21438" viewBox="0 0 158.08 170.43" version="1.0">
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
    </div>
    `,
                    iconSize: [32, 32],
                    iconAnchor: [16, 32]
                });

                const markers: any = [];

                (window as any).markers?.forEach((marker: any) => map.removeLayer(marker));

                (clients as any)?.forEach(({ 
                    latitude, 
                    longitude, 
                    client_name, 
                    cpe, 
                    port, 
                    address,
                    status,
                    ip
                }: any, index: number) => {
                    const marker = L.marker([latitude, longitude], { icon: customIcon(`marker-${index}`, 
                        status === 'active' ? 'bg-green-500' : status === 'dowm' ? 'bg-[red]' : 'bg-gray-500') }).addTo(map)

                    marker.on('click', (e: any) => {
                        setTimeout(() => {
                            isPopupOpen.current = false;

                            const id = `clients-${index}`
                            popupElementRef.current.innerHTML = `
                                <div id="${id}" class="bg-[white] rounded-md flex justify-between w-[300px] p-[10px] h-[fit-content]">
                                    <div class="flex flex-col gap-[8px]">
                                        <div class="max-w-[200px]">
                                          <strong>
                                            ${client_name}
                                        </strong>

                                        </div>
                                        <div class="flex gap-[4px]">
                                            <div>
                                                ${cpe}
                                            </div>
                                          
                                          
                                        </div>
                                        <div class="flex gap-[8px]">
                                              <div>
                                                ${ip}
                                            </div>
                                            <div>
                                                -
                                            </div<
                                            <div>
                                                ${port}
                                            </div>
                                        </div>
                                        <div>
                                            ${address}
                                        </div>
                                    </div>  
                                    <div>
                                    <div>
                                        ${render(getStatus(status) as any)}
                                    </div>
                                
                                </div>
                            `;
    
                            popupElementRef.current.style.display = 'block';
    
                            popperInstanceRef.current = createPopper(marker._icon, popupElement, {
                                placement: 'bottom',
                                modifiers: [
                                    {
                                        name: 'offset',
                                        options: {
                                            offset: [0, 8],
                                        },
                                    },
                                ],
                            });
    
                            isPopupOpen.current = true;
    
                            map.on('move', function () {
                                popperInstanceRef.current?.update();
                            });
                        }, 200)
                     

                    })
                    markers.push(marker)
                })

                var group = L.featureGroup(markers);
                map.fitBounds(group.getBounds());
                (window as any).markers = markers;
            }

            if (!(window as any).mapRef) {
                const map = L.map('map').setView([51.505, -0.09], 13);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                }).addTo(map);

                (window as any).mapRef = map;
                addMarkers(map);
            } else {
                addMarkers((window as any).mapRef);
            }
        }

        if ((clients as any)?.length) {
            renderMap();
            document.addEventListener('click', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('click', handleOutsideClick);
            popperInstanceRef.current?.destroy();
        };

    }, [clients])

    return (
        <div id="map"  class="h-[400px]">
            <div id="popup" style="z-index: 40000;"></div>
        </div>
    );
}
