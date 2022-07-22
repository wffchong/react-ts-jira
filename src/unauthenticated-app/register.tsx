import { useAuth } from 'context/auth-context'
import { Form, Input } from 'antd'
import { LongButton } from 'unauthenticated-app'
import { useAsync } from 'screens/project-list/hooks/use-async'

export interface ILoginParams {
    username: string
    password: string
}

interface IRegisterProps {
    onError: (error: Error) => void
}

const RegisterScreen = ({ onError }: IRegisterProps) => {
    const { register } = useAuth()
    const { run, isLoading } = useAsync(undefined, { throwOnError: true })

    const handleSubmit = async ({ cpassword, ...value }: { username: string; password: string; cpassword: string }) => {
        if (cpassword !== value.password) {
            onError(new Error('两次输入的密码不一样'))
            return
        }
        try {
            await run(register(value))
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
            <Form.Item name="cpassword" rules={[{ required: true, message: '确认密码不能为空' }]}>
                <Input type="password" placeholder="请确认密码" />
            </Form.Item>
            <Form.Item>
                <LongButton loading={isLoading} htmlType="submit" type="primary">
                    注册
                </LongButton>
            </Form.Item>
        </Form>
    )
}

export default RegisterScreen
