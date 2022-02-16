import { useAsync } from "utils/use-async";
import { Project } from "screens/project-list/list";
import { cleanObject } from "utils/index";
import { useHttp } from "utils/http";
import { useQuery } from "react-query";

export const useProjects = (param?: Partial<Project>) => {
  // const { run, ...result } = useAsync<Project[]>();
  const client = useHttp();
  return useQuery<Project[]>(['projects',cleanObject(param)],()=>client("projects", { data: cleanObject(param || {}) }));
  // const fetchProjects = useCallback(
  //   () =>
  //   client("projects", { data: cleanObject(param || {}) }),
  //   [param,client]
  // )
  // useEffect(() => {
  //   run(fetchProjects(), {
  //     retry: fetchProjects,
  //   });
  // }, [param,fetchProjects,run]);
  // return result;
};
// 修改
export const useEditProjects = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };
  return { mutate, ...asyncResult };
};
// 添加
export const useAddProjects = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };
  return { mutate, ...asyncResult };
};
