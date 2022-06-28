import { useAuth } from 'context/auth-context'
import { ProjectListScreen } from 'screens/project-list'

const AuthenticatedApp = () => {
    const { logout } = useAuth()
    return (
        <div>
            <button onClick={() => logout}>退出</button>
            <ProjectListScreen></ProjectListScreen>
        </div>
    )
}

export default AuthenticatedApp
