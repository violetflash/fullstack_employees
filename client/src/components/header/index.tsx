// @flow
import { LoginOutlined, TeamOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import * as React from 'react';
import { Layout, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { PATHS } from '../../routes';
import { AppButton } from '../Button';
type Props = {

};

const headerStyle: React.CSSProperties = {
  // textAlign: 'center',
  color: 'inherit',
  // height: 64,
  paddingInline: 0,
  lineHeight: '64px',
  backgroundColor: 'inherit',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px 0',
  marginBottom: '20px',

};

const iconStyle: React.CSSProperties = {
  fontSize: '32px'
};

export const Header = (props: Props) => {
  return (
    <Layout.Header style={headerStyle}>
      <Space direction="horizontal" align="center">
        <TeamOutlined style={iconStyle}/>
        <Link to={ PATHS.root }>
          <AppButton type="ghost">
            <Typography.Title level={1} style={{ margin: 0, color: 'white' }}>
              Сотрудники
            </Typography.Title>
          </AppButton>
        </Link>
      </Space>
      <Space>
        <Link to={PATHS.register}>
          <AppButton type="ghost" icon={<UserAddOutlined />}>Зарегистрироваться</AppButton>
        </Link>
        <Link to={PATHS.login}>
          <AppButton type="ghost" icon={<LoginOutlined />}>Войти</AppButton>
        </Link>
      </Space>
    </Layout.Header>
  );
};