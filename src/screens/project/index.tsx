import React from "react";
import { Link} from "react-router-dom";
import { Routes,Route } from "react-router";
import { EpicScreen } from "screens/epic";
import { KanbanScreen } from "screens/kanban";
export const ProjectScreen = () => {
  return (
    <div>
      <h1>我是简单的screen组件</h1>
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务组</Link>
      <Routes>
          <Route path={'/kanban'} element={<KanbanScreen/>}></Route>
          <Route path={'/epic'} element={<EpicScreen/>}></Route>
          <Route index element={<KanbanScreen />} />
      </Routes>
          {/* <Navigate to={window.location.pathname+'/kanban'}></Navigate> */}
    </div>
  );
};
