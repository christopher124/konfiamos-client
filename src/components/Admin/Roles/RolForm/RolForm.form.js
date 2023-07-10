import * as Yup from "yup";

export function initialValues(role) {
  return {
    name: role?.name || "",
    displayName: role?.displayName || "",
    description: role?.description || "",
  };
}

export function validationSchema() {
  return Yup.object({
    name: Yup.string().required(true),
    displayName: Yup.string().required(true),
    description: Yup.string().required(true),
  });
}
