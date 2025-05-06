import React from 'react'
import { Column as ColumnType, LocalStorageData, LocalStorageSort, TableProps } from './DataTable.types'
import Column from './Column'

type Props = {
  columns: Array<ColumnType>
  sortBy: LocalStorageSort
  getSortField: (element: LocalStorageSort) => void
  getFilters: (element: LocalStorageData) => void
  filters: LocalStorageData
  widths?: string
  headerGroup: TableProps['headerGroup']
  [key: string]: unknown
}

const Header = ({ columns, getSortField, sortBy, getFilters, filters, widths, headerGroup }: Props) => {
  const renderHeaderGroup = () => (
    headerGroup && (
      <div className={"table-columns"} style={{ gridTemplateColumns: widths || 'auto' }}>
        {headerGroup.map((col, id) => (
          <div key={`header-group-${id}`} className={'column'} style={{ gridColumn: `span ${col.cols || 1}` }}>
            <div className="column-head">
              <span>{col.title}</span>
            </div>
          </div>
        ))}
      </div>
    )
  )

  const renderColumns = () => (
    columns && columns.length > 0
      ? columns.map((column, id) => (
        <Column
          key={`column-${id}`}
          column={column}
          getSortField={getSortField}
          sortBy={sortBy}
          getFilters={getFilters}
          filters={filters}
        />
      ))
      : <div className={'data-error'}>Ошибка: columns is undefined</div>
  )
  return (
    <>
      {renderHeaderGroup()}
      
      <div className={"table-columns"} style={{ gridTemplateColumns: widths || 'auto' }}>
        {renderColumns()}
      </div>
    </>
  )
}

export default React.memo(Header)