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
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr>
                            <th>1</th>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Blue</td>
                        </tr>
                        {/* row 2 */}
                        <tr>
                            <th>2</th>
                            <td>Hart Hagerty</td>
                            <td>Desktop Support Technician</td>
                            <td>Purple</td>
                        </tr>
                        {/* row 3 */}
                        <tr>
                            <th>3</th>
                            <td>Brice Swyre</td>
                            <td>Tax Accountant</td>
                            <td>Red</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
