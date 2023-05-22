import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { Auth } from "../../../../api";
import { toast } from "react-toastify";
import { useAuth } from "../../../../hooks";
import { initialValues, validationSchema } from "./LoginForm.from";

const authController = new Auth();

export function LoginForm() {
  const { login } = useAuth();
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const response = await authController.login(formValue);
        authController.setAccessToken(response.access);
        authController.setRefreshToken(response.refresh);
        login(response.access);
        toast.success("Bienvenido," + " " + response.user.username);
      } catch (error) {
        toast.error(error.msg);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Input
        name="email"
        placeholder="Correo electronico"
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.errors.email}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.errors.password}
      />
      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        Entrar
      </Form.Button>
    </Form>
  );
}
