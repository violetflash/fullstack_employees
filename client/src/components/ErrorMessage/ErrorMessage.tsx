// @flow
import { Alert } from 'antd';
import * as React from 'react';

type Props = {
  message?: string;
};
export const ErrorMessage = ({ message }: Props) => {
  if (!message) return null;
  return <Alert message={message} type="error" />;
};