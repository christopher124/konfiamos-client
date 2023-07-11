const SERVER_IP_DEV = "api.konfiamos.com";

export const ENV = {
  BASE_PATH: `https://${SERVER_IP_DEV}`,
  BASE_API: `https://${SERVER_IP_DEV}/api/v1`,
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
    TOTALINVESTMENT: "totalinvestment",
  },
  JWT: {
    ACCESS: "access",
    REFRESH: "refresh",
  },
};
