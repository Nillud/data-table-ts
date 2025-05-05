import React, { EventHandler, MouseEvent, useState } from 'react'
import { column, tableData, TableProps } from './DataTable.types'
import NextIcon from './img/NextIcon'
import LastIcon from './img/LastIcon'
import PrevIcon from './img/PrevIcon'
import FirstIcon from './img/FirstIcon'

type Props = {
  tableData: tableData
  originalData: tableData
  paginationCounts: TableProps["paginationCounts"]
  updateTable: () => void
  sortCounter: number
  tableName: string
  sortData: (data: tableData, col: column["field"], type: 'asc' | 'desc') => tableData
  sortBy: {
    [key: string]: unknown
  }
}

const TableFooter = ({ tableData, originalData, paginationCounts, updateTable, sortCounter, tableName, sortData, sortBy }: Props) => {
  const [counts, setCounts] = useState<number>(1)
  const [paginatedData, setPaginatedData] = useState<Array<tableData>>([])
  const [activeBtn, setActiveBtn] = useState<number>(-1)

  const PaginationNums = () => {
    const changeActiveBtn = (e: MouseEvent<HTMLButtonElement>) => {
      const currentBtn = +e.target.dataset.paginationButton
      
      setActiveBtn(currentBtn)
    }

    return (
      <div className={'buttons-num'}>
        {
          paginatedData.map((element, id) => (
            <button
              key={`pagination-${id}`}
              disabled={id === activeBtn}
              className={id === activeBtn ? 'btn-active' : ''}
              style={((id > (activeBtn == 0 ? activeBtn + 2 : activeBtn + 1)) || (id < activeBtn - 1) && id !== paginatedData.length - 2 && id !== paginatedData.length - 3) ? { display: 'none' } : {}}
              data-pagination-button={`${id}`}
              onClick={changeActiveBtn}
            >
              {id + 1}
            </button>
          ))
        }
      </div>
    )
  }

  const Pagination = () => {
    return (
      <>
        {
          paginationCounts
            ? <div className={'footer-pagination'}>
              <div className={'pagination-counts'}>
                <span>Показывать строк: </span>
                <select name="table-count" id="table-count" value={counts} onChange={(e) => setCounts(+e.target.value)}>
                  {
                    paginationCounts && paginationCounts.map(count => (
                      <option key={`${tableName}-count-${count}`} value={count}>{count == 0 ? 'Все' : count}</option>
                    ))
                  }
                </select>
              </div>

              <div className={'pagination-buttons'}>
                <button disabled={activeBtn == 0} onClick={() => setActiveBtn(0)}><FirstIcon /></button>
                <button disabled={activeBtn == 0} onClick={() => setActiveBtn(activeBtn - 1)}><PrevIcon /></button>

                <PaginationNums />

                <button disabled={activeBtn == paginatedData.length - 1} onClick={() => setActiveBtn(activeBtn + 1)}><NextIcon /></button>
                <button disabled={activeBtn == paginatedData.length - 1} onClick={() => setActiveBtn(paginatedData.length - 1)}><LastIcon /></button>
              </div>
            </div>
            : null
        }
      </>
    )
  }

  const TotalRows = () => {
    if (typeof originalData !== 'undefined') {
      let numberFrom = (activeBtn * counts) + 1
      let numberTo = (activeBtn + 1) * counts > originalData.length ? originalData.length : (activeBtn + 1) * counts

      if (counts == 0) {
        numberFrom = 1
        numberTo = originalData.length
      }

      return (
        <div className={'footer-count'}>
          <span>Показаны строки с {numberFrom} по {numberTo}, </span>
          <span>Всего: {originalData.length}</span>
        </div>
      )
    }

    return null
  }

  return (
    <div className='table-footer'>
      <TotalRows />
      <Pagination />
    </div>
  )
}

export default TableFooter