import { useEffect, useState } from 'react'

// 去除对象里面的值为假的，除开0
export function cleanObject(object: object) {
    const res = { ...object }

    for (const key in res) {
        // @ts-ignore
        if (!isFalse(object[key])) {
            // @ts-ignore
            delete res[key]
        }
    }
    return res
}

export function isFalse(val: unknown) {
    return val === 0 ? true : !!val
}

export const useMount = (callBack: () => void) => {
    useEffect(() => {
        typeof callBack === 'function' && callBack()
        // eslint-disable-next-line
    }, [])
}

export const useDebounce = (value: any, delay: number) => {
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
