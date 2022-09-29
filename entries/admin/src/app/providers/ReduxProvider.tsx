import { configureStore } from '@reduxjs/toolkit';
import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';

import { roleApi } from 'admin/entities/role';
import { userApi } from 'admin/entities/user';

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [roleApi.reducerPath]: roleApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    userApi.middleware,
    roleApi.middleware,
  ],
});

interface IProps {
  children: ReactNode;
}

/**
 * Провайдер редакса.
 */
export const ReduxProvider: FC<IProps> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);
