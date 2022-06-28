// 在真实环境中，如果使用firebase这种第三方auth服务的话，本文件不需要开发者开发

import { IUser } from 'screens/project-list/types'
import { ILoginParams } from 'unauthenticated-app/login'

const baseUrl = process.env.REACT_APP_API_URL

const localStorageKey = '__auth_provider_token__'

export const getToken = () => localStorage.getItem(localStorageKey)

export const handleLoginResponse = ({ user }: { user: IUser }) => {
    localStorage.setItem(localStorageKey, user.token || '')
    return user
}

export const login = (params: ILoginParams) => {
    return fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    }).then(async (response) => {
        if (response.ok) {
            return handleLoginResponse(await response.json())
        } else {
            return Promise.reject(params)
        }
    })
}

export const register = (params: ILoginParams) => {
    return fetch(`${baseUrl}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    }).then(async (response) => {
        if (response.ok) {
            return handleLoginResponse(await response.json())
        } else {
            return Promise.reject(params)
        }
    })
}

export const logout = async () => window.localStorage.removeItem(localStorageKey)
