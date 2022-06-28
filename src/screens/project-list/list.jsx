const List = ({ list, users }) => {
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
                            <th>{users.find((user) => user.id === item.personId).name}</th>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default List
