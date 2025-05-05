import React, { useEffect, useState } from 'react'
import { column, localStorageData, localStorageSort } from './DataTable.types'
import SortDown from './img/SortDown'
import SortUp from './img/SortUp'

type Props = {
    tableName: string
    column: column
    getSortField: (element: localStorageSort) => void
    getFilters: (element: localStorageData) => void
    filters: localStorageData
}

const Column = ({ column, tableName, getSortField, getFilters, filters }: Props) => {
    const [sorter, setSorter] = useState<boolean | null>(null)
    const [filterValue, setFilterValue] = useState<string>('')

    useEffect(() => {
        try {
            const localSorter = localStorage.getItem(`${tableName}-sort-by`)
            if (localSorter) {
                const currentSort = JSON.parse(localSorter)
                setSorter(currentSort.col === column.field ? currentSort.type === 'asc' : null)
            }
        } catch (e) {
            console.error('Error parsing sort data:', e)
            setSorter(null)
        }
    }, [])

    // useEffect(() => {
    //     try {
    //         const localFilters = localStorage.getItem(`${tableName}-filters`)
    //         if (localFilters) {
    //             const currentFilters = JSON.parse(localFilters) || {}

    //             if (currentFilters && column.field in currentFilters) {
    //                 setFilterValue(currentFilters[column.field] || '')
    //             }
    //         }
    //     } catch (e) {
    //         console.error('Error parsing localStorage data:', e)
    //     }
    // }, [])


    useEffect(() => {
        if (sorter !== null) {
            const sortType = sorter ? 'asc' : 'desc'
            getSortField({ col: column.field, type: sortType })
            localStorage.setItem(
                `${tableName}-sort-by`,
                JSON.stringify({ col: column.field, type: sortType })
            )
        }
    }, [sorter])

    useEffect(() => {
        const newFilters = {
            ...filters,
            [column.field]: filterValue
        }
        getFilters(newFilters)
        localStorage.setItem(`${tableName}-filters`, JSON.stringify(newFilters))
    }, [filterValue])

    const handleSortClick = () => {
        const newSortValue = !sorter;
        setSorter(newSortValue);

        // Немедленно вызываем колбэк и сохраняем в localStorage
        const sortType = newSortValue ? 'asc' : 'desc';
        getSortField({ col: column.field, type: sortType });
        localStorage.setItem(
            `${tableName}-sort-by`,
            JSON.stringify({ col: column.field, type: sortType })
        );
    };

    return (
        <div className={'column'}>
            <div className='column-head'>
                <span>{column.title}</span>

                {typeof column.autoinc === 'undefined' &&
                    (typeof column.sortable === 'undefined' || column.sortable) && (
                        <div className={'sorter'} onClick={handleSortClick}>
                            {sorter === true ? <SortDown /> : <SortUp />}
                        </div>
                    )}
            </div>
            <div className={'column-footer'}>
                {typeof column.autoinc === 'undefined' &&
                    (typeof column.filterable === 'undefined' || column.filterable) && (
                        <input
                            type="text"
                            value={filterValue}
                            onChange={(e) => setFilterValue(e.target.value || '')}
                            placeholder="Фильтр..."
                        />
                    )}
            </div>
        </div>
    )
}

export default Column