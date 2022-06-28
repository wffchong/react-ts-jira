import { useEffect, useState } from 'react'
import List from './list'
import SearchPanel from './search-panel'
import * as qs from 'qs'
import { cleanObject, useDebounce, useMount } from '../utils'

const baseUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
    const [list, setList] = useState([])
    const [users, setUsers] = useState([])

    const [params, setParams] = useState({
        name: '',
        personId: ''
    })

    const debounceParams = useDebounce(params, 2000)

    useEffect(() => {
        fetch(`${baseUrl}/projects?${qs.stringify(cleanObject(debounceParams))}`).then(async (response) => {
            if (response.ok) {
                setList(await response.json())
            }
        })
    }, [debounceParams])

    useMount(() => {
        fetch(`${baseUrl}/users`).then(async (response) => {
            if (response.ok) {
                setUsers(await response.json())
            }
        })
    })

    return (
        <div>
            <SearchPanel users={users} params={params} setParams={setParams} />
            <List list={list} users={users} />
        </div>
    )
}
