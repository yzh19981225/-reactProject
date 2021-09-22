import { Drawer } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { projectListActions, selectProjectModalOpen } from "./project-list-slice";

export const ProjectModal = () => {
    const dispatch = useDispatch()
    const projectModalOpen = useSelector(selectProjectModalOpen)
    return <Drawer onClose={()=>dispatch(projectListActions.closeProjectModal())}  width = {'100%'} visible={projectModalOpen}> 
    <h1>project modal</h1>
    </Drawer>
}