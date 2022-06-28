import { useCallback, useEffect, useState } from 'react'

// 去除对象里面的值为假的，除开0
export function cleanObject(object) {
    const res = { ...object }

    for (const key in res) {
        if (!isFalse(object[key])) {
            delete res[key]
        }
    }
    return res
}

export function isFalse(val) {
    return val === 0 ? true : !!val
}

// export const useMount = (callBack) => {
//     useEffect(() => {
//         callBack()
//     }, [])
// }

export const useMount = (callBack) => {
    useEffect(() => {
        typeof callBack === 'function' && callBack()
        // eslint-disable-next-line
    }, [])
}

export const useDebounce = (value, delay) => {
    const [debounceValue, setDebounceValue] = useState(value)
    useEffect(() => {
        let timer = setTimeout(() => {
            setDebounceValue(value)
        }, delay)
        return () => {
            clearTimeout(timer)
            timer = null
        }
    }, [value, delay])
    return debounceValue
}
