import { useAuth } from 'context/auth-context'
import { Form, Input, Button } from 'antd'

export interface ILoginParams {
    username: string
    password: string
}

const LoginScreen = () => {
    const { login } = useAuth()

    const handleSubmit = (value: { username: string; password: string }) => {
        login(value)
    }

    return (
        <Form onFinish={handleSubmit}>
            <Form.Item rules={[{ required: true, message: '用户名不能为空' }]}>
                <Input type="text" name="username" placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item rules={[{ required: true, message: '密码不能为空' }]}>
                <Input type="password" name="password" placeholder="请输入密码" />
            </Form.Item>
            <Form.Item>
                <Button type="primary">登录</Button>
            </Form.Item>
        </Form>
    )
}

export default LoginScreen
