import { Drawer } from "antd";
import React from "react";

export const ProjectModal = (props:{projectModalOpen:boolean,onClose:() => void}) => {
    return <Drawer onClose={props.onClose}  width = {'100%'} visible={props.projectModalOpen}> 
    <h1>project modal</h1>
    </Drawer>
}