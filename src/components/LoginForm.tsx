import React, { FC, useState } from "react";
import { Form, Input, Checkbox, Button } from "antd";
import { rules } from "../utils/rules";
import { useDispatch } from "react-redux";
import { AuthActionCreators } from "../store/reducers/auth/action-creators";
import { useAppSelector } from "../hooks/useAppSelector";

const LoginForm: FC = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { isAuth, error, isLoading } = useAppSelector((state) => state.auth);
  console.log(isAuth, error, isLoading);

  const submit = () => {
    // console.log("submit");
    dispatch(AuthActionCreators.login(username, password));
  };

  return (
    <Form onFinish={submit}>
      {error && <h4 className="colorRed mb-4"> {error} </h4>}

      <Form.Item
        label="Имя пользователя"
        name="username"
        // rules={[{ required: true, message: "Пожалуйста, введите ваше имя!" }]}
        rules={[rules.required("Пожалуйста, введите ваше имя!")]}
      >
        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        // rules={[{ required: true, message: "Пожалуйста, введите ваш пароль!" }]}
        rules={[rules.required("Пожалуйста, введите ваш пароль!")]}
      >
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 0, span: 16 }}>
        <Checkbox>Запомнить меня</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 0, span: 0 }}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
