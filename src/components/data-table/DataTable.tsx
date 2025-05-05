import { useEffect, useState } from 'react'
import { localStorageData, localStorageSort, tableData, TableProps } from './DataTable.types'
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
    const [currentData, setCurrentData] = useState<tableData>([])
    const [filters, setFilters] = useState<localStorageData>({})
    const [sortBy, setSortBy] = useState<localStorageSort>({ col: '', type: 'asc' })

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
            } catch (error) {
                console.error('Error parsing localStorage data:', error)

                setSortBy({ col: '', type: 'asc' })
                setFilters({})
            }
        }

        loadFromLocalStorage()
        setCurrentData(tableData)
    }, [])

    useEffect(() => {
        setCurrentData(tableData)
    }, [tableData])


    // useEffect(() => {
    //     setCurrentData(prevData => {
    //         return sortData(prevData, String(sortBy.col), sortBy.type)
    //     })
    // }, [sortBy])\

    // useEffect(() => {
    //     if (filters !== null) {
    //         setCurrentData(prevData => {
    //             let result = [...tableData]

    //             for (const filter in filters) {
    //                 const currentColumn = columns.find(col => col.field === filter)
    //                 const value = String(filters[filter])

    //                 if (currentColumn?.headerFilter) {
    //                     result = result.filter(element =>
    //                         currentColumn.headerFilter!(value, String(element[filter])))
    //                 } else {
    //                     result = filterData(result, filter, value)
    //                 }
    //             }

    //             return result;
    //         });

    //         localStorage.setItem(`${tableName}-filters`, JSON.stringify(filters))
    //     }
    // }, [filters])


    useEffect(() => {
        if (filters !== null) {
            setCurrentData(prevData => {
                let result = [...tableData]
                // let result = [...prevData]

                // if (filters) {
                //     result = [...tableData]
                // }

                if (filters) {
                    for (const filter in filters) {
                        const currentColumn = columns.find(col => col.field === filter);
                        const filterValue = String(filters[filter]);

                        if (filterValue === '') continue;

                        if (currentColumn?.headerFilter) {
                            result = result.filter(element => currentColumn.headerFilter!(filterValue, String(element[filter])))
                        } else {
                            result = filterData(result, filter, String(filters[filter]))
                        }
                    }
                }

                if (sortBy.col) {
                    result = sortData(result, sortBy.col, sortBy.type);
                }

                return result;
            });

            if (filters !== null) {
                localStorage.setItem(`${tableName}-filters`, JSON.stringify(filters));
            }
        }
    }, [filters, sortBy])

    return (
        <div className={"table-container"}>
            {
                wordBtn || excelBtn
                && <ExportSection
                    wordBtn={wordBtn}
                    excelBtn={excelBtn}
                    downloadSectionLeftSideContent={downloadSectionLeftSideContent}
                    tableData={tableData}
                    columns={columns}
                    tableName={tableName}
                    exportCustomColumns={exportCustomColumns}
                />
            }

            <div className={"table"}>
                <TableHeader
                    columns={columns}
                    tableName={tableName}
                    sortBy={sortBy}
                    getSortField={(val: localStorageSort) => setSortBy(val)}
                    filters={filters}
                    getFilters={(value: localStorageData) => setFilters(value)}
                />

                {
                    !loading
                        ? <TableBody
                            tableData={currentData}
                            columns={columns}
                            scrollable={scrollable}
                            scrollHeight={scrollHeight}
                        />
                        : <TableLoading />
                }

                {
                    isFooter
                    && <TableFooter
                        paginationCounts={paginationCounts}
                        tableData={currentData}
                        originalData={currentData}
                        updateTable={() => { }}
                        sortCounter={0}
                        tableName={tableName}
                        sortData={sortData}
                        sortBy={{}}
                    />
                }
            </div>
        </div>
    )
}

export default DataTable