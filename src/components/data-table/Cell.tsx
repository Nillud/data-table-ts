import { column, tableElement } from './DataTable.types'

type Props = {
    row: tableElement
    column: column
    rowId: number
    [key: string]: unknown
}

const Cell = ({ row, column, rowId }: Props) => {
    const CellValue = () => {
        if (column.formatter) {
            return column.formatter(String(row[column.field]), row)
        }

        if (typeof column.autoinc !== 'undefined') {
            return <div className='row-item'>{rowId + 1}</div>
        }

        return <span>{row[column.field]}</span>
    }

    return (
        <div className='cell'>
            <CellValue />
        </div>
    )
}

export default Cell