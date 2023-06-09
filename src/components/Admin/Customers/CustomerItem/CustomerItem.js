import { useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { BasicModal } from "../../../Shared";
import { CustomerForm } from "../CustomerForm";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Customer } from "../../../../api";
import { useAuth } from "../../../../hooks";

const customerController = new Customer();

export function CustomerItem(props) {
  const { customer, onReload } = props;
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const openUpdateCustomer = () => {
    setTitleModal(`Actulizar ${customer.firstname} ${customer.lastname}`);
    onOpenCloseModal();
  };

  const onDelete = () => {
    Swal.fire({
      title: "Eliminar cliente",
      text: `¿Estás seguro de que deseas eliminar el cliente ${customer.firstname} ${customer.lastname}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await onDeleteConfirm();
      }
    });
  };

  const onDeleteConfirm = async () => {
    try {
      await customerController.deleteCustomer(accessToken, customer._id);
      toast.success("Cliente eliminado correctamente");
      onReload();

      const result = await Swal.fire({
        title: "Cliente eliminado",
        text: "¿Deseas recuperar el cliente eliminado?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, recuperar",
        cancelButtonText: "No",
      });

      if (result.isConfirmed) {
        try {
          await customerController.restoreCustomer(accessToken, customer._id);
          toast.success("Cliente recuperado correctamente");
          onReload();
        } catch (error) {
          toast.error(error.msg);
        }
      }
    } catch (error) {
      toast.error(error.msg);
    }
  };

  return (
    <>
      <tr className="border-b bg-cyan-800 border-white">
        <td
          scope="row"
          className="justify-center flex p-9 px-6 py-4 text-center"
        >
          <span className="text-white px-6 py-4 font-medium text-center">
            {customer.firstname && customer.lastname
              ? `${customer.firstname} ${customer.lastname}`
              : "No hay datos"}
          </span>
        </td>
        <td className="border border-slate-50 px-6 py-4 font-medium text-white whitespace-nowrap">
          {customer.email || "No hay datos"}
        </td>
        <td className="border border-slate-50 px-6 py-4 font-medium text-white whitespace-nowrap">
          {customer.phone || "No hay datos"}
        </td>
        <td className="border border-slate-50 px-6 py-4 font-medium text-white whitespace-nowrap">
          {customer.cellnumber || "No hay datos"}
        </td>
        <td className="border border-slate-50 px-6 py-4 font-medium text-white whitespace-nowrap">
          {customer.ocupation || "No hay datos"}
        </td>
        <td className="border border-slate-50 py-3 px-6 text-center">
          <Button
            icon
            primary
            onClick={() => navigate(`/admin/customer/${customer._id}`)}
          >
            <Icon name="eye" />
          </Button>
          <Button icon primary onClick={openUpdateCustomer}>
            <Icon name="pencil" />
          </Button>
          <Button icon color="red" onClick={onDelete}>
            <Icon name="trash" />
          </Button>
        </td>
      </tr>
      <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
        <CustomerForm
          close={onOpenCloseModal}
          onReload={onReload}
          customer={customer}
        />
      </BasicModal>
    </>
  );
}
