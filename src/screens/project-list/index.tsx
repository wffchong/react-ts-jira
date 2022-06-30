import { useEffect, useState } from 'react'
import List from './list'
import SearchPanel from './search-panel'
import { cleanObject, useDebounce, useMount } from 'utils'
import { useHttp } from 'utils/http'
import styled from '@emotion/styled'

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
        // eslint-disable-next-line
    }, [debounceParams])

    useMount(() => {
        client('users').then(setUsers)
    })

    return (
        <div>
            <Container>
                <h1>项目列表</h1>
                <SearchPanel users={users} params={params} setParams={setParams} />
                <List list={list} users={users} />
            </Container>
        </div>
    )
}

const Container = styled.div`
    padding: 3.2rem;
`
