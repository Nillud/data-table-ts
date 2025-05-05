import React from 'react'
import { column, tableElement } from './DataTable.types'
import Cell from './Cell'

type Props = {
    rowId: number
    row: tableElement
    columns: Array<column>
    [key: string]: unknown
}

const Row = ({ rowId, columns, row }: Props) => {
    return (
        <div className={'table-row'} style={{gridTemplateColumns: `repeat(${columns.length}, minmax(100px, 1fr))`}}>
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