import { useEffect, useRef, useState } from 'react'

// 去除对象里面的值为假的，除开0
export function cleanObject(object: { [key: string]: unknown }) {
    const res = { ...object }

    for (const key in res) {
        if (!isFalse(object[key])) {
            delete res[key]
        }
    }
    return res
}

export function isFalse(val: unknown) {
    return val === 0 ? true : !!val
}

export const useMount = (callBack: () => void) => {
    // useEffect(() => {
    //     typeof callBack === 'function' && callBack()
    //     // eslint-disable-next-line
    // }, [])
    const [first, setFirst] = useState(true)

    if (first) {
        typeof callBack === 'function' && callBack()
        setFirst(false)
    }
}

export const useDebounce = <V>(value: V, delay: number) => {
    const [debounceValue, setDebounceValue] = useState(value)
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceValue(value)
        }, delay)
        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])
    return debounceValue
}

export const useArray = <T>(array: T[]) => {
    // hello，请把作业写在这里吧，写完记得再对照作业要求检查一下
    const [value, setValue] = useState(array)

    return {
        value,
        setValue,
        add: (item: T) => setValue([...value, item]),
        clear: () => setValue([]),
        removeIndex: (idx: number) => {
            const res = [...value]
            res.splice(idx, 1)
            setValue(res)
        }
    }
}

// keepOnUnmount离开此页面是否需要保存该页面title
export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
    // 使用useRef包裹的值在整个生命周期都是不会发生变化的
    const oldTitle = useRef(document.title).current

    useEffect(() => {
        document.title = title
    }, [title])

    useEffect(() => {
        return () => {
            if (!keepOnUnmount) {
                document.title = oldTitle
            }
        }
    }, [oldTitle, keepOnUnmount])
}
