import { useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import { BasicModal } from "../../../Shared";
import { RolForm } from "../RolForm";

export function RoleItem(props) {
  const { role, onReload } = props;
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const openUpdateRole = () => {
    setTitleModal(`Actulizar ${role.name}`);
    onOpenCloseModal();
  };
  return (
    <>
      <tr className="border-b bg-cyan-800 border-white">
        <th
          scope="row"
          className="justify-center flex p-9 px-6 py-4 text-center"
        >
          <td className=" text-white px-6 py-4 font-medium text-center">
            {role.name ? role.name : "No hay datos"}
          </td>
        </th>
        <td className=" border border-slate-50 px-6 py-4 font-medium text-white whitespace-nowrap">
          {role.displayName ? role.displayName : "No hay datos"}
        </td>
        <td className="border border-slate-50 text-white font-medium px-6 py-4 text-center">
          {role.description ? role.description : "No hay datos"}
        </td>

        <td className=" border border-slate-50 py-3 px-6 text-center">
          <div className="flex item-center justify-center">
            <Button icon primary onClick={openUpdateRole}>
              <Icon name="pencil" />
            </Button>

            <Button icon color="red">
              <Icon name="trash" />
            </Button>
          </div>
        </td>
      </tr>
      <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
        <RolForm close={onOpenCloseModal} onReload={onReload} role={role} />
      </BasicModal>
    </>
  );
}
