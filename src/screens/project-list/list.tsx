import { IProject, IUser } from './types'

interface IListProps {
    list: IProject[]
    users: IUser[]
}

const List = ({ list, users }: IListProps) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>名称</th>
                    <th>负责人</th>
                </tr>
            </thead>
            <tbody>
                {list.map((item) => {
                    return (
                        <tr key={item.id}>
                            <th>{item.name}</th>
                            <th>{users.find((user) => user.id === item.personId)?.name || '未知'}</th>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default List
