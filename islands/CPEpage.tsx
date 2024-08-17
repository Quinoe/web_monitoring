import { useEffect, useState } from "preact/hooks";
import { trpc } from "../utils/trpc.ts";

import type { inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '../router.ts';
import { ClientType } from "../models/Clients.ts";
import { CreateCPEType } from "../models/CPE.ts";

type RouterOutput = inferRouterOutputs<AppRouter>;

type PostCreateOutput = RouterOutput['cpe.get'];

declare global {
    interface Window {
        $: any;
    }
}

function underscoreToPascalCase(str: string) {
    // Split the string by underscores
    const words = str.split('_');

    // Capitalize the first letter of each word and join them together
    const pascalCaseStr = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

    return pascalCaseStr;
}

const cpeSchemObj = {
    ip: '',
    cpe_name: ''
};


export function CPEPage() {
    const [cpeList, setCpeList] = useState<PostCreateOutput>([]);
    const [selectedClient, setSelectedClient] = useState<CreateCPEType | {}>({})
    const [isEditSession, setEditSession] = useState(false)


    const columns = Object.keys(cpeSchemObj).map((name) => {
        return {
            key: name,
            display: underscoreToPascalCase(name)
        }
    })

    const fetchPosts = () => trpc["cpe.get"].query().then(setCpeList);

    useEffect(() => {
        (window).$('#datepicker').datepicker()
        fetchPosts()
    }, [])

    return (
        <div class="bg-[white] p-[20px] flex-col flex gap-[20px]">
            <div className="flex justify-between items-end">
                <div>
                    <div className="text-xl">
                        <strong>CPE list</strong>
                    </div>
                </div>
                <div>
                    <button
                        onClick={() => {
                            (document.getElementById("import_cpe_modal") as any)?.classList.add('modal-open')

                            setTimeout(() => {
                                document.querySelector('#import_cpe_modal')?.appendChild(document.querySelector('div[role="calendar"]') as HTMLElement);
                            }, 10);

                        }
                        }
                        class="pl-[20px] mr-[10px] rounded-lg pr-[20px] pt-[4px] pb-[4px] bg-[transparent] text-[#60A5FA] border-[1px] border-[#60A5FA]"
                    >
                        Import CPE
                    </button>

                    <button
                        onClick={() => {
                            (document.getElementById("add_cpe_modal") as any)?.classList.add('modal-open')

                            setTimeout(() => {
                                document.querySelector('#add_cpe_modal')?.appendChild(document.querySelector('div[role="calendar"]') as HTMLElement);
                            }, 10);

                        }
                        }
                        class="pl-[20px] rounded-lg pr-[20px] pt-[4px] pb-[4px] bg-[#60A5FA] text-[white]"
                    >
                        Add CPE
                    </button>

                    <div id="import_cpe_modal" className="modal">
                        <div className="bg-[white] w-5/12 h-[fit-content] overflow-y-auto  rounded-xl p-[30px]">
                            <h4 class="text-xl mb-[20px]">
                                Import CPE
                            </h4>
                            <div class="flex flex-col h-[80%]" id="form-import-cpe">
                                <div class="flex flex-col gap-[20px]">
                                    <div class="flex gap-[10px] items-center">
                                        <label>
                                            Sheet Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            name="sheet_name"
                                            disabled={isEditSession}
                                            className="input input-bordered w-full max-w-xs"
                                        />
                                    </div>
                                    <div class="flex gap-[10px] items-center">
                                        <label>
                                            File
                                        </label>
                                        <input
                                            type="file"
                                            name="files"
                                            disabled={isEditSession}
                                            class="ml-[65px]"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-[20px] mt-[30px]">
                                    <button className="btn" onClick={() => {
                                        const dialog = document.getElementById('import_cpe_modal');

                                        dialog?.classList.remove('modal-open');
                                    }}>Close</button>

                                    <button class="btn btn-primary" onClick={async () => {
                                        const values: any = {}

                                        document.querySelectorAll('#form-import-cpe  input')
                                            .forEach((el: any) => {
                                                if (el.name === 'files') {
                                                    values[el.name as keyof ClientType] = el.files[0]

                                                } else {
                                                    values[el.name as keyof ClientType] = el.value

                                                }
                                            })

                                        const formData = new FormData();

                                        Object.keys(values).forEach((key) => {
                                            formData.append(key, values[key])
                                        })

                                        try {
                                            // Send the file using Fetch API
                                            const response = await fetch('/api/import/cpe', {
                                                method: 'POST',
                                                body: formData
                                            });

                                            if (response.ok) {
                                                await response.json();
                                                alert('File uploaded successfully!');
                                                const dialog = document.getElementById('import_cpe_modal');

                                                dialog?.classList.remove('modal-open');

                                                fetchPosts()

                                            } else {
                                                alert('File upload failed.');
                                            }
                                        } catch (error) {
                                            console.error('Error:', error);
                                            alert('An error occurred while uploading the file.');
                                        }

                                    }}>
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="add_cpe_modal" className="modal">
                        <div className="bg-[white] w-8/12 h-[500px] overflow-y-auto  rounded-xl p-[30px]">
                            <h4 class="text-xl mb-[20px]">
                                Add new CPE
                            </h4>
                            <div class="flex justify-between" id="form-client">
                                <div className="flex flex-col gap-[20px] flex-1">
                                    <div class="flex flex-col">
                                        <label>
                                            IP
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            name="ip"
                                            disabled={isEditSession}
                                            onChange={(e: any) => {
                                                setSelectedClient((prev) => {
                                                    return {
                                                        ...prev,
                                                        ip: e?.target?.value
                                                    }
                                                })
                                            }}
                                            className="input input-bordered w-full max-w-xs"
                                            value={(selectedClient as CreateCPEType).ip ?? ''}
                                        />
                                    </div>
                                    <div class="flex flex-col">
                                        <label>
                                            CPE Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            name="cpe_name"
                                            onChange={(e: any) => {
                                                setSelectedClient((prev) => {
                                                    return {
                                                        ...prev,
                                                        cpe_name: e?.target?.value
                                                    }
                                                })
                                            }}
                                            value={(selectedClient as CreateCPEType).cpe_name ?? ''}
                                            className="input input-bordered w-full max-w-xs"
                                        />
                                    </div>
                                </div>

                            </div>


                            <div className="modal-action">
                                <button className="btn" onClick={() => {
                                    setSelectedClient({})
                                    const dialog = document.getElementById('add_cpe_modal');

                                    dialog?.classList.remove('modal-open');
                                }}>Close</button>

                                <button class="btn btn-primary" onClick={() => {
                                    const values: any = {}

                                    document.querySelectorAll('#form-client  input')
                                        .forEach((el: any) => {
                                            values[el.name as keyof ClientType] = el.value
                                        })

                                    if (isEditSession) {
                                        trpc["cpe.update"].mutate({ ...selectedClient, ...values })
                                            .then(
                                                () => {
                                                    fetchPosts()
                                                    setSelectedClient({})
                                                    const dialog = document.getElementById('add_cpe_modal');

                                                    dialog?.classList.remove('modal-open');
                                                }
                                            );
                                    } else {
                                        trpc["cpe.create"].mutate({ ...values })
                                            .then(
                                                () => {
                                                    fetchPosts()
                                                    setSelectedClient({})
                                                    const dialog = document.getElementById('add_cpe_modal');

                                                    dialog?.classList.remove('modal-open');
                                                }
                                            );
                                    }


                                }}>
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto bg-white ">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="bg-[#F3F6F9]">
                            {
                                columns.map(({ display, key }) => {
                                    return (
                                        <th key={key} class="!text-[#151D48]">{display}</th>
                                    )
                                })
                            }
                            <th class="!text-[#B5B5C3]"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            (cpeList as CreateCPEType[]).map((data, i) => {
                                return (
                                    <tr key={i}>
                                        {columns.map(({ key }) => {
                                            return (
                                                <td key={`${key}-${i}`}>
                                                    {data[key as keyof CreateCPEType]}
                                                </td>
                                            )
                                        })}
                                        <td>
                                            <div class="flex gap-[10px]">
                                                <button onClick={() => {
                                                    setSelectedClient(data);
                                                    setEditSession(true);
                                                    (document.getElementById("add_cpe_modal") as any)?.classList.add('modal-open')

                                                    setTimeout(() => {
                                                        document.querySelector('#add_cpe_modal')?.appendChild(document.querySelector('div[role="calendar"]') as HTMLElement);
                                                    }, 10);

                                                }} class="bg-[transparent] w-[20px] h-[20px]">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" /></svg>
                                                </button>
                                                <button onClick={() => {
                                                    trpc["cpe.delete"].mutate({ ...data })
                                                        .then(
                                                            fetchPosts,
                                                        );
                                                }} class="bg-[transparent] w-[20px] h-[20px]">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" /></svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )

                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
