import { ENV } from "../utils";

export class LoanRequest {
  baseApi = ENV.BASE_API;

  async getLoanRequests(accessToken) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.LOANREQUESTS}`;
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

  async createLoanRequest(accessToken, data) {
    const url = `${this.baseApi}/${ENV.API_ROUTES.LOANREQUEST}`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, params);
    const result = await response.json();

    if (response.status !== 201) throw result;

    return result;
  }
  catch(error) {
    throw error;
  }

  async updateLoanRequest(accessToken, idLoanRequest, loanRequestData) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.LOANREQUEST}/${idLoanRequest}`;
      const params = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(loanRequestData),
      };
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async deleteLoanRequest(accessToken, idLoanRequest) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.LOANREQUEST}/${idLoanRequest}`;
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

  async restoreLoanRequest(accessToken, idLoanRequest) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.LOANREQUEST}/${idLoanRequest}/restore`;
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

  async updatePaymentStatus(accessToken, idPayment, paymentData) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.LOANPAYMENT}/${idPayment}`;
      const params = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Agregar encabezado de tipo de contenido
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(paymentData), // Agregar el campo 'paid' en el cuerpo de la solicitud
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getLoanPayments(accessToken, idLoanRequest) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.LOANPAYMENTS}/${idLoanRequest}`;
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
