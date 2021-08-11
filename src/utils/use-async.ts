import { useCallback, useState } from "react";
import { useMountedRef } from "utils";

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
  throwOnError: false,
};
export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });

  const mountedRef = useMountedRef();

  const setData = useCallback((data: D) => {
    setState({
      data,
      error: null,
      stat: "success",
    });
  },[])

  const setError = useCallback((error: Error) => {
    setState({
      error,
      data: null,
      stat: "error",
    });
  },[])
  const [retry, setRetry] = useState(() => {
    return () => {};
  });

  //run触发异步请求
  const run = useCallback(
    (
      promise: Promise<D>,
      runConfig?: { retry: () => Promise<D> }
    ) => {
      if (!promise || !promise.then()) {
        throw new Error("请传入Promise类型数据");
      }
      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig);
        }
      });
      setState(prevState=>({ ...prevState, stat: "loading" }));
      return promise
        .then((data) => {
          if (mountedRef.current) {
            setData(data);
            return data;
          }
        })
        .catch((error) => {
          console.log(config.throwOnError, "error");
          setError(error);
          if (config.throwOnError) {
            return Promise.reject(error);
          }
          return error;
        });
    },
    [config.throwOnError,mountedRef,setData,setError])

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    // retry被调用时重新调用一下run的方法刷新state
    retry,
    setData,
    setError,
    ...state,
  };
};
