import { useCallback, useState, useReducer } from "react";
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

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();
  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch, mountedRef]
  );
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };

  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => {
      console.log(state, action, "useReducer");
      return { ...state, ...action };
    },

    {
      ...defaultInitialState,
      ...initialState,
    }
  );

  // const [state, setState] = useState<State<D>>({
  //   ...defaultInitialState,
  //   ...initialState,
  // });

  const safeDispatch = useSafeDispatch(dispatch);

  const setData = useCallback(
    (data: D) => {
      safeDispatch({
        data,
        error: null,
        stat: "success",
      });
    },
    [safeDispatch]
  );

  const setError = useCallback(
    (error: Error) => {
      safeDispatch({
        error,
        data: null,
        stat: "error",
      });
    },
    [safeDispatch]
  );
  const [retry, setRetry] = useState(() => {
    return () => {};
  });

  //run触发异步请求
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then()) {
        throw new Error("请传入Promise类型数据");
      }
      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig);
        }
      });
      safeDispatch({ stat: "loading" });
      return promise
        .then((data) => {
          setData(data);
          return data;
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
    [config.throwOnError, setData, setError, safeDispatch]
  );

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
