import styles from './Export.module.scss'
import { AlignmentType, Document, Packer, 
    // PageOrientation, 
    Paragraph, Table, TableCell, TableRow, TextRun, VerticalAlign, WidthType } from "docx"
import { saveAs } from "file-saver"
import { column, tableData, tableElement, TableProps } from '../DataTable.types'

type Props = {
    wordData: tableData
    columns: Array<column>
    title: string
    exportCustomColumns?: TableProps["exportCustomColumns"]
}

const WordExport = ({ 
    wordData, 
    columns, 
    title, 
    // exportCustomColumns 
}: Props) => {
    const createNewWord = async () => {
        const tableHeaderValues = columns.map(col => (
            new TableCell({
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: col.title,
                                size: 22,
                            })
                        ],
                        alignment: AlignmentType.CENTER,
                    })
                ],
                verticalAlign: VerticalAlign.CENTER,
            })
        ))

        const tableHeaderTop = new TableRow({
            children: [
                ...tableHeaderValues
            ],
        })

        const tableRows = wordData.map((element: tableElement) => {
            const tableRow: Array<TableCell> = []

            columns.forEach(col => {
                const tableCell: TableCell = new TableCell({
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: typeof col.exportCustomCell !== 'undefined'
                                        ? col.exportCustomCell(String(element[col.field]), element)
                                        : `${element[col.field]}`,
                                    size: 22,
                                })
                            ],
                            alignment: AlignmentType.CENTER,
                        })
                    ],
                    verticalAlign: VerticalAlign.CENTER,
                })

                tableRow.push(tableCell)
            })

            return (
                new TableRow({
                    children: [
                        ...tableRow
                    ],
                })
            )
        })

        const table = [tableHeaderTop, ...tableRows]

        const doc = new Document({
            sections: [
                {
                    // properties: {
                    //     page: {
                    //         size: {
                    //             orientation: PageOrientation.LANDSCAPE
                    //         }
                    //     }
                    // },
                    children: [
                        new Table({
                            rows: table,
                            width: {
                                size: 11000,
                                type: WidthType.DXA
                            },
                            indent: {
                                size: -1000,
                                type: WidthType.DXA,
                            },
                        }),
                        new Paragraph({
                            spacing: {
                                after: 300
                            },
                            text: ''
                        })
                    ],
                },
            ],
        })

        Packer.toBlob(doc).then((blob) => {
            saveAs(blob, title)
        })
    }

    return (
        <button className={`${styles.buttonExport} ${styles.Word}`} onClick={createNewWord}>Скачать Word</button>
    )
}

export default WordExport