import { Button, Drawer } from "antd";
import React from "react";
import { useProjectModal } from "./utils";

export const ProjectModal = () => {
const {projectModalOpen,close} = useProjectModal()
    return <Drawer onClose={close}  width = {'100%'} visible={projectModalOpen}> 
    <Button onClick={close}> 关闭</Button>
    <h1>project modal</h1>
    </Drawer>
}