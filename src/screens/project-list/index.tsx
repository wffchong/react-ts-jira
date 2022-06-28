import { useEffect, useState } from 'react'
import List from './list'
import SearchPanel from './search-panel'
import { cleanObject, useDebounce, useMount } from 'utils'
import { useHttp } from 'utils/http'

export const ProjectListScreen = () => {
    const [list, setList] = useState([])
    const [users, setUsers] = useState([])

    const client = useHttp()

    const [params, setParams] = useState({
        name: '',
        personId: ''
    })

    const debounceParams = useDebounce(params, 200)

    useEffect(() => {
        client('projects', { data: cleanObject(debounceParams) }).then(setList)
    }, [debounceParams])

    useMount(() => {
        client('users').then(setUsers)
    })

    return (
        <div>
            <SearchPanel users={users} params={params} setParams={setParams} />
            <List list={list} users={users} />
        </div>
    )
}
