// @flow
import { Card, Form, Layout, Row, Space, Typography } from 'antd';
import { CSSProperties, memo, useState } from 'react';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation, UserWithToken } from '../../app/services/auth';
import AppButton from '../../components/Button/Button';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import InputField from '../../components/Input/Input';
import AppLayout from '../../components/layout/Layout';
import { PATHS } from '../../routes';
import { isErrorWithMessage } from '../../utils/is-error-with-message';

type Props = {

};

export const formStyle: CSSProperties = {
  display: "flex",
  flexDirection: 'column',
  gap: '10px'
}

const Login = (props: Props) => {
  const [loginUser, loginUserResult] = useLoginMutation();
  const [error, setError] = useState<string>();
  const navigate = useNavigate();

  const onLogin = async (data: UserWithToken) => {
    try {
      console.log('hit!')
      await loginUser({
        email: data.email,
        password: data.password
      }).unwrap()
      setError(undefined);
      navigate(PATHS.root);
    } catch (e) {
      if (isErrorWithMessage(e)) {
        setError(e.data.message);
        return;
      }
      setError('Неизвестная ошибка');
    }
  }

  return (
    <AppLayout>
      <Row align="middle" justify="center">
        <Card title="Войти" style={{ width: "30rem" }}>
          <Form onFinish={onLogin} style={formStyle}>
              <InputField placeholder="Эл. почта" name="email" type="email" />
              <InputField placeholder="Пароль" name="password" type="password" />
              <Row justify="end" >
                <AppButton htmlType="submit">Вход</AppButton>
              </Row>
          </Form>
          <Row justify="end">
            <Space direction="horizontal" size="small">
              <Typography.Text>
                Нет аккаунта?
              </Typography.Text>
              <Link to={PATHS.register}>
                Зарегистрироваться
              </Link>
            </Space>
          </Row>
          {error && (
            <Row style={{ marginTop: '15px' }} justify="start">
              <ErrorMessage message={error}/>
            </Row>
          )}
        </Card>
      </Row>
    </AppLayout>
  );
};

export default memo(Login);