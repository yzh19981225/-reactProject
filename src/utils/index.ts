import { useEffect, useState } from "react";
//判断是否为空
export const isFalsy = (value: unknown): boolean => {
  return value === 0 ? true : !!value;
};

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";
//在一个函数里面直接改变传入得对象本身就是不好的因为js对象本身是引用类型
export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(object).forEach((key) => {
    const value = object[key];
    if (!isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};
//泛形的应用
export const useDebounce = <v>(value: v, delay?: number) => {
  // 这是一个内部得变量进入这个函数不会马上更新debouncedValue得值；
  const [debouncedValue, setDebouncedValue] = useState(value);
  // 每次在value变化得时候会设置一个定时器
  useEffect(() => {
    const timeout = setTimeout(() => {
      // 执行完setTimeout设置debouncedvalue得值
      setDebouncedValue(value);
    }, delay);
    // 每次在useEffect处理完以后在运行
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debouncedValue;
};


export const useDocumentTitle = (title:string,keepOnUnmount:boolean= true) =>{
    const Title = title;
    const oldTitle = document.title;
    useEffect(()=>{
      document.title = Title;
    },[Title,oldTitle,keepOnUnmount])
  
    useEffect(()=>{
        return ()=>{
          if(!keepOnUnmount)
          {
            
            document.title = oldTitle
          }
        }
        // eslint-disable-next-line
    },[])
}

// interface valueData {
//   value:[]

// }
// export const useArray = <T> (arr:T[]) => {
//   // hello，请把作业写在这里吧，写完记得再对照作业要求检查一下

//     const [value , setValue] = useState(arr)
//     return {
//       value,
//       setValue,
//       add:(item:T)=>{
//         setValue([...value,item])
//       },
//       removeIndex:(index:number)=>{
//         const Copy = [...value];
//         Copy.splice(index,1)
//         setValue(Copy)
//       },
//       clear:()=>{
//         setValue([])
//       }
//     }

// };

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

// 节流函数
// export  const throttle = (fun,delay)=>{
//     let timer;
//     return function (){
//         let context = this;
//         let args = arguments;
//         if(timer){
//             return;
//         }
//         timer = setTimeout(function (){
//             fun.apply(context,args)
//             timer = null
//         },delay)
//     }
// }
//节流
// export const throttle = (fn:()=>void,delay:number)=>{
//     let pre = 0;
//     return function (){
//         let now = new Date();
//         let context:any = this;
//         let args = arguments;
//         if(now - pre > delay){
//             fn.apply(context,args)
//             pre = now
//         }
//     }
// }
