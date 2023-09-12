import SideBar from "./components/SideBar"
export default function DashboardLayout({children }) {
    return (
        <div className="flex">
            <SideBar />
            <main className="w-full p-3">
                {children}
            </main>
        </div>
    )
}