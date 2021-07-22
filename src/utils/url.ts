import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject } from "utils";

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
