// @flow
import { Card, Form, Layout, Row, Space, Typography } from 'antd';
import { CSSProperties, memo } from 'react';
import * as React from 'react';
import { Link } from 'react-router-dom';
import AppButton from '../../components/Button/Button';
import InputField from '../../components/Input/Input';
import AppLayout from '../../components/layout/Layout';
import { PATHS } from '../../routes';

type Props = {

};

export const formStyle: CSSProperties = {
  display: "flex",
  flexDirection: 'column',
  gap: '10px'
}

const Login = (props: Props) => {
  return (
    <AppLayout>
      <Row align="middle" justify="center">
        <Card title="Войти" style={{ width: "30rem" }}>
          <Form onFinish={() => {}} style={formStyle}>
              <InputField placeholder="Эл. почта" name="email" type="email" />
              <InputField placeholder="Пароль" name="password" type="password" />
              <Row justify="end">
                <AppButton htmlType="submit">Вход</AppButton>
              </Row>
          </Form>
          <Space direction="horizontal" size="large">
            <Typography.Text>
              Нет аккаунта?
            </Typography.Text>
            <Link to={PATHS.register}>
                Зарегистрироваться
            </Link>
          </Space>
        </Card>
      </Row>
    </AppLayout>
  );
};

export default memo(Login);