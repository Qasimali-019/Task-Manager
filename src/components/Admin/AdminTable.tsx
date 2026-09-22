import type { AdminTableProps } from "../../types/task";

function AdminTable({ headers, children }: AdminTableProps) {
    return (
        <div className="overflow-x-auto rounded-xl border border-blue-400">

            <table className="w-full text-left">
                <thead className="w-full-text-left">

                    <tr>
                        {headers.map((header) => (
                            <th key={header} className="px-5 py-4 text-sm text-gray-300 uppercase" > {header} </th>


                        ))}
                    </tr>
                </thead>
                <tbody className="bg-[#181d31] text-white"> {children}
                </tbody>
            </table>
        </div>
    );
}
export default AdminTable;