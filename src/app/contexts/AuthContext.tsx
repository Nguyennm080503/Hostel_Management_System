import { ReactNode, createContext, useEffect, useState } from "react";
import { TokenData, UserInformation } from "../models/User_models";

interface Props {
  children: ReactNode;
}

interface AuthContextType {
  userInfo: UserInformation | undefined;
  token: TokenData | undefined;
  userLoading: boolean;
  login: (userData: UserInformation, token: TokenData) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  userInfo: undefined,
  token: undefined,
  userLoading: true,
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }: Props) => {
  const [userInfo, setUserInfo] = useState<UserInformation>();
  const [token, setToken] = useState<TokenData | undefined>();
  const [userLoading, setUserLoading] = useState<boolean>(true);

  useEffect(() => {
    getLocalData();
  }, []);

  const getLocalData = async () => {
    try {
      const storageToken = localStorage.getItem("token");
      const storageUser = localStorage.getItem("user");
      if (storageToken && storageUser) {
        const parseToken = JSON.parse(storageToken);
        const parseUser = JSON.parse(storageUser);
        setUserInfo(parseUser);
        setToken(parseToken);
      } else {
        logout();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUserLoading(false);
    }
  };

  // useEffect(() => {
  //   console.log("userInfo:", userInfo);
  // }, [userInfo]);

  const login = (userData: UserInformation, token: TokenData) => {
    const stringifyUser = JSON.stringify(userData);
    const stringifyToken = JSON.stringify(token);

    localStorage.setItem("user", stringifyUser);
    localStorage.setItem("token", stringifyToken);

    setUserInfo(userData);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUserInfo(undefined);
    setToken(undefined);
  };

  return (
    <AuthContext.Provider
      value={{ userInfo, token, userLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;