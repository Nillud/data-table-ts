import { ReactElement } from "react"

type TableElement = {
    [key: string]: string | number
}

type TableData = Array<TableElement>

type Column = {
    field: string	// Устанавливает связь по ключу в массиве данных tableData
    title: string	// Устанавливает заголовок столбца
    width?: number	// Принимает числовое значение, ограничивает ширину столбца в пикселях
    autoinc?: boolean	// Форматирует значения в столбце по порядку в таблице, начиная с 1
    formatter?: (cell: string, row: TableElement) => ReactElement // Кастомное форматирование, принимает в себя функцию, описание далее
    exportCustomCell?: (cell: string, row: TableElement) => string	// Кастомное форматирование для Excel и Word, принимает в себя функцию, возвращает строку
    headerFilter?: (headerValue: string, rowValue: string) => string	// Кастомный фильтр, принимает в себя функуцию, описание далее
    sortable?: boolean	//  Убирает возможность сортировки, по умолчанию true
    filterable?: boolean // Убирает возможность фильтрации, по умолчанию true
}

type TableProps = {
    tableData: TableData
    columns: Array<Column>
    tableName: string	// Наименование таблицы для хранения значений в localStorage
    loading?: boolean	// Состояние загрузки, принимает в себя state типа boolean
    loadingElement?: ReactElement | null
    isFooter?: boolean	// Отображение footer
    paginationCounts?: Array<number> | null	// Принимает массив чисел, число - количество строк для пагинации
    scrollable?: boolean	// Зафиксировать высоту таблицы и добавить скролл
    scrollHeight?: number	// Высота тела таблицы, работает, если scrollable: true
    exportCustomColumns?: Array<{
        key: string
        width: number
    }> | null	// Принимает в себя массив объектов
    excelBtn?: boolean	// Показывать кнопку экспорта Excel
    wordBtn?: boolean	// Показывать кнопку экспорта Word
    downloadSectionLeftSideContent?: ReactElement | null	// React Component	Отображать контент с левой стороны от кнопок экспорта
    headerGroup?: Array<{
        title: string,
        cols: number
    }> | null // Добавляет группировку заголовков (заголовок - title, растягивается на cols - столбцов)
    groupBy?: string | null // Добавляет группировку по полю (groupBy = column.field)
    isTitles?: boolean // Добавляет html title в ячейки, по умолчанию column.title
}

type LocalStorageData = {
    [key: string]: string | number | undefined
}

type LocalStorageSort = {
    col: string
    type: 'asc' | 'desc'
}

type PaginationSize = number

type PaginationPage = number

export type { TableElement, TableData, Column, TableProps, LocalStorageData, LocalStorageSort, PaginationSize, PaginationPage }