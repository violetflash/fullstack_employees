// @flow
import React, { FC, memo } from 'react';
import { Layout, Space } from 'antd';
import { Header } from '../header/Header';

type Props = {
  children: React.ReactNode
};

const layoutStyle: React.CSSProperties = {
  width: '80%',
  height: '100%',
  marginInline: 'auto',
  background: '#141414',
  color: 'wheat'
};

const contentStyle: React.CSSProperties = {
  // textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: 'inherit',
  background: 'inherit',
};
const AppLayout: FC<Props> = ({ children }) => {
  return (
      <Layout style={layoutStyle}>
        <Header/>
        <Layout.Content style={contentStyle}>
          {children}
        </Layout.Content>
      </Layout>
  );
};

export default memo(AppLayout);