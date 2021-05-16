import { useAuth } from "context/auth-context"
import { ProjectListScreen } from "screens/project-list"

export const AnthenticatedApp = () =>{
    const  {logout,user}=useAuth()
    return <div>
        <div>{user?.name}</div>
        <button onClick={()=>{logout()}}>登出</button>
        <ProjectListScreen/>
    </div>
}