
import { Dropdown, Menu, Table ,TableProps} from "antd";
import dayjs from "dayjs";
import React from "react";
import { User } from "./search-panel";
import { Link } from "react-router-dom";
import { Pin } from "components/pin";
import { useEditProjects } from "utils/project";
import { ButtonNoPadding } from "components/lib";
import { useDispatch } from "react-redux";
import { projectListActions } from "./project-list-slice";

export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created:number;
}

interface ListProps extends TableProps<Project> {
  users: User[];
  refresh?:()=>void;
  // projectButton:JSX.Element
}

export const List = ({ users,...props }: ListProps) => {
  const {mutate}= useEditProjects();
const dispatch = useDispatch()
  const pinProject = (id:number)=> (pin:boolean)=>mutate({id,pin}).then( props.refresh)
  return (
    <Table  
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true}/>,
          render(value,project){
            return <Pin  checked={project.pin} onCheckedChenge={pinProject(project.id)}></Pin>
          }
        },
        {
          title: "名称",
          render(value,project){
            return (<Link to={String(project.id)}>{project.name}</Link>)
          },
          sorter:(a,b)=>a.name.localeCompare(b.name),
         
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title:"创建时间",
          render(value,project){
            return <span>
                {project.created ? dayjs(project.created).format("YYYY-MM-DD"):"无"}
            </span>
          }
        },
        {
          title:"操作",
          render(value,project){
            return <Dropdown overlay={
              <Menu>
                <Menu.Item key={'edit'}>
                 <ButtonNoPadding   type={'link'} onClick={()=> dispatch(projectListActions.openProjectModal())}>编辑</ButtonNoPadding>
                </Menu.Item>
              </Menu>
            }>
              <ButtonNoPadding type={'link'}>···</ButtonNoPadding>
            </Dropdown>
          }
        }
      ]}
      {...props}
    />
  );
};
