import { ENV } from "../utils";

export class Role {
  baseApi = ENV.BASE_API;

  async getRoles(accessToken, deleted = undefined) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.ROLES}?delete=${deleted}`;
      const params = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
