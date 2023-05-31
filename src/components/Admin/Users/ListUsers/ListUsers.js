import { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { size, map } from "lodash";
import { User } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { UserItem } from "../UserItem";

const userController = new User();

export function ListUsers(props) {
  const { usersActive, reload } = props;
  const [users, setUsers] = useState(null);
  const { accessToken } = useAuth();
  useEffect(() => {
    (async () => {
      try {
        setUsers(null);
        const response = await userController.getUsers(
          accessToken,
          usersActive
        );
        setUsers(response);
      } catch (error) {}
    })();
  }, [usersActive, reload]);

  if (!users) return <Loader active inline="centered" />;
  if (size(users) === 0) return "No hay ningun usuario";

  return (
    <div className="overflow-x-auto shadow-2xl">
      <table id="tableDoctors" className="w-full text-base text-white">
        <thead className="bg-[#687584]">
          <tr className="border border-slate-50">
            <th className="py-3 px-6 text-center">Avatar</th>
            <th className="py-3 px-6 text-center">Nombres completo</th>
            <th className="py-3 px-6 text-center">Correo</th>
            <th className="py-3 px-6 text-center">Rol</th>
            <th className="py-3 px-6 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {map(users, (user) => (
            <UserItem key={user._id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
