import { useState } from "react";
import { Tab, Button } from "semantic-ui-react";
import { BasicModal } from "../../../components/Shared";
import { ListRoles, RolForm } from "../../../components/Admin/Roles";
import "./Role.scss";

export function Role() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState();

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);

  const panes = [
    {
      render: () => (
        <Tab.Pane te attached={false}>
          <ListRoles />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <div className="roles-page">
        <button
          onClick={onOpenCloseModal}
          type="button"
          className="roles-page__add flex flex-row items-center justify-center px-4 py-3 text-xs font-bold text-white uppercase bg-blue-500 rounded-lg hover:bg-blue-600 space-x-1"
        >
          <span className="p-1">Nuevo Registro</span>
        </button>

        <Tab menu={{ secondary: true }} panes={panes} />
      </div>
      <BasicModal show={showModal} close={onOpenCloseModal} title="Nuevo Rol">
        <RolForm close={onOpenCloseModal} />
      </BasicModal>
    </>
  );
}
