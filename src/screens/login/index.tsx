import { FormEvent } from 'react'

interface ILoginParams {
    username: string
    password: string
}

const baseUrl = process.env.REACT_APP_API_URL

const Login = () => {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const username = (e.currentTarget.elements[0] as HTMLInputElement).value
        const password = (e.currentTarget.elements[1] as HTMLInputElement).value

        login({ username, password })
    }

    const login = (params: ILoginParams) => {
        fetch(`${baseUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then(async (response) => {
            if (response.ok) {
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">用户名</label>
                <input type="text" id="username" />
            </div>
            <div>
                <label htmlFor="password">用户名</label>
                <input type="password" id="password" />
            </div>
            <button type="submit">登录</button>
        </form>
    )
}

export default Login
