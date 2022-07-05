import { useState } from 'react'
import List from './list'
import SearchPanel from './search-panel'
import { useDebounce, useDocumentTitle } from 'utils'
import styled from '@emotion/styled'
import { Typography } from 'antd'
import { useProjects } from './hooks/use-projects'
import { useUsers } from './hooks/use-users'

export const ProjectListScreen = () => {
    const [params, setParams] = useState({
        name: '',
        personId: ''
    })

    const debounceParams = useDebounce(params, 200)

    const { error, isLoading, data: list } = useProjects(debounceParams)
    const { data: users } = useUsers()

    useDocumentTitle('项目列表', false)

    return (
        <div>
            <Container>
                <h1>项目列表</h1>
                <SearchPanel users={users || []} params={params} setParams={setParams} />
                {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
                <List loading={isLoading} dataSource={list || []} users={users || []} />
            </Container>
        </div>
    )
}

const Container = styled.div`
    padding: 3.2rem;
`
