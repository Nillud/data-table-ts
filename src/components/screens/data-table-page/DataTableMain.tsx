'use client'

// import { fetchTasks } from "@/app/actions/fetchTasks";
import DataTable from "@/components/data-table/DataTable";
import { Column, TableData } from "@/components/data-table/DataTable.types";
import { useEffect, useState } from "react";
import { columns, data } from "@/components/data-table/mock";

const DataTableMain = () => {
    const [tableData, setTableData] = useState<TableData>([])

    // const columns: Array<Column> = [
    //     {
    //         field: 'dr_id',
    //         title: '№',
    //         autoinc: true,
    //         width: 50
    //     },
    //     {
    //         field: "do_name",
    //         title: "Объект (АЗС)"
    //     },
    //     {
    //         field: "de_name",
    //         title: "Оборудование"
    //     },
    //     {
    //         field: "dco_name",
    //         title: "Контрагент"
    //     },
    //     {
    //         field: "dot_name",
    //         title: "Тип объекта (АЗС)"
    //     },
    // ]

    useEffect(() => {
        // const getTasks = async () => {
        //     const newTableData = await fetchTasks()
        //     setTableData(newTableData)
        // }

        setTimeout(async () => {
            setTableData(data)
        }, 1000);
    }, [])


    return (
        <div className="page-container">
            <div className="page-body">
                <DataTable
                    tableData={tableData}
                    columns={columns}
                    tableName={"delo-it"}
                    // loading={loading}
                    isFooter
                    paginationCounts={[10, 20, 30, 40, 50, 0]}
                    excelBtn
                    wordBtn
                    headerGroup={[{ title: 'Личные данные', cols: 4 }, { title: 'Оборудование', cols: 2 }]}
                    groupBy={'status'}
                    isTitles
                // scrollable
                // scrollHeight={250}
                />
            </div>
        </div>
    )
}

export default DataTableMain