// @flow
import { CSSProperties, FC } from 'react';
import { Button, Form } from 'antd';
import { ButtonHTMLType } from 'antd/es/button';
import { ButtonProps, BaseButtonProps } from 'antd/es/button/button';

const buttonStyles: CSSProperties = {
  color: 'inherit'
}

type Props = {
  htmlType?: ButtonHTMLType;
} & BaseButtonProps & ButtonProps;
export const AppButton: FC<Props> = ({
  htmlType,
  children,
  ...props
}) => {
  return (
    <Form.Item>
      <Button
        style={buttonStyles}
        {...props}
        htmlType={htmlType}
      >
        {children}
      </Button>
    </Form.Item>
  );
};