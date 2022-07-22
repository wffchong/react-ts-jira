import { IProject, IUser } from './types'
import { Table } from 'antd'
import type { TableProps } from 'antd'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

// 这样写可以把传过来的赋值给table的属性一下展开
interface IListProps extends TableProps<IProject> {
    users: IUser[]
}

const List = ({ users, ...props }: IListProps) => {
    return (
        <Table
            rowKey={'id'}
            columns={[
                {
                    title: '名称',
                    sorter: (a, b) => a.name.localeCompare(b.name),
                    render(value, project) {
                        return <Link to={project.id}>{project.name}</Link>
                    }
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
            {...props}
        ></Table>
    )
}

export default List
