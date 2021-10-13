import styled from "@emotion/styled";
import {  Divider, List, Popover, Typography } from "antd";
import React from "react";
import { useProjectModal } from "screens/project-list/utils";
import { useProjects } from "utils/project";
import { ButtonNoPadding } from "./lib";

export const ProjectPopover = () => {
  const {open} = useProjectModal()
  const { data: projects } = useProjects();
  const pinnedProject = projects?.filter((project) => project.pin);
  const content = <ContentContainer>
      <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
      <List>
        {pinnedProject?.map((project,index) => (
          <List.Item key={index}>
            <List.Item.Meta  title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider/>
      <ButtonNoPadding 
            onClick={open} type={'link'}
          >
            创建项目
          </ButtonNoPadding>
    </ContentContainer>
  ;
  return (
    <Popover placement={"bottom"} content={content}>
      <span>项目</span>
    </Popover>
  );
  
};

const ContentContainer = styled.div`
        min-width:30rem;
`