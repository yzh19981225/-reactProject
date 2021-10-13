import { useMemo, } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject,  } from "utils";

/**
 * 返回页面中 指定键的参数
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
        // eslint-disable-next-line 
      [searchParams]
    ),
    (params:Partial<{[key in K]:unknown}>)=>{ 
        // iterator 迭代器
        const o = cleanObject({...Object.fromEntries(searchParams),...params}) as URLSearchParamsInit
        return setSearchParams(o)
    }
  ] as const;
};

// export const useUrlQueryParam = <K extends string>(keys: K[]) => {
//   const [searchParams, setSearchParam] = useSearchParams();
//   const [stateKeys] = useState(keys);
//   return [
//     useMemo(
//       () =>
//         subset(Object.fromEntries(searchParams), stateKeys) as {
//           [key in K]: string;
//         },
//       [searchParams, stateKeys]
//     ),
//     (params: Partial<{ [key in K]: unknown }>) => {
//       // iterator
//       // iterator: https://codesandbox.io/s/upbeat-wood-bum3j?file=/src/index.js
//       const o = cleanObject({
//         ...Object.fromEntries(searchParams),
//         ...params,
//       }) as URLSearchParamsInit;
//       return setSearchParam(o);
//     },
//   ] as const;
// };
