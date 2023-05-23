import { useState } from "react";
import { Tab, Button } from "semantic-ui-react";
import { BasicModal } from "../../../components/Shared";
import "./Users.scss";

export function Users() {
  const [showModal, setShowModal] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);

  const panes = [
    {
      menuItem: "Usuarios Activos",
      render: () => (
        <Tab.Pane attached={false}>
          <h2>Usuarios activos</h2>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Usuarios Inactivos",
      render: () => (
        <Tab.Pane attached={false}>
          <h2>Usuarios Inactivos</h2>
        </Tab.Pane>
      ),
    },
  ];
  return (
    <>
      <div className="users-page">
        <Button className="users-page__add" primary onClick={onOpenCloseModal}>
          Nuevo Usuario
        </Button>
        {/* <button
          onClick={() => navigate("/admin/nuevo/user")}
          type="button"
          className="flex flex-row items-center justify-center px-4 py-3 text-xs font-bold text-white uppercase bg-blue-500 rounded-lg hover:bg-blue-600 space-x-1"
        >
          <span className="p-1">Nuevo Registro</span>
        </button> */}
        <Tab menu={{ secondary: true }} panes={panes} />
      </div>
      <BasicModal
        show={showModal}
        close={onOpenCloseModal}
        title="Crear nuevo usuario"
      >
        <h2>Formulario para crear usuarios</h2>
      </BasicModal>
    </>
  );
}
