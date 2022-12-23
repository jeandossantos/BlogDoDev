import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../services/api';

type User = {
  id: string;
  username: string;
  email: string;
  token: string;
};

type LoginProps = {
  email: string;
  password: string;
};

type ChangeUserPassword = {
  userId: string;
  newPassword: string;
};

type UpdateUserProps = {
  userId: string;
  username: string;
};

type RegisterProps = LoginProps & {
  username: string;
  confirmPassword: string;
};

type AuthContextData = {
  user: User | null;
  loading: boolean;
  login: (props: LoginProps) => Promise<void>;
  logout: () => void;
  register: (props: RegisterProps) => void;
  updateUser: (props: UpdateUserProps) => Promise<void>;
  removeUser: (userId: string) => Promise<void>;
  changeUserPassword: (props: ChangeUserPassword) => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const data = localStorage.getItem('@blog:payload');

    if (data) {
      setUser(JSON.parse(data));
      const payload: User = JSON.parse(data);

      api.defaults.headers.common.authorization = `bearer ${payload?.token}`;

      setLoading(false);
    }
  }, []);

  async function login({ email, password }: LoginProps) {
    try {
      const response = await api.post<User>('/login', {
        email,
        password,
      });

      const user = response.data;

      localStorage.setItem('@blog:payload', JSON.stringify(user));

      api.defaults.headers.common.authorization = `Bearer ${user.token}`;

      setUser(user);
    } catch (error) {
      throw error;
    }
  }

  async function register({
    username,
    email,
    password,
    confirmPassword,
  }: RegisterProps) {
    try {
      const response = await api.post<User>('/register', {
        username,
        email,
        password,
        confirmPassword,
      });

      const user = response.data;

      localStorage.setItem('@blog:payload', JSON.stringify(user));

      api.defaults.headers.common.authorization = `Bearer ${user}`;

      setUser(user);
    } catch (error) {
      throw error;
    }
  }

  async function updateUser({ username, userId }: UpdateUserProps) {
    try {
      await api.put(`/users/${userId}`, {
        username,
      });

      setUser({ ...user!, username: username });

      localStorage.setItem(
        '@blog:payload',
        JSON.stringify({ ...user!, username: username })
      );
    } catch (error) {
      throw error;
    }
  }

  function logout() {
    localStorage.removeItem('@blog:payload');

    api.defaults.headers.common.authorization = null;

    setUser(null);
  }

  async function removeUser(userId: string) {
    try {
      await api.delete(`/users/${userId}`);
    } catch (error) {
      throw error;
    }
  }

  async function changeUserPassword({
    userId,
    newPassword,
  }: ChangeUserPassword) {
    try {
      await api.patch(`/users/${userId}/updatePassword`, {
        newPassword,
      });
    } catch (error) {
      throw error;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        loading,
        updateUser,
        removeUser,
        changeUserPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
