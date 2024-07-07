import { useEffect } from "preact/hooks";


export function ClientsPage() {
    useEffect(() => {
        $('#datepicker').datepicker()
    }, [])
    return (
        <div class="bg-[white] p-[20px] flex-col flex gap-[20px]">
            <div className="flex justify-between items-end">
                <div>
                    <div className="text-xl">
                        <strong>Client list</strong>
                    </div>
                    <div class="text-lg">More than xxx new clients</div>
                </div>
                <div>
                    <button
                        onClick={() => {
                            document.getElementById("my_modal_2").showModal()

                            setTimeout(() => {
                                document.querySelector('#my_modal_2').appendChild(document.querySelector('div[role="calendar"]'));
                            }, []);

                        }
                        }
                        class="pl-[20px] rounded-lg pr-[20px] pt-[4px] pb-[4px] bg-[#60A5FA] text-[white]"
                    >
                        Add client
                    </button>

                    <dialog id="my_modal_2" className="modal">
                        <div className=" bg-[white] w-8/12 h-[500px] overflow-y-auto  rounded-xl p-[30px]">
                            <h4 class="text-xl mb-[20px]">
                                Add new client
                            </h4>
                            <div class="flex justify-between">
                                <div className="flex flex-col gap-[20px] flex-1">
                                    <div class="flex flex-col">
                                        <label>
                                            ID Pelanggan
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            className="input input-bordered w-full max-w-xs"
                                        />
                                    </div>
                                    <div class="flex flex-col">
                                        <label>
                                            Client Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            className="input input-bordered w-full max-w-xs"
                                        />
                                    </div>
                                    <div class="flex flex-col">
                                        <label>
                                            CPE
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            className="input input-bordered w-full max-w-xs"
                                        />
                                    </div>
                                    <div class="flex flex-col">
                                        <label>
                                            Port
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            className="input input-bordered w-full max-w-xs"
                                        />
                                    </div>
                                    <div class="flex flex-col">
                                        <label>
                                            Service
                                        </label>
                                        <details className="dropdown ">
                                            <summary className="btn m-1 w-[320px] !bg-white !border-[1px] !border-[#ccc]">Choose service</summary>
                                            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-[320px] p-2 shadow">
                                                <li>
                                                    <a>Item 1</a>
                                                </li>
                                                <li>
                                                    <a>Item 2</a>
                                                </li>
                                            </ul>
                                        </details>

                                    </div>

                                </div>
                                <div className="flex flex-col gap-[20px] flex-1">
                                    <div class="flex flex-col">
                                        <label>
                                            Coordinate
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            className="input input-bordered w-full max-w-xs"
                                        />
                                    </div>
                                    <div class="flex flex-col">
                                        <label>
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            className="input input-bordered w-full max-w-xs"
                                        />
                                    </div>
                                    <div class="flex flex-col">
                                        <label>
                                            PIC Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            className="input input-bordered w-full max-w-xs"
                                        />
                                    </div>
                                    <div class="flex flex-col">
                                        <label>
                                            PIC Email
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            className="input input-bordered w-full max-w-xs"
                                        />
                                    </div>
                                    <div class="flex flex-col">
                                        <label className="mb-[20px]">
                                            Registered Date
                                        </label>
                                        <input id="datepicker" width="81%" />
                                    </div>

                                </div>
                            </div>





                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button, it will close the modal */}
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            </div>

            <div className="overflow-x-auto bg-white ">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="bg-[#F3F6F9]">
                            <th class="!text-[#151D48]">ID Pelanggan</th>
                            <th class="!text-[#151D48]">Client Name</th>
                            <th class="!text-[#B5B5C3]">CPE</th>
                            <th class="!text-[#B5B5C3]">Port</th>
                            <th class="!text-[#B5B5C3]">Service</th>
                            <th class="!text-[#B5B5C3]">Coordinate</th>
                            <th class="!text-[#B5B5C3]">Address</th>
                            <th class="!text-[#B5B5C3]">PIC</th>
                            <th class="!text-[#B5B5C3]">Registered Date</th>
                            <th class="!text-[#B5B5C3]">Status</th>
                            <th class="!text-[#B5B5C3]"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr>
                            <th>1</th>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Blue</td>
                            <td>Blue</td>
                            <td>Blue</td>
                            <td>Blue</td>
                            <td>Blue</td>
                            <td>Blue</td>
                            <td>
                                <div className="flex text-center  justify-center border-[1px] bg-[#DCFCE7] border-[#3CD856] text-[#3CD856] rounded-md w-[100px] p-[10px]">
                                    Active
                                </div>
                            </td>
                            <td>
                                <div class="flex gap-[10px]">
                                    <button class="bg-[transparent] w-[20px] h-[20px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" /></svg>
                                    </button>
                                    <button class="bg-[transparent] w-[20px] h-[20px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" /></svg>
                                    </button>
                                </div>


                            </td>

                        </tr>
                        {/* row 2 */}
                        <tr>
                            <th>2</th>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Blue</td>
                            <td>Blue</td>
                            <td>Blue</td>
                            <td>Blue</td>
                            <td>Blue</td>
                            <td>Blue</td>
                            <td>
                                <div className="flex text-center  justify-center border-[1px] bg-[#DCFCE7] border-[#3CD856] text-[#3CD856] rounded-md w-[100px] p-[10px]">
                                    Active
                                </div>
                            </td>
                            <td>
                                <div class="flex gap-[10px]">
                                    <button class="bg-[transparent] w-[20px] h-[20px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" /></svg>
                                    </button>
                                    <button class="bg-[transparent] w-[20px] h-[20px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" /></svg>
                                    </button>
                                </div>


                            </td>

                        </tr>
                        {/* row 3 */}
                        <tr>
                            <th>3</th>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Blue</td>
                            <td>Blue</td>
                            <td>Blue</td>
                            <td>Blue</td>
                            <td>Blue</td>
                            <td>Blue</td>
                            <td>
                                <div className="flex text-center justify-center border-[1px] bg-[#FFE2E5] border-[#FA5A7D] text-[#FA5A7D] rounded-md w-[100px] p-[10px]">
                                    Down
                                </div>
                            </td>
                            <td>
                                <div class="flex gap-[10px]">
                                    <button class="bg-[transparent] w-[20px] h-[20px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" /></svg>
                                    </button>
                                    <button class="bg-[transparent] w-[20px] h-[20px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" /></svg>
                                    </button>
                                </div>


                            </td>

                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
