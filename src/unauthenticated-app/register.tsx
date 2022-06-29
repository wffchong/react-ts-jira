import { useAuth } from 'context/auth-context'
import { Form, Input } from 'antd'
import { LongButton } from 'unauthenticated-app'

export interface ILoginParams {
    username: string
    password: string
}

const RegisterScreen = () => {
    const { register } = useAuth()

    const handleSubmit = (value: { username: string; password: string }) => register(value)

    return (
        <Form onFinish={handleSubmit}>
            <Form.Item name="username" rules={[{ required: true, message: '用户名不能为空' }]}>
                <Input type="text" placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: '密码不能为空' }]}>
                <Input type="password" placeholder="请输入密码" />
            </Form.Item>
            <Form.Item>
                <LongButton htmlType="submit" type="primary">
                    注册
                </LongButton>
            </Form.Item>
        </Form>
    )
}

export default RegisterScreen
