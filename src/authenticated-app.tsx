import styled from "@emotion/styled";
import { Row } from "components/lib";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";
import {ReactComponent as SoftwareLogo} from "assets/software-logo.svg" 
import { Dropdown, Menu } from "antd";
import { Aspan } from "unauthenticated-app";
export const AnthenticatedApp = () => {
  const { logout ,user} = useAuth();
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <SoftwareLogo width={'18rem'} color={'rgba(38,132,255)'} />
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
        <Dropdown overlay={<Menu>
          <Menu.Item key={'logout'}>
            <span onClick={logout}>登出</span>
          </Menu.Item>
        </Menu>}>
            <Aspan  onClick={e=>e.preventDefault()}>
              Hi,{user?.name}
            </Aspan>
          </Dropdown>          
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};

const Header = styled(Row)`
padding: 3.2rem;
box-shadow: 0 0 5px rgba(0,0,0,0.1);
z-index: 1;
`;
const Main = styled.main`
`;

const HeaderLeft = styled(Row)`

`;
const HeaderRight = styled.div``;


const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`;
