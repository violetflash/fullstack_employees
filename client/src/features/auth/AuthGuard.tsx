// @flow
import { ReactNode } from 'react';
import * as React from 'react';
import { useProfileQuery } from '../../app/services/auth';

type Props = {
  children: ReactNode;
};
export const AuthGuard = ({children}: Props) => {
  const obj = useProfileQuery();

  console.log('isLoading: >>', obj.isLoading);
  console.log('obj: >>', obj);

  if (obj.isLoading) {
    return <span>Загрузка</span>
  }
  return children;
};