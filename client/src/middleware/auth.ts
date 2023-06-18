import { createListenerMiddleware } from '@reduxjs/toolkit';
import { authApi } from '../app/services/auth';

export const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  matcher: authApi.endpoints.login.matchFulfilled,
  effect: async (action, api) => {
    const token = action.payload.token;
    if (token) {
      localStorage.setItem(LS_USER_TOKEN, token);
    }
  }
})