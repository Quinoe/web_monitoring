export default function Layout({ Component, route }: PageProps) {
    return (
        <div className="w-full">
            <Component />
        </div>
    )
}