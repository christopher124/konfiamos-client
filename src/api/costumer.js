import { ENV } from "../utils";

export class Customer {
  baseApi = ENV.BASE_API;

  async createCustomer(accessToken, data) {
    try {
      // para controlar imagenes
      const formData = new FormData();
      //para obtener los valores de los datos
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (data.fileAccountStatus) {
        formData.append("accountStatus", data.fileAccountStatus);
      }
      if (data.fileIdentification) {
        formData.append("identification", data.fileIdentification);
      }

      const url = `${this.baseApi}/${ENV.API_ROUTES.CUSTOMER}`;
      const params = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 201) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getCustomersCount(accessToken) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.CUSTOMERS}/count`;
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

  async updateCustomer(accessToken, idCustomer, costomerData) {
    try {
      const data = costomerData;
      // para controlar imagenes
      const formData = new FormData();
      //para obtener los valores de los datos
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (data.fileAccountStatus) {
        formData.append("accountStatus", data.fileAccountStatus);
      }
      if (data.fileIdentification) {
        formData.append("identification", data.fileIdentification);
      }
      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.CUSTOMER}/${idCustomer}`;
      const params = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getCustomers(accessToken, status = undefined) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.CUSTOMERS}?status=${status}`;
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
  async getCustomersP(accessToken) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.CUSTOMERS}`;
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

  async getCustomer(accessToken, idCustomer) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.CUSTOMER}/${idCustomer}`;
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

  async deleteCustomer(accessToken, idCustomer) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.CUSTOMER}/${idCustomer}`;
      const params = {
        method: "DELETE",
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

  async restoreCustomer(accessToken, idCustomer) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.CUSTOMER}/${idCustomer}/restore`;
      const params = {
        method: "PUT",
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
