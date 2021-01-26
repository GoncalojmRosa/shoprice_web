import React, { createContext, useState } from 'react';
import api from '../services/api';
import { UserData, register } from '../services/auth';
import * as auth from '../services/auth';

interface AuthContextData {
  signed: boolean;
  user: UserData;
  signIn(params: { password: string; email: string }): Promise<UserData>;

  register(params: { password: string; email: string; name: string }): Promise<UserData>;
  signOut(): void;
  // emitMessage(text: string, type?: string, time?: number): void;
  setLocalUser(param: UserData): void;
}
export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FunctionComponent = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [flash, setFlash] = useState<{
    text: string;
    type: string;
    time: number | undefined;
  }>({ text: '', type: 'success', time: undefined });

  function setLocalUser(userData: UserData) {
    setUser(userData);
    localStorage.setItem('@shoprice:user', JSON.stringify(userData));
  }

  async function signIn(params: { email: string; password: string }) {
    await auth
      .authenticate(params)
      .then((response) => {
        const { token, /*refresh_token,*/ user } = response.data;
        setLocalToken(token /*, refresh_token*/);
        setLocalUser(user);
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
      })
      .catch(() => {
        signOut();
      });
  }

  function signOut() {
    // localStorage.removeItem('@shoprice:user')
    localStorage.removeItem('@shoprice:token');
    // localStorage.removeItem('@shoprice:refresh_token')
  }

  function setLocalToken(tokenData: string /*, refreshTokenData: string*/) {
    // setToken(tokenData)
    api.defaults.headers['Authorization'] = `Bearer ${tokenData}`;
    localStorage.setItem('@shoprice:token', JSON.stringify(tokenData));
    // localStorage.setItem(
    //   '@shoprice:refresh_token',
    //   JSON.stringify(refreshTokenData),
    // )
  }
  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        // @ts-ignore
        user,
        // @ts-ignore
        signIn,
        signOut,
        // @ts-ignore
        register,
        setLocalUser,
        // emitMessage,
      }}
    >
      {/* <FlashMessage text={flash.text} type={flash.type} time={flash.time} /> */}
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
