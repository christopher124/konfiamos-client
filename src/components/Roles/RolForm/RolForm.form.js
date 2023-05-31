import * as Yup from "yup";

export function initialValues() {
  return {
    name: "",
    displayName: "",
    description: "",
  };
}

export function validationSchema() {
  return Yup.object({
    name: Yup.string().required(true),
    displayName: Yup.string().required(true),
    description: Yup.string().required(true),
  });
}
