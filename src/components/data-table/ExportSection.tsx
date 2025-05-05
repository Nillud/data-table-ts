import { ReactElement } from "react"
import WordExport from "./export/WordExport"
import ExportExcel from "./export/ExportExcel"
import { column, tableData, TableProps } from "./DataTable.types"

type Props = {
    wordBtn: boolean
    excelBtn: boolean
    downloadSectionLeftSideContent: ReactElement | null
    tableData: tableData
    columns: Array<column>
    tableName: string
    exportCustomColumns: TableProps['exportCustomColumns']
}

const ExportSection = ({ wordBtn, excelBtn, downloadSectionLeftSideContent, tableData, columns, tableName, exportCustomColumns }: Props) => {
    return (
        <>
            <div className={'download-section'}>
                <div className={'download-content'}>
                    {
                        (wordBtn || excelBtn) && downloadSectionLeftSideContent !== null && downloadSectionLeftSideContent
                    }
                </div>
                <div className={'download-buttons'}>
                    {
                        wordBtn && <WordExport wordData={tableData} columns={columns} title={tableName} exportCustomColumns={exportCustomColumns} />
                    }
                    {
                        excelBtn && <ExportExcel excelData={tableData} columns={columns} title={tableName} exportCustomColumns={exportCustomColumns} />
                    }
                </div>
            </div>
        </>
    )
}

export default ExportSection