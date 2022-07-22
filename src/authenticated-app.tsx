import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useAuth } from 'context/auth-context'
import { ProjectListScreen } from 'screens/project-list'
import styled from '@emotion/styled'
import { Row } from 'components/lib'
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import { Button, Dropdown, Menu } from 'antd'
import { ProjectScreen } from 'screens/project'

const AuthenticatedApp = () => {
    return (
        <Container>
            <PageHeader />
            <Main>
                <Router>
                    <Routes>
                        <Route path="/projects" element={<ProjectListScreen />} />
                        <Route path="/projects/:projectId/*" element={<ProjectScreen />} />
                    </Routes>
                </Router>
            </Main>
        </Container>
    )
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 6rem 1fr;
    height: 100vh;
`
const Header = styled(Row)`
    padding: 3.2rem;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
    z-index: 1;
`
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``

const Main = styled.main``

export default AuthenticatedApp

export const PageHeader = () => {
    const { logout, user } = useAuth()
    return (
        <Header between>
            <HeaderLeft gap>
                <SoftwareLogo width="18rem" color="rgb(38, 132, 255)" />
                <span>项目</span>
                <span>用户</span>
            </HeaderLeft>
            <HeaderRight>
                <Dropdown
                    overlay={
                        <Menu
                            style={{ textAlign: 'center' }}
                            items={[
                                {
                                    key: 'logout',
                                    label: '退出'
                                }
                            ]}
                            onClick={logout}
                        ></Menu>
                    }
                >
                    <Button type="link" onClick={(e) => e.preventDefault()}>
                        Hi, {user?.name}
                    </Button>
                </Dropdown>
            </HeaderRight>
        </Header>
    )
}
