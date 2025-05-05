'use client'

import DataTable from "@/components/data-table/DataTable";
import { tableData as TableData } from "@/components/data-table/DataTable.types";
import { columns, data } from '@/components/data-table/mock'
import { useEffect, useState } from "react";

const DataTableMain = () => {
    const [tableData, setTableData] = useState<TableData>([])
    const [loading, setLoading] = useState<boolean>(false)


    useEffect(() => {
        setLoading(true)
        setTableData(data)

        setTimeout(() => {
            setLoading(false)
        }, 1500)
    }, [])

    return (
        <div className="page-container">
            <div className="page-body">
                <DataTable
                    tableData={tableData}
                    columns={columns}
                    tableName={"delo-it"}
                    loading={loading}
                    isFooter
                    paginationCounts={[10, 20, 30, 40, 50, 0]}
                />
            </div>
        </div>
    )
}

export default DataTableMain