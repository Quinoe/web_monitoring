export function Sidebar({ children}: any) {
    return (
        <div class="h-[100vh] z-[10] fixed left-[0] p-[10px] text-[#737791] bg-[white] w-[160px]">
                {children}
        </div>
    )
}