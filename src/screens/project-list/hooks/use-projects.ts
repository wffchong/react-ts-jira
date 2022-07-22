import { useEffect } from 'react'
import { cleanObject } from 'utils'
import { useHttp } from 'utils/http'
import { IProject } from '../types'
import { useAsync } from './use-async'

export const useProjects = (params?: Partial<IProject>) => {
    const client = useHttp()

    const { run, ...result } = useAsync<IProject[]>()

    useEffect(() => {
        run(client('projects', { data: cleanObject(params || {}) }))
        // eslint-disable-next-line
    }, [params])

    // 将result返回出去给外面直接使用
    return result
}
