import { createContext, useContext, ReactNode } from 'react'
import * as auth from 'auth-provider'
import { IUser } from 'screens/project-list/types'
import { ILoginParams } from 'unauthenticated-app/login'
import { http } from 'utils/http'
import { useMount } from 'utils'
import { useAsync } from 'screens/project-list/hooks/use-async'
import { FullPageErrorFallback, FullPageLoading } from 'components/lib'

// 登录持久化
const bootstrapUser = async () => {
    let user = null
    const token = auth.getToken()
    if (token) {
        const data = await http('me', { token })
        user = data.user
    }
    return user
}

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
    // const [user, setUser] = useState<IUser | null>(null)
    const { data: user, setData: setUser, run, isIdle, isError, isLoading, error } = useAsync<IUser | null>()

    const login = (form: ILoginParams) => auth.login(form).then(setUser)

    const register = (form: ILoginParams) => auth.register(form).then(setUser)

    const logout = () => auth.logout().then(() => setUser(null))
    useMount(() => {
        run(bootstrapUser())
    })

    // 初始化或者请求时返回这个loading页面
    if (isIdle || isLoading) {
        return <FullPageLoading />
    }

    // 这里返回错误页面
    if (isError) {
        return <FullPageErrorFallback error={error} />
    }

    return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth必须在AuthProvider中使用')
    }
    return context
}
