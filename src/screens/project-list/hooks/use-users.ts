import { useEffect } from 'react'
import { cleanObject } from 'utils'
import { useHttp } from 'utils/http'
import { IUser } from '../types'
import { useAsync } from './use-async'

export const useUsers = (params?: Partial<IUser>) => {
    const client = useHttp()

    const { run, ...result } = useAsync<IUser[]>()

    useEffect(() => {
        run(client('users', { data: cleanObject(params || {}) }))
        // eslint-disable-next-line
    }, [params])

    // 将result返回出去给外面直接使用
    return result
}
