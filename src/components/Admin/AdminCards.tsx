import type { AdminDashboardCardsProps } from "../../types/task";

function AdminStatCard({ title, value }: AdminDashboardCardsProps) {
    return (
        <div className="rounded-xl bg-[#161d39] border border-blue-400 p-6">
            <p className="text-gray-300 text-sm uppercase tracking-wider"> {title} </p>
            <h2 className="text-white text-4xl font-bold mt-2"> {value} </h2>
        </div>
    )
}
export default AdminStatCard;