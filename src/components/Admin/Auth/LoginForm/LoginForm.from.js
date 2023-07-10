import * as Yup from "yup";

//datos de iniciales de nuestro formulario
export function initialValues() {
  return {
    email: "",
    password: "",
  };
}

//datos de para validar los datos del formialrio
export function validationSchema() {
  return Yup.object({
    email: Yup.string()
      .email("El correo no es valido")
      .required("Campo obligatorio"),
    password: Yup.string().required("Campo obligatorio"),
  });
}
