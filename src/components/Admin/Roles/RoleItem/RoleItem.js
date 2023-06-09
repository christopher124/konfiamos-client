import { useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import { BasicModal } from "../../../Shared";
import { RolForm } from "../RolForm";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Role } from "../../../../api";
import { useAuth } from "../../../../hooks";

const roleController = new Role();

export function RoleItem(props) {
  const { role, onReload } = props;
  const { accessToken } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const openUpdateRole = () => {
    setTitleModal(`Actualizar ${role.name}`);
    onOpenCloseModal();
  };

  const isRoleAdmin = role.name === "Admin";
  const deleteButtonClassName = `transparent-button${
    isRoleAdmin ? " disabled" : ""
  }`;

  const onDelete = () => {
    Swal.fire({
      title: "Eliminar rol",
      text: `¿Estás seguro de que deseas eliminar el rol ${role.name}?`,
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
      await roleController.deleteRole(accessToken, role._id);
      toast.success("Rol eliminado correctamente");
      onReload();

      const result = await Swal.fire({
        title: "Rol eliminado",
        text: "¿Deseas recuperar el rol eliminado?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, recuperar",
        cancelButtonText: "No",
      });

      if (result.isConfirmed) {
        try {
          await roleController.restoreRole(accessToken, role._id);
          toast.success("rol recuperado correctamente");
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
        <th
          scope="row"
          className="justify-center flex p-9 px-6 py-4 text-center"
        >
          <td className="text-white px-6 py-4 font-medium text-center">
            {role.name ? role.name : "No hay datos"}
          </td>
        </th>
        <td className="border border-slate-50 px-6 py-4 font-medium text-white whitespace-nowrap">
          {role.displayName ? role.displayName : "No hay datos"}
        </td>
        <td className="border border-slate-50 text-white font-medium px-6 py-4 text-center">
          {role.description ? role.description : "No hay datos"}
        </td>

        <td className="border border-slate-50 py-3 px-6 text-center">
          <div className="flex item-center justify-center">
            <Button icon primary onClick={openUpdateRole}>
              <Icon name="pencil" />
            </Button>

            <Button
              icon
              color="red"
              className={deleteButtonClassName}
              onClick={onDelete}
            >
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
