import { useState } from "react";
import { Tab } from "semantic-ui-react";
import { BasicModal } from "../../../components/Shared";
import {
  ListCustomers,
  CustomerForm,
} from "../../../components/Admin/Customers";

export function Customer() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onReload = () => setReload((prevState) => !prevState);
  const panes = [
    {
      menuItem: "Cliente con prestamo",
      render: () => (
        <Tab.Pane attached={false}>
          <ListCustomers customerStatus={true} reload={reload} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Clientes sin prestamo",
      render: () => (
        <Tab.Pane attached={false}>
          <ListCustomers customerStatus={false} reload={reload} />
        </Tab.Pane>
      ),
    },
  ];
  return (
    <>
      <div className="users-page">
        <button
          onClick={onOpenCloseModal}
          type="button"
          className=" users-page__add flex flex-row items-center justify-center px-4 py-3 text-xs font-bold text-white uppercase bg-blue-500 rounded-lg hover:bg-blue-600 space-x-1"
        >
          <span className="p-1">Nuevo Registro</span>
        </button>
        <Tab menu={{ secondary: true }} panes={panes} />
      </div>
      <BasicModal
        show={showModal}
        close={onOpenCloseModal}
        title="Crear nuevo Cliente"
      >
        <CustomerForm close={onOpenCloseModal} onReload={onReload} />
      </BasicModal>
    </>
  );
}
