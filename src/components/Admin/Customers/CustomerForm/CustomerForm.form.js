import * as Yup from "yup";
export function initialValues(customer) {
  return {
    firstname: customer?.firstname || "",
    lastname: customer?.lastname || "",
    gender: customer?.gender || "",
    email: customer?.email || "",
    phone: customer?.phone || "",
    cellnumber: customer?.cellnumber || "",
    street: customer?.street || "",
    number_int_address: customer?.number_int_address || "",
    number_ext_address: customer?.number_ext_address || "",
    neighborhood: customer?.neighborhood || "",
    zip: customer?.zip || "",
    state: customer?.state || "",
    municipality: customer?.municipality || "",
    city: customer?.city || "",
    ocupation: customer?.ocupation || "",
    accountStatus: customer?.accountStatus || "",
    fileAccountStatus: null,
    identification: customer?.identification || "",
    fileIdentification: null,
    clave_int: customer?.clave_int || "",
    banco: customer?.banco || "",
  };
}

export function validationSchema() {
  return Yup.object({
    firstname: Yup.string().required(true),
    lastname: Yup.string().required(true),
    gender: Yup.string().required(true),
    email: Yup.string().email(true).required(true),
    phone: Yup.string().required(true),
    cellnumber: Yup.string().required(true),
    street: Yup.string().required(true),
    number_int_address: Yup.string().required(false),
    number_ext_address: Yup.string().required(true),
    neighborhood: Yup.string().required(true),
    zip: Yup.string().required(true),
    state: Yup.string().required(true),
    municipality: Yup.string().required(true),
    city: Yup.string().required(true),
    ocupation: Yup.string().required(true),
    clave_int: Yup.string().required(true),
    banco: Yup.string().required(true),
  });
}
