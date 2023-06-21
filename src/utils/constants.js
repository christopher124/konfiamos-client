const SERVER_IP_DEV = "localhost:3977";

export const ENV = {
  BASE_PATH: `http://${SERVER_IP_DEV}`,
  BASE_API: `http://${SERVER_IP_DEV}/api/v1`,
  API_ROUTES: {
    REGISTER: "auth/register",
    LOGIN: "auth/login",
    REFRESH_ACCESS_TOKEN: "auth/refresh_access_token",
    USER_ME: "user/me",
    ROLE: "role",
    ROLES: "roles",
    USER: "user",
    USERS: "users",
    CUSTOMER: "customer",
    CUSTOMERS: "customers",
    LOANREQUEST: "loanrequest",
    LOANREQUESTS: "loanrequests",
    LOANPAYMENT: "loanpayment",
    LOANPAYMENTS: "loanpayments",
  },
  JWT: {
    ACCESS: "access",
    REFRESH: "refresh",
  },
};
