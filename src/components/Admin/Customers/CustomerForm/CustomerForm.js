import { useCallback } from "react";
import { Form, Image } from "semantic-ui-react";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import { initialValues, validationSchema } from "./CustomerForm.form";
import { Customer } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { toast } from "react-toastify";
import { ENV } from "../../../../utils";
import "./CustomerForm.scss";

const CustomerController = new Customer();

export function CustomerForm(props) {
  const { close, onReload, customer } = props;
  const { accessToken } = useAuth();
  const formik = useFormik({
    initialValues: initialValues(customer),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (!customer) {
          await CustomerController.createCustomer(accessToken, formValue);
          toast.success("Cliente creado correctamente.");
        } else {
          await CustomerController.updateCustomer(
            accessToken,
            customer._id,
            formValue
          );
          toast.success("Cliente actualizado correctamente.");
        }
        onReload();
        close();
      } catch (error) {
        toast.error(error.msg);
      }
    },
  });
  const onDropAccountStatus = useCallback((acceptedFiles) => {
    // Obtiene el primer archivo cargado
    const file = acceptedFiles[0];

    // Verifica el tipo de archivo (opcional)
    if (file.type === "application/pdf") {
      // Actualiza el campo de formulario relacionado con el estado de la cuenta
      formik.setFieldValue("accountStatus", URL.createObjectURL(file));
      // Actualiza el campo de formulario relacionado con el archivo de estado de cuenta
      formik.setFieldValue("fileAccountStatus", file);
    } else {
      // Muestra un mensaje de error si el archivo no es un PDF
      toast.error("Solo se permiten archivos PDF.");
    }
  }, []);

  const onDropIdentification = useCallback((acceptedFiles) => {
    // Obtiene el primer archivo cargado
    const file = acceptedFiles[0];

    // Verifica el tipo de archivo (opcional)
    if (file.type === "application/pdf") {
      // Actualiza el campo de formulario relacionado con la identificación
      formik.setFieldValue("identification", URL.createObjectURL(file));
      // Actualiza el campo de formulario relacionado con el archivo de identificación
      formik.setFieldValue("fileIdentification", file);
    } else {
      // Muestra un mensaje de error si el archivo no es un PDF
      toast.error("Solo se permiten archivos PDF.");
    }
  }, []);

  const {
    getRootProps: getRootPropsAccountStatus,
    getInputProps: getInputPropsAccountStatus,
  } = useDropzone({
    accept: "application/pdf",
    onDrop: onDropAccountStatus,
  });

  const {
    getRootProps: getRootPropsIdentification,
    getInputProps: getInputPropsIdentification,
  } = useDropzone({
    accept: "application/pdf",
    onDrop: onDropIdentification,
  });

  return (
    <Form className="user-form" onSubmit={formik.handleSubmit}>
      <div className="form-divider">Datos de contacto</div>

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
        <Form.Dropdown
          label="Genero"
          placeholder="Seleccione un genero"
          selection
          options={genderOptions}
          onChange={(_, data) => formik.setFieldValue("gender", data.value)}
          value={formik.values.gender}
          error={formik.errors.gender}
        />
      </Form.Group>
      <Form.Group widths={"equal"}>
        <Form.Input
          name="email"
          label="Correo"
          placeholder="Correo electronico"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
        />
        <Form.Input
          name="phone"
          label="Telefono"
          placeholder="Telefono de casa"
          onChange={formik.handleChange}
          value={formik.values.phone}
          error={formik.errors.phone}
        />
        <Form.Input
          name="cellnumber"
          label="Telefono celular"
          placeholder="Telefono celular"
          onChange={formik.handleChange}
          value={formik.values.cellnumber}
          error={formik.errors.cellnumber}
        />
      </Form.Group>
      <div className="form-divider">Direccion</div>

      <Form.Group widths={"equal"}>
        <Form.Input
          name="street"
          label="Calle"
          placeholder="Nombre de la calle"
          onChange={formik.handleChange}
          value={formik.values.street}
          error={formik.errors.street}
        />
        <Form.Input
          name="number_ext_address"
          label="Numero exterior"
          placeholder="Numero exterior de la calle"
          onChange={formik.handleChange}
          value={formik.values.number_ext_address}
          error={formik.errors.number_ext_address}
        />
        <Form.Input
          name="number_int_address"
          label="Numero de calle"
          placeholder="Numero de la calle"
          onChange={formik.handleChange}
          value={formik.values.number_int_address}
          error={formik.errors.number_int_address}
        />
        <Form.Input
          name="neighborhood"
          label="Colonia"
          placeholder="Colonia"
          onChange={formik.handleChange}
          value={formik.values.neighborhood}
          error={formik.errors.neighborhood}
        />
      </Form.Group>
      <Form.Group widths={"equal"}>
        <Form.Input
          name="zip"
          label="Codigo postal"
          placeholder="Codigo postal"
          onChange={formik.handleChange}
          value={formik.values.zip}
          error={formik.errors.zip}
        />
        <Form.Input
          name="state"
          label="Estado"
          placeholder="Estado"
          onChange={formik.handleChange}
          value={formik.values.state}
          error={formik.errors.state}
        />
        <Form.Input
          name="municipality"
          label="Municipio"
          placeholder="Municipio"
          onChange={formik.handleChange}
          value={formik.values.municipality}
          error={formik.errors.municipality}
        />
        <Form.Input
          name="city"
          label="Ciudad"
          placeholder="Ciudad"
          onChange={formik.handleChange}
          value={formik.values.city}
          error={formik.errors.city}
        />
      </Form.Group>
      <div className="form-divider">Ocupacion del cliente</div>

      <Form.Group widths={"equal"}>
        <Form.Input
          name="ocupation"
          label="Ocupacion"
          placeholder="Ocupacion del cliente"
          onChange={formik.handleChange}
          value={formik.values.ocupation}
          error={formik.errors.ocupation}
        />
        <Form.Input
          name="clave_int"
          label="Clave interbancaria"
          placeholder="Clave interbancaria"
          onChange={formik.handleChange}
          value={formik.values.clave_int}
          error={formik.errors.clave_int}
        />
        <Form.Input
          name="banco"
          label="Nombre de banco"
          placeholder="Nombre de banco"
          onChange={formik.handleChange}
          value={formik.values.banco}
          error={formik.errors.banco}
        />
      </Form.Group>
      <div className="form-divider">Documentos </div>

      <div className="dropzone-wrapper">
        <div className="dropzone-container" {...getRootPropsAccountStatus()}>
          <div className="dropzone-title">Cargar Estado de Cuenta</div>
          <div className="dropzone-content">
            {formik.values.fileAccountStatus ? (
              <>
                <Image rounded size="small" />
                <span className="file-name">
                  {formik.values.fileAccountStatus.name}
                </span>
              </>
            ) : (
              <span className="file-placeholder">
                Arrastra y suelta el archivo aquí
              </span>
            )}
          </div>
          <input {...getInputPropsAccountStatus()} />
        </div>

        <div className="dropzone-container" {...getRootPropsIdentification()}>
          <div className="dropzone-title">Cargar Identificación</div>
          <div className="dropzone-content">
            {formik.values.fileIdentification ? (
              <>
                <Image rounded size="small" />
                <span className="file-name">
                  {formik.values.fileIdentification.name}
                </span>
              </>
            ) : (
              <span className="file-placeholder">
                Arrastra y suelta el archivo aquí
              </span>
            )}
          </div>
          <input {...getInputPropsIdentification()} />
        </div>
      </div>

      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        {customer ? "Actualizar cliente" : "Crear cliente"}
      </Form.Button>
    </Form>
  );
}
const genderOptions = [
  {
    key: "Hombre",
    text: "Hombre",
    value: "Hombre",
  },
  {
    key: "Mujer",
    text: "Mujer",
    value: "Mujer",
  },
];
