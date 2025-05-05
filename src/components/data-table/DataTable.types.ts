import { ReactElement } from "react"

type tableElement = {
    [key: string]: string | number
}

type tableData = Array<tableElement>

type column = {
    field: string	// Устанавливает связь по ключу в массиве данных tableData
    title: string	// Устанавливает заголовок столбца
    width?: number	// Принимает числовое значение, ограничивает ширину столбца в пикселях
    autoinc?: boolean	// Форматирует значения в столбце по порядку в таблице, начиная с 1
    formatter?: (cell: string, row: tableElement) => ReactElement // Кастомное форматирование, принимает в себя функцию, описание далее
    exportCustomCell?: (cell: string, row: tableElement) => string	// Кастомное форматирование для Excel и Word, принимает в себя функцию, возвращает строку
    headerFilter?: (headerValue: string, rowValue: string) => string	// Кастомный фильтр, принимает в себя функуцию, описание далее
    sortable?: boolean	//  Убирает возможность сортировки, по умолчанию true
    filterable?: boolean // Убирает возможность фильтрации, по умолчанию true
}

type TableProps = {
    tableData: tableData
    columns: Array<column>
    tableName: string	// Наименование таблицы для хранения значений в localStorage
    loading?: boolean	// Состояние загрузки, принимает в себя state типа boolean
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
}

type localStorageData = {
    [key: string]: unknown
}

type localStorageSort = {
    col: string
    type: 'asc' | 'desc'
}

export type { tableElement, tableData, column, TableProps, localStorageData, localStorageSort }