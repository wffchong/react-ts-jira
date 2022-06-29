import { IProject, IUser } from './types'
import { Table } from 'antd'

interface IListProps {
    list: IProject[]
    users: IUser[]
}

const List = ({ list, users }: IListProps) => {
    return (
        <Table
            columns={[
                {
                    title: '名称',
                    dataIndex: 'name',
                    sorter: (a, b) => a.name.localeCompare(b.name)
                },
                {
                    title: '负责人',
                    render(item: IProject) {
                        return (
                            <span key={item.id}>
                                <th>{users.find((user) => user.id === item.personId)?.name || '未知'}</th>
                            </span>
                        )
                    }
                }
            ]}
            dataSource={list}
            pagination={false}
        ></Table>
    )
}

export default List
