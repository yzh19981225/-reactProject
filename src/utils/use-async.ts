import { useState } from "react";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  stat: "idle",
  error: null,
  data: null,
};
const defaultConfig = {
   throwOnError:false
}
export const useAsync = <D>(initialState?: State<D>,initialConfig?:typeof defaultConfig) => {
  const config = {...defaultConfig,...initialConfig}
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,   
  });
  const setData = (data: D) => {
    setState({
      data,
      error: null,
      stat: "success",
    });
  };
  const setError = (error: Error) => {
    setState({
      error,
      data: null,
      stat: "error",
    });
  };
  //run触发异步请求
  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then()) {
      throw new Error("请传入Promise类型数据");
    }
    setState({ ...state, stat: "loading" });
    return promise.then((data) => {
      setData(data);
      return data;
    }).catch(error=>{
      console.log(config.throwOnError,"error")
        setError(error)
        if(config.throwOnError){
          return Promise.reject(error);
        }
        return error
    })
  };
  return {
      isIdle:state.stat === 'idle',
      isLoading:state.stat === 'loading',
      isError:state.stat === 'error',
      isSuccess:state.stat === 'success',
      run,
      setData,
      setError,
      ...state
  }
};
