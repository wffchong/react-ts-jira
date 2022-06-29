import { useAuth } from 'context/auth-context'
import { ProjectListScreen } from 'screens/project-list'
import { Button } from 'antd'

const AuthenticatedApp = () => {
    const { logout } = useAuth()
    return (
        <div>
            <Button type="primary" onClick={logout}>
                退出
            </Button>
            <ProjectListScreen></ProjectListScreen>
        </div>
    )
}

export default AuthenticatedApp
