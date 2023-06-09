import { useState, useEffect, useCallback } from "react";
import { Form, Image } from "semantic-ui-react";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import { image } from "../../../../assets";
import { initialValues, validationSchema } from "./UserForm.form";
import "./UserForm.scss";
import { ENV } from "../../../../utils";
import { Role, User } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { toast } from "react-toastify";

const RoleController = new Role();
const UserController = new User();

export function UserForm(props) {
  const [roleOptions, setRoleOptions] = useState([]);
  const { close, onReload, user } = props;
  const { accessToken } = useAuth();
  const formik = useFormik({
    initialValues: initialValues(user),
    validationSchema: validationSchema(user),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (!user) {
          await UserController.createUser(accessToken, formValue);
          toast.success("Usuario creado correctamente.");
        } else {
          await UserController.updateUser(accessToken, user._id, formValue);
          toast.success("Usuario actilizado correctamente.");
        }
        onReload();
        close();
      } catch (error) {
        toast.error(error.msg);
      }
    },
  });

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file.type === "image/jpeg" || file.type === "image/png") {
      formik.setFieldValue("avatar", URL.createObjectURL(file));
      formik.setFieldValue("fileAvatar", file);
    } else {
      toast.error(
        "Archivo no permitido. Sube una imagen en formato JPEG o PNG."
      );
    }
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    onDrop,
  });

  const getAvatar = () => {
    if (formik.values.fileAvatar) {
      return formik.values.avatar;
    } else if (formik.values.avatar) {
      return `${ENV.BASE_PATH}/${formik.values.avatar}`;
    }
    return image.noAvatar;
  };

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const roles = await RoleController.getRoles(accessToken);
        setRoleOptions(roles);
      } catch (error) {}
    };

    fetchRoles();
  }, []);

  return (
    <Form className="user-form" onSubmit={formik.handleSubmit}>
      <div className="user-form__avatar" {...getRootProps()}>
        <input {...getInputProps()} />
        <Image avatar size="small" src={getAvatar()} />
      </div>

      <Form.Group widths={"equal"}>
        <Form.Input
          name="firstname"
          label="Nombres"
          placeholder="Nombres"
          onChange={formik.handleChange}
          value={formik.values.firstname}
          error={formik.errors.firstname}
        />
        <Form.Input
          name="lastname"
          label="Apellidos"
          placeholder="Apellidos"
          onChange={formik.handleChange}
          value={formik.values.lastname}
          error={formik.errors.lastname}
        />
      </Form.Group>
      <Form.Group widths={"equal"}>
        <Form.Input
          name="email"
          label="Correo"
          placeholder="Correo electrónico"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
        />
        <Form.Dropdown
          label="Rol"
          placeholder="Selecciona un rol"
          selection
          options={roleOptions.map((role) => ({
            key: role._id,
            text: role.name,
            value: role._id,
          }))}
          onChange={(_, data) => formik.setFieldValue("role", data.value)}
          value={formik.values.role}
          error={formik.errors.role}
        />
      </Form.Group>
      <Form.Input
        type="password"
        name="password"
        label="Contraseña"
        placeholder="Contraseña"
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.errors.password}
      />
      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        {user ? "Actualizar usuario" : "Crear usuario"}
      </Form.Button>
    </Form>
  );
}
