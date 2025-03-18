'use client';

import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { api } from '../client/trpc';

type StateType = Awaited<ReturnType<typeof api.accountRouter.getInfo.query>>;

type AuthContextType = {
  setAuthData: (data: StateType) => void;
  authData: StateType;
};

export const initialState = (): {
  authData: StateType;
  setAuthData: (data: StateType) => void;
} => ({
  authData: {
    account: {
      email: '',
      id: '',
      organisationMember: [],
    },
    currentOrganisation: {
      id: '',
      code: '',
      name: '',
    },
  },
  setAuthData(data: StateType) {
    //
  },
});

const AuthContext = createContext<AuthContextType>(initialState());

export const AuthProvider: FC<{
  children: ReactNode;
  authData: StateType;
}> = ({ children, authData: _authData }) => {
  const [authData, _setAuthData] =
    useState<Awaited<ReturnType<typeof api.accountRouter.getInfo.query>>>(
      _authData
    );

  const setAuthData = (data: typeof authData) => _setAuthData(data);

  return (
    <AuthContext.Provider value={{ setAuthData, authData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthState = () => {
  const { authData, setAuthData } = useContext(AuthContext);
  return { authData, setAuthData };
};
