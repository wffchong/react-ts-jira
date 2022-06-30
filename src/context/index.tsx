import { ReactNode } from 'react'
import { AuthProvider } from './auth-context'
// 这个是为了后续使用jira-dev-tools中的选项React Query不会报错。
import { QueryClient, QueryClientProvider } from 'react-query'

const AppProviders = ({ children }: { children: ReactNode }) => {
    return (
        <QueryClientProvider client={new QueryClient()}>
            <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
    )
}
export default AppProviders
