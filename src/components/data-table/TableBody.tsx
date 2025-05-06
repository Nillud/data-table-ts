import React from 'react'
import { column, tableData } from './DataTable.types'
import Row from './Row'

type Props = {
    columns: Array<column>
    tableData: tableData
    loading?: boolean
    scrollable?: boolean
    scrollHeight?: number
    widths?: string
}

const TableBody = ({ columns, tableData, scrollable, scrollHeight, widths }: Props) => {
    return (
        <div className={`table-body${scrollable ? ' table-body-scrollable' : ''}`} style={scrollable ? { height: scrollHeight } : {}}>
            {
                tableData && tableData.length !== 0
                    ? tableData.map((element, id) => (
                        <Row key={`row-${id}`} rowId={id} row={element} columns={columns} widths={widths} />
                    ))
                    : <div className={'table-row'} style={{ height: '100%' }}>
                        <div className='row-item' style={{ margin: 'auto' }}>Данных нет</div>
                    </div>
            }
        </div>
    )
}

export default TableBody