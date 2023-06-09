import { useState, useEffect, createContext } from "react";
import { User, Auth } from "../api";
import { hasExpiredToken } from "../utils";

const userController = new User();
const authController = new Auth();

export const AuthContext = createContext();

export function AuthProvider(props) {
  const { children } = props;
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        // Comprobar si el usuario está logeado o no
        const accessToken = authController.getAccessToken();
        const refreshToken = authController.getRefreshToken();

        if (!accessToken || !refreshToken) {
          logout();
          setLoading(false);
          return;
        }

        if (hasExpiredToken(accessToken)) {
          // Ha caducado
          if (hasExpiredToken(refreshToken)) {
            logout();
            // Aquí puedes cerrar la aplicación o redirigir a la página de inicio de sesión
            return;
          } else {
            await reLogin(refreshToken);
          }
        } else {
          await login(accessToken);
        }

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, []);

  const reLogin = async (refreshToken) => {
    try {
      const { accessToken } = await authController.refreshAccessToken(
        refreshToken
      );

      if (!accessToken) {
        logout(); // Cerrar sesión si no se pudo obtener un nuevo token válido
        return;
      }

      authController.setAccessToken(accessToken);
      await login(accessToken);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    authController.removeTokens();
  };

  const login = async (accessToken) => {
    try {
      const response = await userController.getMe(accessToken);
      delete response.password;
      setUser(response);
      setToken(accessToken);
    } catch (error) {
      console.error(error);
    }
  };

  const data = {
    accessToken: token,
    user,
    login,
    logout,
  };

  if (loading) return null;

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
