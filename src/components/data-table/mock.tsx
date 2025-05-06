import { column, tableData } from "./DataTable.types"
import PenEdit from "./img/PenEdit"

const columns: Array<column> = [
    {
        field: "id",
        title: "ID",
        autoinc: true,
        width: 50
    },
    {
        field: "name",
        title: "Имя",
        formatter: function (cell) {
            return (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginBottom: 3 }}>{cell}</span>
                    <span style={{ marginLeft: 5, cursor: 'pointer' }} onClick={() => {}}><PenEdit /></span>
                </div>
            )
        },
    },
    {
        field: "email",
        title: "Email"
    },
    {
        field: "status",
        title: "Статус"
    },
    {
        field: "date",
        title: "Дата",
        filterable: false,
    },
    {
        field: "events",
        title: "Действия",
        filterable: false,
        formatter: function () {
            return (
                <div className={'row-item'} >
                    <div className={'actions'}>
                        <button className={'btn btn-edit'} title="Редактировать"> <PenEdit /> </button>
                        <button className={'btn btn-delete'}> Удалить </button>
                    </div>
                </div>
            )
        }
    },
]

const data: tableData = [
    {
        id: '1346724',
        name: 'Иван Петров',
        email: 'ivan@example.com',
        status: 'Активен',
        date: '12.02.2005'
    },
    {
        id: '2456893',
        name: 'Ольга Семенова',
        email: 'olga@example.com',
        status: 'Неактивен'
    },
    {
        id: '3789012',
        name: 'Алексей Козлов',
        status: 'Активен',
        date: '05.11.2010'
    },
    {
        id: '4567123',
        name: 'Екатерина Воробьева',
        email: 'ekaterina@example.com',
        date: '22.07.2018'
    },
    {
        id: '6789345',
        name: 'Анна Морозова',
        status: 'Неактивен'
    },
    {
        id: '7890456',
        name: 'Денис Павлов',
        email: 'denis@example.com',
        date: '14.09.2012'
    },
    {
        id: '9012678',
        name: 'Артем Федоров',
        status: 'Неактивен',
        date: '03.04.2008'
    },
    {
        id: '1023789',
        name: 'Наталья Григорьева',
        email: 'natalia@example.com'
    },
    {
        id: '1245901',
        name: 'Михаил Орлов',
        email: 'mikhail@example.com',
        status: 'Активен',
        date: '25.08.2016'
    },
    {
        id: '1356012',
        name: 'Виктория Зайцева'
    },
    {
        id: '1578234',
        name: 'Павел Соловьев',
        status: 'Активен'
    },
    {
        id: '1689345',
        name: 'Юлия Ковалева',
        email: 'yulia@example.com',
        date: '11.10.2014'
    },
    {
        id: '1801567',
        name: 'Ирина Белова',
        email: 'irina@example.com'
    },
    {
        id: '1912678',
        name: 'Константин Новиков',
        status: 'Активен',
        date: '09.06.2017'
    },
    {
        id: '1346724',
        name: 'Иван Петров',
        email: 'ivan@example.com',
        status: 'Активен',
        date: '12.02.2005'
    },
    {
        id: '2456893',
        name: 'Ольга Семенова',
        status: 'Неактивен'
    },
    {
        id: '3789012',
        name: 'Алексей Козлов',
        email: 'alexey@example.com'
    },
    {
        id: '4567123',
        name: 'Екатерина Воробьева',
        date: '22.07.2018'
    },
    {
        id: '5678234',
        name: 'Сергей Иванов',
        status: 'Активен'
    },
    {
        id: '6789345',
        name: 'Анна Морозова',
        email: 'anna@example.com',
        status: 'Неактивен',
        date: '05.03.2019'
    },
    {
        id: '9012678',
        name: 'Артем 1324t5341Федоров',
        status: 'Неак1t4143тивен',
        date: '03.04.2008'
    },
]

export { columns, data }