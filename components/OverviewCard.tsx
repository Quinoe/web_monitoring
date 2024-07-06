

export type OverviewCardProps = {
    icon: string;
    background: string;
    count: number;
    title: string;
    description: string;
};

export function OverviewCard({ background, 
    iconBackground,
    title, 
    description, 
    count, 
    icon 
}: OverviewCardProps) {
    return (
        <div
            class="w-[150px] h-[200px] flex justify-between p-[10px] rounded-lg"
            style={{
                flexDirection: "column",
                background: background,
            }}
        >
            <div style={{
                background: iconBackground
            }} class="rounded-full  w-[32px] h-[32px] flex justify-center items-center">
                {
                    (icon.length) ? (
                        <i class={`fa ${icon} text-white`}></i>
                    ) : (
                        icon
                    )
                }
         
            </div>
            <div className="text-2xl font-bold">
                {count}
            </div>
            <div className="text-md">
                {title}
            </div>
            <div className="text-xs">
                {description}
            </div>
        </div>
    );
}
