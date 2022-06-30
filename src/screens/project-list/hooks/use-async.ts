// 'idle' | 'loading' | 'error' | 'success'
// 代表初始 | 发送请求 | 请求失败 | 请求成功  的四种loading状态

import { useState } from 'react'

interface IState<D> {
    data: D | null
    error: Error | null
    status: 'idle' | 'loading' | 'error' | 'success'
}

const defaultState: IState<null> = {
    data: null,
    error: null,
    status: 'idle'
}

export const useAsync = <D>(initialState?: IState<D>) => {
    const [state, setState] = useState<IState<D>>({
        ...defaultState,
        ...initialState
    })

    const setData = (data: D) => {
        setState({ ...state, data })
    }

    const setError = (error: Error) => {
        setState({
            data: null,
            error,
            status: 'error'
        })
    }

    // run函数用来执行异步操作
    const run = (promise: Promise<D>) => {
        if (!promise || !promise.then) {
            throw new Error('使用run函数必须传入一个 Promise ')
        }

        // 修改loading状态
        setState({
            ...state,
            status: 'loading'
        })

        // 返回一个promise
        return promise
            .then((data) => {
                setData(data)
            })
            .catch((error) => {
                setError(error)
            })
    }

    return {
        isIdle: state.status === 'idle',
        isError: state.status === 'error',
        isSuccess: state.status === 'success',
        isLoading: state.status === 'loading',
        run,
        ...state
    }
}
