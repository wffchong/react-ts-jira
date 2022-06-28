import { createContext, useState, useContext, ReactNode } from 'react'
import * as auth from 'auth-provider'
import { IUser } from 'screens/project-list/types'
import { ILoginParams } from 'unauthenticated-app/login'

const AuthContext = createContext<
    | {
          user: IUser | null
          login: (form: ILoginParams) => Promise<void>
          register: (form: ILoginParams) => Promise<void>
          logout: () => Promise<void>
      }
    | undefined
>(undefined)

AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null)

    // const login = (form: ILoginParams) => auth.login(form).then((res) => setUser(res))

    // const register = (form: ILoginParams) => auth.register(form).then((res) => setUser(res))

    // const logout = () => auth.logout().then((res) => setUser(null))

    // 消参
    const login = (form: ILoginParams) => auth.login(form).then(setUser)

    const register = (form: ILoginParams) => auth.register(form).then(setUser)

    const logout = () => auth.logout().then(() => setUser(null))

    return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth必须在AuthProvider中使用')
    }
    return context
}
