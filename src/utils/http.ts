import qs from 'qs'
import * as auth from 'auth-provider'
import { useAuth } from 'context/auth-context'

const baseUrl = process.env.REACT_APP_API_URL

interface IConfig extends RequestInit {
    token?: string
    data?: object
}

export const http = async (url: string, { data, token, headers, ...customConfig }: IConfig = {}) => {
    const config = {
        method: 'GET',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': data ? 'application/json' : ''
        },
        ...customConfig
    }

    if (config.method.toLocaleUpperCase() === 'GET') {
        url += `?${qs.stringify(data)}`
    } else {
        config.body = JSON.stringify(data || {})
    }

    return fetch(`${baseUrl}/${url}`, config).then(async (response) => {
        // 401代表token无效或者过期
        if (response.status === 401) {
            await auth.logout()
            // 刷新页面
            window.location.reload()
            return Promise.reject({ message: '请重新登录' })
        }
        const data = await response.json()
        if (response.ok) {
            return data
        } else {
            return Promise.reject(data)
        }
    })
}

export const useHttp = () => {
    const { user } = useAuth()
    return (...[url, config]: Parameters<typeof http>) => http(url, { ...config, token: user?.token })
}
