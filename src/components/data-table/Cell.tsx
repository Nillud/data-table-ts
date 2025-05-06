import { Column, TableElement, TableProps } from './DataTable.types'

type Props = {
    row: TableElement
    column: Column
    rowId: number
    isTitles: TableProps['isTitles']
}

const Cell = ({
    row,
    column,
    rowId,
    isTitles
}: Props) => {
    const rawValue = row[column.field]

    const stringValue = typeof rawValue !== 'undefined' && rawValue !== null ? String(rawValue) : ''

    const content = column.formatter
        ? column.formatter(stringValue, row)
        : typeof column.autoinc !== 'undefined'
            ? <span>{rowId + 1}</span>
            : <span>{stringValue}</span>

    return (
        <div
            className='cell'
            title={isTitles && stringValue ? stringValue : ''}
        >
            {content}
        </div>
    )
}

export default Cell