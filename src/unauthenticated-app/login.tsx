import { useAuth } from 'context/auth-context'
import { Form, Input } from 'antd'
import { LongButton } from 'unauthenticated-app'
import { useAsync } from 'screens/project-list/hooks/use-async'

export interface ILoginParams {
    username: string
    password: string
}

interface ILoginProps {
    onError: (error: Error) => void
}

const LoginScreen = ({ onError }: ILoginProps) => {
    const { login } = useAuth()
    const { isLoading, run } = useAsync(undefined, { throwOnError: true })

    const handleSubmit = async (value: { username: string; password: string }) => {
        try {
            // 这里如果使用run的话catch捕捉不到错误，因为已经在run里面把错误消化了，所以需要改进一下run
            await run(login(value))
        } catch (error: any) {
            onError(error)
        }
    }

    return (
        <Form onFinish={handleSubmit}>
            <Form.Item name="username" rules={[{ required: true, message: '用户名不能为空' }]}>
                <Input type="text" placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: '密码不能为空' }]}>
                <Input type="password" placeholder="请输入密码" />
            </Form.Item>
            <Form.Item>
                <LongButton loading={isLoading} htmlType="submit" type="primary">
                    登录
                </LongButton>
            </Form.Item>
        </Form>
    )
}

export default LoginScreen
