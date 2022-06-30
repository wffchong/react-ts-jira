import { IProject, IUser } from './types'
import { Table } from 'antd'
import dayjs from 'dayjs'

interface IListProps {
    list: IProject[]
    users: IUser[]
}

const List = ({ list, users }: IListProps) => {
    return (
        <Table
            rowKey={'id'}
            columns={[
                {
                    title: '名称',
                    dataIndex: 'name',
                    sorter: (a, b) => a.name.localeCompare(b.name)
                },
                {
                    title: '部门',
                    dataIndex: 'organization'
                },
                {
                    title: '负责人',
                    render(item: IProject) {
                        return (
                            <span key={item.id}>{users.find((user) => user.id === item.personId)?.name || '未知'}</span>
                        )
                    }
                },
                {
                    title: '创建时间',
                    render(item: IProject) {
                        return <span>{dayjs(item.created).format('YYYY-MM-DD')}</span>
                    }
                }
            ]}
            dataSource={list}
            pagination={false}
        ></Table>
    )
}

export default List
