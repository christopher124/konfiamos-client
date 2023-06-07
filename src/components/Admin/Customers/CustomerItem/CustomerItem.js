import { useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { BasicModal } from "../../../Shared";
import { CustomerForm } from "../CustomerForm";

export function CustomerItem(props) {
  const { customer, onReload } = props;
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const openUpdateCustomer = () => {
    setTitleModal(`Actulizar ${customer.firstname} ${customer.lastname}`);
    onOpenCloseModal();
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
          {/* <Button
          icon
          primary
          onClick={handleDownloadAccountStatus}
          disabled={!customer.accountStatus}
          data-tip="Descargar Estado de Cuenta"
        >
          <Icon name="download" />
        </Button>

        <Button
          icon
          primary
          onClick={handleDownloadIdentification}
          disabled={!customer.identification}
          data-tip="Descargar Identificación"
        >
          <Icon name="download" />
        </Button> */}

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
          <Button icon color="red">
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
