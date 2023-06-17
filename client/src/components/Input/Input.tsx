// @flow
import { Form, Input, InputProps } from 'antd';
import { NamePath, Rule } from 'rc-field-form/lib/interface';
import { memo } from 'react';
import * as React from 'react';

type Props = InputProps & {
  dependencies?: NamePath[];
  isConfirmPassword?: boolean;
  // isPassword?: boolean;
};
const InputField = memo(({
  // isPassword = false,
  isConfirmPassword = false,
  dependencies,
  ...props
}: Props) => {

  const isPassword = props.type === 'password';
  const isEmail = props.type === 'email';

  const fieldRules: Rule[] = [{
    required: true,
    message: 'Обязательное поле'
  }];

  if (isConfirmPassword) {
    fieldRules.push((form) => ({
      validator(_, value) {
        const passwordValue = form.getFieldValue('password');
        if (!value || (passwordValue && passwordValue === value)) {
          return Promise.resolve()
        }
        return Promise.reject(new Error('Пароли не совпадают'))
      }
    }))
  }

  if (isPassword) {
    fieldRules.push((form) => ({
      validator(_, value) {
        if (value.length < 6) {
          return Promise.reject(new Error('Пароль должен содержать минимум 6 символов'))
        }
        return Promise.resolve()
      }
    }))
  }

  if (isEmail) {
    fieldRules.push((form) => ({
      validator(_, value) {
        if (value && !value.includes('@')) {
          return Promise.reject(new Error('Некорректный адрес эл. почты'))
        }
        return Promise.resolve()
      }
    }))
  }

  return (
    <Form.Item
      name={props.name}
      shouldUpdate={true}
      rules={fieldRules}
      dependencies={dependencies}
      hasFeedback={isConfirmPassword}
    >
      {isPassword ? (
        <Input.Password
          {...props}
          size={props.size ?? 'large'}
          allowClear
        />
      ) : (
        <Input
          {...props}
          size={props.size ?? 'large'}
        />
      )}
    </Form.Item>
  );
});

export default memo(InputField);