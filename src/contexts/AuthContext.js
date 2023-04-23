import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext();

export function AuthProvider(props) {
  const { children } = props;
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Comprobar si el usuario esta logeado o no
  }, []);

  const login = (accessToken) => {
    console.log("login Context");
    console.log(accessToken);
  };
  const data = {
    accessToken: token,
    user,
    login,
  };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
