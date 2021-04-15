import {useEffect, useState} from "react";


export const isFalsy = (value) => value === 0 ?true :  !!value


//在一个函数里面直接改变传入得对象本身就是不好的因为js对象本身是引用类型
export const cleanObject = (object) =>{
    const result = {...object}
    Object.keys(object).forEach(key=>{
        const value = object[key]
        if (!isFalsy(value)){
            delete result[key]
        }
    })
    return result;
}

export const useMount = (callback) =>{
    useEffect(()=>{
        callback()
    },[])// eslint-disable-line react-hooks/exhaustive-deps
}

export  const  useDebounce = (value,delay) =>{
    // 这是一个内部得变量进入这个函数不会马上更新debouncedValue得值；
    const [debouncedValue,setDebouncedValue] = useState(value);
    // 每次在value变化得时候会设置一个定时器
    useEffect(()=>{
        const timeout = setTimeout(()=>{
            // 执行完setTimeout设置debouncedvalue得值
            setDebouncedValue(value)
        },delay)
        // 每次在useEffect处理完以后在运行
        return ()=> clearTimeout(timeout)
    },[value,delay])
    return debouncedValue
}
// export const useDebounce = (value,delay)=>{
//     let timeout
//     return ()=>{
//         if(timeout){
//          clearTimeout(timeout)
//         }
//         timeout = setTimeout(()=>{
//             return value
//         },delay)
//     }
// }

// export const debounce = (func , delay)=>{
//     let timeout;
//     return ()=>{
//         if(timeout){
//             clearTimeout(timeout)
//         }
//         timeout = setTimeout (()=>{
//                 func()
//         },delay)
//     }
// }
// const log = debounce(()=>{console.log("call")},5000)