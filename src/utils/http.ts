import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";
const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  data?: object;
  token?: string|null;
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `${token}` : "",
      "Content-Type": data ? "appliation/json" : "",
    },
    ...customConfig,
  };
  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  return window
    .fetch(`${apiUrl}/${endpoint} `, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout();
        // window.location.reload();
        return Promise.reject({ message: "请重新登陆" });
      }
      const data = await response.json()
      if(response.ok){
          return data;
      } else{
        console.log(data,"data")
          return Promise.reject(data)
      } 
    });
};


export const useHttp = () =>{
  const {user} = useAuth(); 
  //utility type 的用法用泛形给他传进来一个其他类型然后utility type进行一些操作 
  return (...[endpoint,config]:Parameters<typeof http>)=>http(endpoint,{...config,token:user?.token})
}

// type myFavoriteNumber  = string|number  