import { User } from "screens/project-list/search-panel";
import { useAsync } from "utils/use-async";
import { useHttp } from "utils/http";
import { useEffect } from "react";
import { cleanObject } from "utils";

export const useUsers = (param?:Partial<User >)=>{
    const {run,...result} = useAsync<User[]>()
    const client = useHttp()

    useEffect(() => {
        run(client('users',{data:cleanObject(param||{})}))
        // eslint-disable-next-line
    }, [param])
    return result;
}