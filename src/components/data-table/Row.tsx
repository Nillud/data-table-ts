import React from 'react'
import { Column, TableElement, TableProps } from './DataTable.types'
import Cell from './Cell'

type Props = {
    rowId: number
    row: TableElement
    columns: Array<Column>
    widths?: string
    isTitles?: TableProps['isTitles']
}

const Row = ({ rowId, columns, row, widths, isTitles }: Props) => (
    <div className={'table-row'} style={{ gridTemplateColumns: widths }}>
        {columns.map((column, id) => (
            <Cell
                key={`cell-${rowId}-${id}`}
                row={row}
                column={column}
                rowId={rowId}
                isTitles={isTitles}
            />
        ))}
    </div>
)

export default Row