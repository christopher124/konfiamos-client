import { useState } from "react";
import { Image, Button, Icon } from "semantic-ui-react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { image } from "../../../../assets";
import { User } from "../../../../api";
import { ENV } from "../../../../utils";
import { BasicModal } from "../../../Shared";
import { UserForm } from "../UserForm";
import "./UserItem.scss";
import { useAuth } from "../../../../hooks";

const userController = new User();

export function UserItem(props) {
  const { user, onReload } = props;
  const { accessToken } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [isDelete, setIsDelete] = useState(false);

  const openDesactivateActivateConfim = () => {
    setIsDelete(false);
    const action = user.active ? "desactivar" : "activar";
    Swal.fire({
      title: `Confirmar ${action} usuario`,
      text: `¿Estás seguro de que deseas ${action} al usuario ${user.email}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, confirmar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await onActivateDesactivate();
      }
    });
  };

  const onActivateDesactivate = async () => {
    try {
      await userController.updateUser(accessToken, user._id, {
        active: !user.active,
      });
      onReload();
      const action = user.active ? "desactivado" : "activado";
      toast.success(`Usuario ${action} correctamente`);
    } catch (error) {
      toast.error(error.msg);
    }
  };

  const onDelete = () => {
    Swal.fire({
      title: "Eliminar usuario",
      text: `¿Estás seguro de que deseas eliminar al usuario ${user.email}?`,
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
      await userController.deleteUser(accessToken, user._id);
      toast.success("Usuario eliminado correctamente");
      onReload();

      const result = await Swal.fire({
        title: "Usuario eliminado",
        text: "¿Deseas recuperar el usuario eliminado?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, recuperar",
        cancelButtonText: "No",
      });

      if (result.isConfirmed) {
        try {
          await userController.restoreUser(accessToken, user._id);
          toast.success("Usuario recuperado correctamente");
          onReload();
        } catch (error) {
          toast.error(error.msg);
        }
      }
    } catch (error) {
      toast.error(error.msg);
    }
  };

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const openUpdateUser = () => {
    setTitleModal(`Actualizar ${user.email}`);
    onOpenCloseModal();
  };

  return (
    <>
      <tr className="border-b bg-cyan-800 border-white">
        <td className="justify-center flex p-9 px-6 py-4 text-center">
          <Image
            avatar
            src={
              user.avatar ? `${ENV.BASE_PATH}/${user.avatar}` : image.noAvatar
            }
          />
        </td>
        <td className="border border-slate-50 px-6 py-4 font-medium text-white whitespace-nowrap">
          {user.firstname && user.lastname
            ? `${user.firstname} ${user.lastname}`
            : "No hay datos"}
        </td>
        <td className="border border-slate-50 text-white font-medium px-6 py-4 text-center">
          {user.email || "No hay datos"}
        </td>
        <td className="border border-slate-50 text-white font-medium px-6 py-4 text-center">
          {user.role.displayName || "No hay datos"}
        </td>
        <td className="border border-slate-50 py-3 px-6 text-center">
          <Button icon primary onClick={openUpdateUser}>
            <Icon name="pencil" />
          </Button>
          <Button
            icon
            color={user.active ? "orange" : "teal"}
            onClick={openDesactivateActivateConfim}
          >
            <Icon name={user.active ? "ban" : "check"} />
          </Button>
          <Button icon color="red" onClick={onDelete}>
            <Icon name="trash" />
          </Button>
        </td>
      </tr>
      <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
        <UserForm close={onOpenCloseModal} onReload={onReload} user={user} />
      </BasicModal>
    </>
  );
}
