import type { ReactNode } from "react";

type AdminTableProps = {
    headers: string[];
    children: ReactNode;
};

function AdminTable({ headers, children }: AdminTableProps) {
    return (
        <div className="overflow-x-auto rounded-xl border border-blue-400">
            <table className="w-full text-left">
                <thead className="bg-[#222944] text-white">
                    <tr>
                        {headers.map((header) => (
                            <th key={header} className="px-5 py-4">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className="bg-[#181d31] text-white">
                    {children}
                </tbody>
            </table>
        </div>
    );
}

export default AdminTable;