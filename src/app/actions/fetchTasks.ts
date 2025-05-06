'use server'

import { tableData as TableData } from "@/components/data-table/DataTable.types"

export async function fetchTasks() {
    const url = 'https://smart-api.delo-it.ru/api/task/get-all'
    const body = { "da_owner_id": 1, "da_token": "fd31861f-d324-11ef-ac1a-525400056ae7", "du_id": 1 }
    const postData = {
        method: 'POST',
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(body)
    }

    const response = await fetch(url, postData)
    const tableData: TableData = await response.json()

    return tableData
}