export function OverviewTable() {
    return (
        <div class="flex flex-col">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div class="overflow-hidden">
                        <table class="min-w-full text-center text-sm font-light text-surface dark:text-white">
                            <thead class="border-b border-neutral-200 bg-neutral-50 font-medium dark:border-white/10 dark:text-neutral-800">
                                <tr>
                                    <th scope="col" class=" px-6 py-4">#</th>
                                    <th scope="col" class=" px-6 py-4">
                                        Name
                                    </th>
                                    <th scope="col" class=" px-6 py-4">Last downtime</th>
                                    <th scope="col" class=" px-6 py-4">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="text-[black]">
                                <tr class="border-b border-neutral-200 dark:border-white/10">
                                    <td class="whitespace-nowrap  px-6 py-4 font-medium">
                                        1
                                    </td>
                                    <td class="whitespace-nowrap  px-6 py-4">
                                        Mark
                                    </td>
                                    <td class="whitespace-nowrap  px-6 py-4">
                                        Otto
                                    </td>
                                    <td class="whitespace-nowrap  px-6 py-4">
                                        <div className="flex text-center  justify-center border-[1px] bg-[#DCFCE7] border-[#3CD856] text-[#3CD856] rounded-md w-[100px] p-[10px]">
                                            Active
                                        </div>
                                    </td>
                                </tr>
                                <tr class="border-b border-neutral-200 dark:border-white/10">
                                    <td class="whitespace-nowrap  px-6 py-4 font-medium">
                                        2
                                    </td>
                                    <td class="whitespace-nowrap  px-6 py-4 ">
                                        Jacob
                                    </td>
                                    <td class="whitespace-nowrap  px-6 py-4">
                                        Thornton
                                    </td>
                                    <td class="whitespace-nowrap  px-6 py-4">
                                        <div className="flex text-center justify-center border-[1px] bg-[#FFE2E5] border-[#FA5A7D] text-[#FA5A7D] rounded-md w-[100px] p-[10px]">
                                            Down
                                        </div>
                                    </td>
                                </tr>
                                <tr class="border-b border-neutral-200 dark:border-white/10">
                                    <td class="whitespace-nowrap  px-6 py-4 font-medium">
                                        3
                                    </td>
                                    <td
                                        colspan={2}
                                        class="whitespace-nowrap  px-6 py-4"
                                    >
                                        Larry the Bird
                                    </td>
                                    <td class="whitespace-nowrap  px-6 py-4">
                                        <div className="flex text-center  justify-center border-[1px] bg-[#DCFCE7] border-[#3CD856] text-[#3CD856] rounded-md w-[100px] p-[10px]">
                                            Active
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
