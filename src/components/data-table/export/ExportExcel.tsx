import { column, tableElement, TableProps } from '../DataTable.types'
import styles from './Export.module.scss'
import ExcelJS from 'exceljs'

type Props = {
    columns: Array<column>
    excelData: Array<tableElement>
    title: string
    exportCustomColumns: TableProps["exportCustomColumns"]
}

const ExportExcel = ({ columns, excelData, title, exportCustomColumns }: Props) => {
    const exportExcel = () => {
        const workbook = new ExcelJS.Workbook()
        const sheet = workbook.addWorksheet(title, {
            pageSetup: { fitToPage: true, fitToHeight: 2, fitToWidth: 1, orientation: "landscape" },
            headerFooter: { oddFooter: "Страница &P из &N", evenFooter: 'Страница &P из &N' }
        })
        const headerRow = sheet.getRow(1)

        headerRow.height = 40

        headerRow.font = {
            size: 12,
            bold: true
        };

        headerRow.font = {
            size: 12,
            bold: true
        };

        headerRow.alignment = { vertical: 'middle', horizontal: 'center' };

        const excelColumns = columns.map(column => ({
            header: column.title,
            key: column.field,
            width: 20
        }))

        if (exportCustomColumns) {
            let newColumns: { header: string; key: string; width: number }[] | Partial<ExcelJS.Column>[] = []

            exportCustomColumns.forEach(col => {
                newColumns = excelColumns.map(element => element.key == col.key ? ({ ...element, ...col }) : element)
            })

            sheet.columns = newColumns
        } else {
            sheet.columns = excelColumns
        }

        for (let i = 1; i <= sheet.columns.length; i++) {
            const row = headerRow

            row.getCell(i).alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' }
            row.getCell(i).border = {
                top: { style: 'thin', color: { argb: '000000' } },
                left: { style: 'thin', color: { argb: '000000' } },
                bottom: { style: 'thin', color: { argb: '000000' } },
                right: { style: 'thin', color: { argb: '000000' } }
            };
        }

        excelData.map((element, id) => {
            const rowData: {
                [key: string]: string | number
              } = {}

            columns.forEach(col => {
                if (typeof col.exportCustomCell !== 'undefined') {
                    rowData[col.field] = col.exportCustomCell(String(element[col.field]), element)
                } else {
                    rowData[col.field] = element[col.field]
                }
            })

            sheet.addRow(rowData)

            const row = sheet.getRow(id + 2)

            row.alignment = { vertical: 'middle', horizontal: 'center' };

            row.font = {
                size: 12,
            };

            row.height = 40

            for (let i = 1; i <= sheet.columns.length; i++) {
                row.getCell(i).alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' }
                row.getCell(i).border = {
                    top: { style: 'thin', color: { argb: '000000' } },
                    left: { style: 'thin', color: { argb: '000000' } },
                    bottom: { style: 'thin', color: { argb: '000000' } },
                    right: { style: 'thin', color: { argb: '000000' } }
                };
            }
        })

        if (excelData.length > 15) {
            sheet.pageSetup.fitToHeight = Math.floor(excelData.length / 15)
        } else {
            sheet.pageSetup.fitToHeight = 1
        }

        workbook.xlsx.writeBuffer().then(data => {
            const blob = new Blob([data], {
                type: 'application/vnd.openxmlformats-officedocument.sreadsheet.sheet',
            })
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url
            anchor.download = `${title}.xlsx`
            anchor.click()
            window.URL.revokeObjectURL(url)
        })
    }

    return (
        <button className={`${styles.buttonExport} ${styles.Excel}`} onClick={exportExcel}>
            Скачать Excel
        </button>
    )
}

export default ExportExcel