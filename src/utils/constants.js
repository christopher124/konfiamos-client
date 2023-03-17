const SERVER_IP_DEV = "localhost:3977";

export const ENV = {
  BASE_PATH: `http://${SERVER_IP_DEV}`,
  BASE_API: `http://${SERVER_IP_DEV}/api/v1`,
  API_ROUTES: {
    REGISTER: "auth/register",
  },
};
