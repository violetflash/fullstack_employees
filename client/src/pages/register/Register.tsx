// @flow
import { Card, Form, Row, Space, Typography } from 'antd';
import { memo } from 'react';
import * as React from 'react';
import { Link } from 'react-router-dom';
import AppButton from '../../components/Button/Button';
import InputField from '../../components/Input/Input';
import AppLayout from '../../components/layout/Layout';
import { PATHS } from '../../routes';
import { formStyle } from '../login/Login';

type Props = {

};
const Register = (props: Props) => {
  return (
    <AppLayout>
      <Row align="middle" justify="center">
        <Card title="Регистрация1" style={{ width: "30rem" }}>
          <Form onFinish={() => {}} style={formStyle}>
            <InputField placeholder="Имя" name="firstname" />
            <InputField placeholder="Фамилия" name="lastname" />
            <InputField placeholder="Эл. почта" name="email" type="email" />
            <InputField placeholder="Пароль" name="password" type="password" />
            <InputField
              placeholder="Подтверждение пароля"
              name="confirm_password"
              type="password"
              isConfirmPassword
            />
            <Row justify="end">
              <AppButton htmlType="submit">Вход</AppButton>
            </Row>
          </Form>
          <Space direction="horizontal" size="large">
            <Typography.Text>
              Уже зарегистрированы?
            </Typography.Text>
            <Link to={PATHS.login}>
              Войти
            </Link>
          </Space>
        </Card>
      </Row>
    </AppLayout>
  );
};

export default memo(Register);