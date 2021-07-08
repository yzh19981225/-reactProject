import { Button, Card, Divider, Typography } from "antd";
import React, { useState } from "react";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";
import styled from "@emotion/styled";
import logo from "assets/logo.svg";
import right from "assets/right.svg";
import left from "assets/left.svg";
export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<Error|null>(null) 
  return (
    <Container>
      <Background/>
        <Header />
      <ShadowCard>
        <Title>{isRegister ? '请注册' : '请登录'}</Title>
        {error ? <Typography.Text type={"danger"}>{error.message}</Typography.Text>:null}
        {isRegister ? <RegisterScreen onError={setError} /> : <LoginScreen onError={setError} />}
        <Divider />
        <Aspan onClick={() =>{ setIsRegister(!isRegister); setError(null) }}>
          {isRegister ? "已经有账号了?直接登陆 " : "没有账号？点击注册新账号"}
        </Aspan>
      </ShadowCard>
    </Container>
  );
};

export const Aspan = styled.span`
  color:rgb(65,105,225);
  cursor:pointer;
`

export const LogButton = styled(Button)`
  width: 100%;
`

const Title = styled.h2`
    margin-bottom:2.4rem;
    color: rgb(94,108,132);
`
 
const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;
const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;
const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom ,right bottom;
  background-size: calc(((100vw-40rem)/2)-3.2rem),calc(((100vw-40rem)/2)-3.2rem),cover;
  background-image: url(${left}),url(${right});
`