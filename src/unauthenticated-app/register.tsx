import React from "react";
import { useAuth } from "context/auth-context";
import {  Form, Input } from "antd";
import { LogButton } from "unauthenticated-app";
export const RegisterScreen = () => {
  const { register   } = useAuth();

  const handleSubmit = (values: {username:string,password:string}) => {
    register(values)
  };
  return (
    <Form onFinish={handleSubmit} >
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item 
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <LogButton htmlType={"submit" } type="primary">注册</LogButton>
      </Form.Item>
    </Form>
  );
};
