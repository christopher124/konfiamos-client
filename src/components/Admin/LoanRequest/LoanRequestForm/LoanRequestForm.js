import { useState, useEffect } from "react";
import { Form, Icon } from "semantic-ui-react";
import { useFormik } from "formik";
import { Customer, LoanRequest } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { toast } from "react-toastify";
import { initialValues, validationSchema } from "./LoanRequestForm.form";

const CustomerController = new Customer();
const LoanRequestController = new LoanRequest();

export function LoanRequestForm(props) {
  const [customerOptions, setCustomerOptions] = useState([]);
  const { close, onReload, loanRequest } = props;
  const { accessToken } = useAuth();
  const formik = useFormik({
    initialValues: initialValues(loanRequest),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      console.log(formValue);
      try {
        formValue.amountRequested = parseFloat(formValue.amountRequested);
        formValue.period = parseFloat(formValue.period);
        formValue.interestRate = parseFloat(formValue.interestRate);

        if (!loanRequest) {
          await LoanRequestController.createLoanRequest(accessToken, formValue);
          toast.success("Préstamo creado correctamente.");
        } else {
          await LoanRequestController.updateLoanRequest(
            accessToken,
            loanRequest._id,
            formValue
          );
          toast.success("Préstamo actualizado correctamente.");
        }
        onReload();
        close();
      } catch (error) {
        toast.error(error.msg);
      }
    },
  });

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const customers = await CustomerController.getCustomersP(accessToken);

        setCustomerOptions(customers);
      } catch (error) {
        toast.error(error.msg);
      }
    };

    fetchCustomer();
  }, []);

  const today = new Date().toISOString().split("T")[0];

  return (
    <Form className="user-form" onSubmit={formik.handleSubmit}>
      <Form.Group widths={"equal"}>
        <Form.Dropdown
          label="Clientes"
          placeholder="Selecciona un cliente"
          selection
          options={customerOptions.map((customer) => ({
            key: customer._id,
            text: `${customer.firstname} ${customer.lastname} (${customer.email})`, // Agregar el número de identificación
            value: customer._id,
          }))}
          onChange={(_, data) => formik.setFieldValue("customerId", data.value)}
          value={formik.values.customerId}
          error={formik.errors.customerId}
        />
        <Form.Input
          name="amountRequested"
          label="Monto solicitado"
          placeholder="Monto solicitado"
          onChange={formik.handleChange}
          value={formik.values.amountRequested}
          error={formik.errors.amountRequested}
        />
      </Form.Group>
      <Form.Group widths={"equal"}>
        <Form.Input
          name="period"
          label="Periodo de pago"
          placeholder="Periodos de pago"
          onChange={formik.handleChange}
          value={formik.values.period}
          error={formik.errors.period}
        />
        <Form.Input
          type="date"
          name="startDate"
          label="Fecha de inicio del préstamo"
          placeholder="Fecha de inicio del préstamo"
          min={today}
          onChange={formik.handleChange}
          value={formik.values.startDate || ""}
          error={formik.errors.startDate}
        />
        <Form.Input
          name="interestRate"
          label="Interés del préstamo"
          placeholder="Interés del préstamo"
          onChange={formik.handleChange}
          value={formik.values.interestRate}
          error={formik.errors.interestRate}
        />
      </Form.Group>

      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        {loanRequest ? "Actualizar préstamo" : "Crear préstamo"}
      </Form.Button>
    </Form>
  );
}
