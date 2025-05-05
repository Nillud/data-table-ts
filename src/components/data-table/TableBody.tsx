import React from 'react'
import { column, tableData } from './DataTable.types'
import Row from './Row'

type Props = {
    columns: Array<column>
    tableData: tableData
    loading?: boolean
    scrollable?: boolean
    scrollHeight?: number
}

const TableBody = ({ columns, tableData, scrollable, scrollHeight }: Props) => {
    return (
        <div className={`table-body${scrollable ? ' table-body-scrollable' : ''}`} style={scrollable ? { height: scrollHeight } : {}}>
            {
                tableData && tableData.length !== 0
                    ? tableData.map((element, id) => (
                        <Row key={`row-${id}`} rowId={id} row={element} columns={columns} />
                    ))
                    : <div className={'table-row'} style={{ gridTemplateColumns: `repeat(${columns.length | 1}, minmax(100px, 1fr))` }}>
                        <div className='row-item'>Данных нет</div>
                    </div>
            }
        </div>
    )
}

export default TableBody