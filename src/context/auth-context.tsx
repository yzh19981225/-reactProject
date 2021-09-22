import React, { ReactNode, useCallback } from 'react'
import * as auth from 'auth-provider'
import { User } from 'screens/project-list/search-panel'
import { http } from 'utils/http'
import { useMount } from 'utils'
import { useAsync } from 'utils/use-async'
import { FullPageErrorFallback, FullPageLoading } from 'components/lib'
import * as authStore from 'store/auth.slice'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from 'store/auth.slice'
const AuthContext = React.createContext <{ 
    user:User|null,
    login:(from:AuthForm)=>Promise<void>
    register:(from:AuthForm)=>Promise<void>
    logout:()=>Promise<void>
}|undefined> (undefined)

export interface AuthForm{
    username:string,
    password:string
}

 export const bootstrapUser = async () =>{
     let user = null;
     const token = auth.getToken();
     if(token){
        const data  = await http('me',{token})
        user = data.user;
     }
     return user
}

AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({children}:{children:ReactNode}) =>{
    // const [user,setUser] = useState <User|null> (null)
    const  { error,isLoading,isIdle,isError,run} = useAsync<User|null>()
    const dispatch:(...args:unknown[])=>Promise<User>  = useDispatch()
    // const login  = (from:AuthForm)=>  auth.login(from).then (setUser)
    // const register  = (from:AuthForm)=>  auth.register(from).then (setUser)
    // const logout  = ()=>  auth.logout().then (() => setUser(null))
    useMount(()=>{
        run(dispatch(authStore.bootstrap()))
    });
    if(isIdle||isLoading){
        return <FullPageLoading/> 
    }
    if(isError){
    return <FullPageErrorFallback error={error}></FullPageErrorFallback>
        
    }
    return <div>{children}</div>
    // return <AuthContext.Provider children={children} value={{user,login,register,logout}} />    
}
export const useAuth = ()=>{
    const dispatch:(...args:unknown[])=>Promise<User> = useDispatch()
    const user = useSelector(selectUser)
    const login = useCallback((form:AuthForm)=> dispatch( authStore.login(form)) ,[dispatch])
    const register =useCallback((form:AuthForm)=> dispatch( authStore.register(form)) ,[dispatch])
    const logout =useCallback( ()=> dispatch( authStore.logout()) ,[dispatch])
    // return context;
    return {
        user,
        login,
        register,
        logout,
    }
}