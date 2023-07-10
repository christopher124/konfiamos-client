import { useState, useEffect, useCallback } from "react";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { Role } from "../../../../api";
import { initialValues, validationSchema } from "./RolForm.form";
import { useAuth } from "../../../../hooks";
import { toast } from "react-toastify";

const RoleController = new Role();

export function RolForm(props) {
  const { close, onReload, role } = props;
  const { accessToken } = useAuth();
  const formik = useFormik({
    initialValues: initialValues(role),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (!role) {
          await RoleController.createRole(accessToken, formValue);
          toast.success("Rol creado correctamente.");
        } else {
          await RoleController.updateRole(accessToken, role._id, formValue);
          toast.success("Rol actilizado correctamente.");
        }
        onReload();
        close();
      } catch (error) {
        toast.error(error.msg);
      }
    },
  });

  return (
    <Form className="user-form" onSubmit={formik.handleSubmit}>
      <Form.Group widths={"equal"}>
        <Form.Input
          name="name"
          label="Nombre del rol"
          placeholder="Nombre del rol"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name}
          disabled={formik.values.name === "Admin"} // Deshabilitar si el valor es "admin"
        />
        <Form.Input
          name="displayName"
          label="Nombre a mostrar"
          placeholder="Nombre a mostrar"
          onChange={formik.handleChange}
          value={formik.values.displayName}
          error={formik.errors.displayName}
        />
      </Form.Group>
      <Form.Group widths={"equal"}>
        <Form.TextArea
          name="description"
          label="Descripción del rol"
          placeholder="Descripción del rol"
          onChange={formik.handleChange}
          value={formik.values.description}
          error={formik.errors.description}
        />
      </Form.Group>

      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        {role ? "Actualizar Rol" : "Crear Rol"}
      </Form.Button>
    </Form>
  );
}
