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
  console.log(users);
  useEffect(() => {
    (async () => {
      try {
        setUsers(null);
        const response = await userController.getUsers(
          accessToken,
          usersActive
        );
        setUsers(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [usersActive, reload]);

  if (!users) return <Loader active inline="centered" />;
  if (size(users) === 0) return "No hay ningun usuario";

  return (
    <div className="relative overflow-x-auto shadow-2xl sm:rounded-lg">
      <table
        id="tableDoctors"
        className=" border border-slate-50 w-full  text-base text-center text-white"
      >
        <thead className="border-b text-base uppercase bg-[#687584] text-white">
          <tr className="border border-slate-50">
            <th scope="col" className=" text-white py-3 px-6 text-center ">
              Avatar
            </th>
            <th scope="col" className=" text-white py-3 px-6 text-center ">
              Nombres completo
            </th>
            <th scope="col" className="text-white py-3 px-6 text-center">
              Correo
            </th>
            <th scope="col" className="text-white py-3 px-6 text-center">
              Rol
            </th>
            <th
              scope="col"
              className="text-white font-bold py-3 px-6 text-center "
            >
              Acciones
            </th>
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
