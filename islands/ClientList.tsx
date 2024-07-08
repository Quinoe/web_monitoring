export function ClinetList() {
    return (
        <div
            class="flex h-full"
            style={{
                flexDirection: "column",
                gap: "10px",
            }}
        >
            <div>
                <form class="max-w-md mx-auto">
                    <label
                        for="default-search"
                        class="mb-2 text-sm font-medium text-gray-900 sr-only"
                    >
                        Search
                    </label>
                    <div class="relative">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg
                                class="w-4 h-4 text-gray-500"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </div>
                        <input
                            type="search"
                            id="default-search"
                            class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Search..."
                            required
                        />
                    </div>
                </form>
            </div>
            <div
                style={{
                    flexDirection: "column",
                }}
                class="border-[1px] flex border-[#ccc] flex-1 bg-[white] w-full h-full rounded-lg"
            >
                <div class="border-b-[1px] border-[#ccc] flex justify-between px-[10px] py-[10px]">
                    <div
                        class="flex"
                        style={{
                            flexDirection: "column",
                        }}
                    >
                        <div>
                            <strong>
                                Rumah Sakit XYZ
                            </strong>
                        </div>
                        <div class="flex gap-[10px]">
                            <div>
                                CISO
                            </div>
                            <div>
                                -
                            </div>
                            <div>
                                172.131.13
                            </div>
                        </div>
                        <div class="text-[14px]">
                            Jalan Nusantara
                        </div>
                    </div>
                    <div>
                        <div className="flex text-center  justify-center border-[1px] bg-[#DCFCE7] border-[#3CD856] text-[#3CD856] rounded-md w-[100px] p-[10px]">
                            Active
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
