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