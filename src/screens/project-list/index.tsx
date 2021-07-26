import { List } from "./list";
import { SearchPanel } from "screens/project-list/search-panel";
import { useDebounce, useDocumentTitle } from "utils/index";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useProjectsSearchParams } from "./utils";

// const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);

  // const [keys] = useState<("name" | "personId")[]>(["name", "personId"]);
  const [param,setParam] = useProjectsSearchParams()
  const { isLoading, error, data: list,retry } = useProjects(useDebounce(param, 200));
  //页面加载完渲染
  const { data: users } = useUsers();
  // useUrlQueryParam(keys);
  // react-helmet插件可以解决title动态变换的问题
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List refresh={retry} loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  );
};
ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;
