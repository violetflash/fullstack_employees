// @flow
import { Button, Form } from 'antd';
import { ButtonHTMLType } from 'antd/es/button';
import { ButtonProps, BaseButtonProps } from 'antd/es/button/button';
import { FC, ReactNode } from 'react';

type Props = {
  htmlType?: ButtonHTMLType;
  viewProps: BaseButtonProps;
  buttonProps: ButtonProps;
};
export const AppButton: FC<Props> = ({
  htmlType,
  viewProps,
  buttonProps
}) => {
  return (
    <Form.Item>
      <Button
        {...viewProps}
        {...buttonProps}
        htmlType={htmlType}
      >
        {viewProps.children}
      </Button>
    </Form.Item>
  );
};