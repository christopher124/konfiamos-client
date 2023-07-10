import * as Yup from "yup";

export function initialValues(loanRequest) {
  return {
    customerId: loanRequest?.customer?._id || "",
    amountRequested: loanRequest?.amountRequested || "",
    period: loanRequest?.period || "",
    startDate: loanRequest?.startDate
      ? new Date(loanRequest.startDate).toISOString().split("T")[0]
      : "", // Convertir la fecha al formato adecuado
    interestRate: loanRequest?.interestRate || "",
  };
}

export function validationSchema() {
  return Yup.object({
    customerId: Yup.string().required(true),
    amountRequested: Yup.string().required(true),
    period: Yup.string().required(true),
    startDate: Yup.string().required(true),
    interestRate: Yup.string().required(true),
  });
}
