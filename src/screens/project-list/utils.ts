import { useMemo } from "react";
import { useUrlQueryParam } from "utils/url";

export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  return [
    useMemo(
      () =>  ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};

export const useProjectModal = () =>{
  const [{projectCreate}, setProjectCreate] = useUrlQueryParam(["projectCreate"])

  const open = ()=> {
    return setProjectCreate({projectCreate:true})}
  const close = ()=> {

   return setProjectCreate({projectCreate:false})
  }
  return {
    projectModalOpen:projectCreate === "true",
    open,
    close
  }as const;
} 