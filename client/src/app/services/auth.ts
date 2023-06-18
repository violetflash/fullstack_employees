import { User } from '@prisma/client';
import { Token } from '../../types';
import { api } from './api';

export type RegisterPayload = Omit<User, 'id' | 'created_at' | 'is_admin'>;
export type LoginPayload = Pick<User, 'email' | 'password'>;
export type UserWithToken = User & Token;

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<UserWithToken, LoginPayload>({
      query: (userData) => ({
        url: '/user/login',
        method: 'POST',
        body: userData
      })
    }),
    register: build.mutation<UserWithToken, RegisterPayload>({
      query: (userData) => ({
        url: '/user/register',
        method: 'POST',
        body: userData
      })
    }),
    profile: build.query<UserWithToken, void>({
      query: () => ({
        url: '/user/profile',
        method: 'GET'
      })
    })
  })
});

export const { useLoginMutation, useProfileQuery, useRegisterMutation } = authApi;
export const { endpoints: { login, profile, register } }  = authApi;