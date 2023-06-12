// @flow
import { TeamOutlined } from '@ant-design/icons';
import * as React from 'react';
import { Button, Layout, Space, Typography } from 'antd';
type Props = {

};

const headerStyle: React.CSSProperties = {
  // textAlign: 'center',
  color: 'inherit',
  // height: 64,
  paddingInline: 0,
  lineHeight: '64px',
  backgroundColor: 'inherit',
};

const iconStyle: React.CSSProperties = {
  fontSize: '32px'
};

export const Header = (props: Props) => {
  return (
    <Layout.Header style={headerStyle}>
      <Space direction="horizontal" align="center">
        <TeamOutlined style={iconStyle}/>
        <Button type="link">Click</Button>
      </Space>
    </Layout.Header>
  );
};