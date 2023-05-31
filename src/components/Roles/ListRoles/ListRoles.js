import { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { size, map } from "lodash";
import { Role } from "../../../api";
import { useAuth } from "../../../hooks";
import { RoleItem } from "../RoleItem";

const RoleController = new Role();

export function ListRoles(props) {
  console.log(props);
  const [roles, setRoles] = useState(null);
  const { accessToken } = useAuth();
  console.log(roles);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const roles = await RoleController.getRoles(accessToken);
        setRoles(roles);
        console.log(roles);
      } catch (error) {}
    };

    fetchRoles();
  }, []);

  if (!roles) return <Loader active inline="centered" />;
  if (size(roles) === 0) return "No hay ningun usuario";

  return (
    <div className="relative overflow-x-auto shadow-2xl sm:rounded-lg">
      <table
        id="tableDoctors"
        className=" border border-slate-50 w-full  text-base text-center text-white"
      >
        <thead className="border-b text-base uppercase bg-[#687584] text-white">
          <tr className="border border-slate-50">
            <th scope="col" className=" text-white py-3 px-6 text-center ">
              Nombre del rol
            </th>
            <th scope="col" className="text-white py-3 px-6 text-center">
              Nombre a mostrar
            </th>
            <th scope="col" className="text-white py-3 px-6 text-center">
              Descripcion
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
          {roles?.map((role) => (
            <RoleItem key={role._id} role={role} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
