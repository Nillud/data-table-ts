import { useEffect, useState, useCallback } from 'react'
import { localStorageData, localStorageSort, paginationPage, paginationSize, tableData, TableProps } from './DataTable.types'
import TableHeader from './TableHeader'
import TableBody from './TableBody'
import TableFooter from './TableFooter'
import TableLoading from './table-loading/TableLoading'
import { filterData, sortData } from './functions/sort-data'
import ExportSection from './ExportSection'

const DataTable = ({
    tableData,
    columns,
    tableName = 'table-data',
    loading = false,
    isFooter = false,
    paginationCounts = null,
    scrollable = false,
    scrollHeight = 300,
    exportCustomColumns = null,
    excelBtn = false,
    wordBtn = false,
    downloadSectionLeftSideContent = null
}: TableProps) => {
    const [processedData, setProcessedData] = useState<tableData>([])
    const [displayData, setDisplayData] = useState<tableData>([])
    const [widths, setWidths] = useState<string>('1fr')

    const [filters, setFilters] = useState<localStorageData>({})
    const [sortBy, setSortBy] = useState<localStorageSort>({ col: '', type: 'asc' })

    const [paginationSize, setPaginationSize] = useState<paginationSize>(paginationCounts?.[0] || 10)
    const [paginationPage, setPaginationPage] = useState<paginationPage>(0)

    useEffect(() => {
        const loadFromLocalStorage = () => {
            try {
                const localSorter = localStorage.getItem(`${tableName}-sort-by`)
                if (localSorter) {
                    setSortBy(JSON.parse(localSorter))
                }

                const localFilters = localStorage.getItem(`${tableName}-filters`)
                if (localFilters) {
                    setFilters(JSON.parse(localFilters))
                }

                const localCounts = localStorage.getItem(`${tableName}-counts`)
                if (localCounts) {
                    setPaginationSize(localCounts === 'all' ? 0 : Number(localCounts))
                }

                const localPage = localStorage.getItem(`${tableName}-page`)
                if (localPage) {
                    setPaginationPage(Number(localPage))
                }
            } catch (error) {
                console.error('Error parsing localStorage data:', error)
                resetToDefaults()
            }
        }

        const resetToDefaults = () => {
            setSortBy({ col: '', type: 'asc' })
            setFilters({})
            setPaginationSize(paginationCounts?.[0] || 10)
            setPaginationPage(0)
        }

        loadFromLocalStorage()
    }, [tableName])

    // Расчет ширины колонок
    useEffect(() => {
        if (columns?.length) {
            setWidths(columns.map(c => c.width ? `${c.width}px` : '1fr').join(' '))
        }
    }, [columns])

    // Обработка данных (фильтрация и сортировка)
    const processData = useCallback(() => {
        let result = [...tableData]

        // Применяем фильтрацию
        if (filters) {
            for (const filter in filters) {
                const currentColumn = columns.find(col => col.field === filter)
                const filterValue = String(filters[filter])

                if (filterValue === '') continue

                if (currentColumn?.headerFilter) {
                    result = result.filter(element => currentColumn.headerFilter!(filterValue, String(element[filter])))
                } else {
                    result = filterData(result, filter, filterValue)
                }
            }
        }

        // Применяем сортировку
        if (sortBy.col) {
            result = sortData(result, sortBy.col, sortBy.type)
        }

        return result
    }, [tableData, filters, sortBy, columns])

    // Обновление processedData при изменении фильтров/сортировки
    useEffect(() => {
        setProcessedData(processData())
        // Сбрасываем на первую страницу при изменении фильтров/сортировки
        setPaginationPage(0)
    }, [processData])

    // Пагинация данных
    useEffect(() => {
        if (paginationSize === 0) {
            setDisplayData(processedData)
        } else {
            const start = paginationPage * paginationSize
            const end = start + paginationSize
            setDisplayData(processedData.slice(start, end))
        }
    }, [processedData, paginationSize, paginationPage])

    // Сохранение в localStorage
    useEffect(() => {
        localStorage.setItem(`${tableName}-filters`, JSON.stringify(filters))
    }, [filters, tableName])

    useEffect(() => {
        localStorage.setItem(`${tableName}-sort-by`, JSON.stringify(sortBy))
    }, [sortBy, tableName])

    useEffect(() => {
        localStorage.setItem(`${tableName}-counts`, paginationSize === 0 ? 'all' : paginationSize.toString())
    }, [paginationSize, tableName])

    useEffect(() => {
        localStorage.setItem(`${tableName}-page`, paginationPage.toString())
    }, [paginationPage, tableName])

    return (
        <div className="table-container">
            {(wordBtn || excelBtn) && (
                <ExportSection
                    wordBtn={wordBtn}
                    excelBtn={excelBtn}
                    downloadSectionLeftSideContent={downloadSectionLeftSideContent}
                    tableData={tableData}
                    columns={columns}
                    tableName={tableName}
                    exportCustomColumns={exportCustomColumns}
                />
            )}

            <div className="table">
                <TableHeader
                    columns={columns}
                    tableName={tableName}
                    sortBy={sortBy}
                    getSortField={setSortBy}
                    filters={filters}
                    getFilters={setFilters}
                    widths={widths}
                />

                {!loading ? (
                    <TableBody
                        tableData={displayData}
                        columns={columns}
                        scrollable={scrollable}
                        scrollHeight={scrollHeight}
                        widths={widths}
                    />
                ) : (
                    <TableLoading />
                )}

                {isFooter && (
                    <TableFooter
                        paginationCounts={paginationCounts}
                        tableData={processedData} // Передаем все отфильтрованные данные
                        paginationSize={paginationSize}
                        getPaginationSize={setPaginationSize}
                        paginationPage={paginationPage}
                        getPaginationPage={setPaginationPage}
                    />
                )}
            </div>
        </div>
    )
}

export default DataTable