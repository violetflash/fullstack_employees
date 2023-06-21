// @flow
import { memo, ReactNode } from 'react';
import * as React from 'react';
import { useProfileQuery } from '../../app/services/auth';

type Props = {
  children: ReactNode;
};
export const AuthGuard = memo(({children}: Props) => {
  const { isLoading } = useProfileQuery();

  if (isLoading) {
    return <span>Загрузка</span>
  }
  return children;
});