import React from 'react'
import { column, localStorageData, localStorageSort } from './DataTable.types'
import Column from './Column'

type Props = {
  columns: Array<column>
  tableName: string
  sortBy: localStorageSort
  getSortField: (element: localStorageSort) => void
  getFilters: (element: localStorageData) => void
  filters: localStorageData
  [key: string]: unknown
}

const Header = ({ columns, tableName, getSortField, getFilters, filters }: Props) => {
  return (
    <div className={"table-columns"} style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(100px, 1fr))` }}>
      {typeof columns !== 'undefined'
        ? columns.map((column, id) => (
          <Column key={`column-${id}`} column={column} tableName={tableName} getSortField={getSortField} getFilters={getFilters} filters={filters} />
        ))
        : <div className={'data-error'}>Ошибка: columns is undefined</div>
      }
    </div>
  )
}

export default Header