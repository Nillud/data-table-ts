import React from 'react'
import { column, tableElement } from './DataTable.types'
import Cell from './Cell'

type Props = {
    rowId: number
    row: tableElement
    columns: Array<column>
    widths?: string
    [key: string]: unknown
}

const Row = ({ rowId, columns, row, widths }: Props) => {
    return (
        <div className={'table-row'} style={{gridTemplateColumns: widths}}>
            {
                columns && columns.length !== 0
                ? columns.map((column, id) => (
                    <Cell key={`cell-${rowId}-${id}`} row={row} column={column} rowId={rowId} />
                ))
                : null
            }
        </div>
    )
}

export default Row