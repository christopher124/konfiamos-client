import { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { size, map } from "lodash";
import { User } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { UserItem } from "../UserItem";
import { EmptyList } from "../../../Shared";
const userController = new User();

export function ListUsers(props) {
  const { usersActive, reload, onReload } = props;
  const [users, setUsers] = useState(null);
  const { user: currentUser, accessToken } = useAuth(); // Renombrar la variable del usuario logueado

  useEffect(() => {
    (async () => {
      try {
        setUsers(null);
        const response = await userController.getUsers(
          accessToken,
          usersActive
        );
        setUsers(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [usersActive, reload, accessToken]);

  if (!users) return <Loader active inline="centered" />;
  if (size(users) === 0) {
    return (
      <EmptyList
        title={
          usersActive == true
            ? "No hay clientes activos."
            : "No hay clientes  inactivos."
        }
      />
    );
  }
  return (
    <div className="overflow-x-auto shadow-2xl">
      <table id="tableDoctors" className="w-full text-base text-white">
        <thead className="bg-[#687584]">
          <tr className="border border-slate-50">
            <th className="py-3 px-6 text-center">Avatar</th>
            <th className="py-3 px-6 text-center">Nombres completos</th>
            <th className="py-3 px-6 text-center">Correo</th>
            <th className="py-3 px-6 text-center">Rol</th>
            <th className="py-3 px-6 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {map(
            users,
            (user) =>
              user._id !== currentUser._id && ( // Verificar si el usuario actual es igual al usuario logueado
                <UserItem
                  key={user._id}
                  user={user}
                  onReload={onReload}
                  disabled={user._id === currentUser._id} // Deshabilitar botón de eliminar si es el usuario logueado
                />
              )
          )}
        </tbody>
      </table>
    </div>
  );
}
