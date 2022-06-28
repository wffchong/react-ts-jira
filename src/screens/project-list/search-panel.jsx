const SearchPanel = ({ users, params, setParams }) => {
    return (
        <form>
            <input
                type="text"
                value={params.name}
                onChange={(ev) =>
                    setParams({
                        ...params,
                        name: ev.target.value
                    })
                }
            />
            <select
                value={params.personId}
                onChange={(ev) =>
                    setParams({
                        ...params,
                        personId: ev.target.value
                    })
                }
            >
                <option value="">负责人</option>
                {users.map((item) => {
                    return (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    )
                })}
            </select>
        </form>
    )
}

export default SearchPanel
