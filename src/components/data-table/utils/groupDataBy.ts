import { TableData } from "../DataTable.types"

type GroupedData = {
    key: string
    items: TableData
}

export const groupDataBy = (data: TableData, key: string): GroupedData[] => {
    const groups = new Map<string, TableData>()

    data.forEach(item => {
        const groupKey = item[key] || '—' // fallback если undefined
        if (!groups.has(String(groupKey))) {
            groups.set(String(groupKey), [])
        }
        groups.get(String(groupKey))!.push(item)
    })

    return Array.from(groups.entries()).map(([key, items]) => ({ key, items }))
}