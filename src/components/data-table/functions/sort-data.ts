import { column, tableData } from "../DataTable.types";

const sortByAsc = (data: tableData, column: column["field"]) => {
    const sortedData = data.sort((a, b) => {
        if (!isNaN(+a[column]) && !isNaN(+b[column])) {
            return +a[column] - +b[column]
        }

        if (`${a[column]}`.toLowerCase() < `${b[column]}`.toLowerCase()) {
            return -1;
        }
        if (`${a[column]}`.toLowerCase() > `${b[column]}`.toLowerCase()) {
            return 1;
        }
        return 0;
    })

    return sortedData
}

const sortByDesc = (data: tableData, column: column["field"]) => {
    const sortedData = data.sort((a, b) => {
        if (!isNaN(+a[column]) && !isNaN(+b[column])) {
            return +b[column] - +a[column]
        }

        if (`${a[column]}`.toLowerCase() > `${b[column]}`.toLowerCase()) {
            return -1;
        }
        if (`${a[column]}`.toLowerCase() < `${b[column]}`.toLowerCase()) {
            return 1;
        }
        return 0;
    })

    return sortedData
}

const sortData = (data: tableData, col: column["field"], type: 'asc' | 'desc') => {
    if (type === 'asc') {
      return sortByAsc(data, col)
    } else {
      return sortByDesc(data, col)
    }
  }

const filterData = (data: tableData, filter: column["field"], value: string) => {
    if (value == '') return data

    const filteredData = data.filter(element => `${element[filter]}`.toLowerCase().includes(value.toLowerCase()))

    return filteredData
}

export { sortByAsc, sortByDesc, sortData, filterData }