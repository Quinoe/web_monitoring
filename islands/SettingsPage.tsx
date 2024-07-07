export function SettingsPage() {
    return (
        <div className="flex flex-col gap-[20px]">
            <div class="flex flex-col">
                <label>
                    Username
                </label>
                <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                />
            </div>
            <div class="flex flex-col">
                <label>
                    Email
                </label>
                <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                />
            </div>
            <div class="flex flex-col">
                <label>
                    Password
                </label>
                <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                />
            </div>
            <div class="flex flex-col">
                <label>
                    Jabatan
                </label>
                <details className="dropdown ">
                    <summary className="btn m-1 w-[320px] !bg-white !border-[1px] !border-[#ccc]">Chosse level</summary>
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

            <div class="flex flex-col">
                <label>
                    Office
                </label>
                <details className="dropdown ">
                    <summary className="btn m-1 w-[320px] !bg-white !border-[1px] !border-[#ccc]">Chosse office</summary>
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
            <div className="flex gap-[20px]">
                <button className="btn btn-active btn-primary">Save</button>
                <button className="btn btn-outline">Cancel</button>
            </div>
        </div>
    )
}