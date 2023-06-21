import { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { size, map } from "lodash";
import { Role } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { RoleItem } from "../RoleItem";
import { EmptyList } from "../../../Shared";
const RoleController = new Role();

export function ListRoles(props) {
  const { reload, onReload } = props;
  const [roles, setRoles] = useState(null);
  const { accessToken, refreshToken, reLogin } = useAuth();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        let validAccessToken = accessToken;

        const roles = await RoleController.getRoles(validAccessToken);
        setRoles(roles);
      } catch (error) {}
    };

    fetchRoles();
  }, [reload]);

  if (!roles) return <Loader active inline="centered" />;
  if (size(roles) === 0) {
    return <EmptyList title="No hay ningún rol registrado." />;
  }

  return (
    <div className="relative overflow-x-auto shadow-2xl sm:rounded-lg">
      <table className="w-full border border-slate-50 text-base text-center text-white">
        <thead className="border-b text-base uppercase bg-[#687584] text-white">
          <tr className="border border-slate-50">
            <th className="py-3 px-6 text-center sm:w-1/4">Nombre del rol</th>
            <th className="py-3 px-6 text-center sm:w-1/4">Nombre a mostrar</th>
            <th className="py-3 px-6 text-center sm:w-1/4">Descripción</th>
            <th className="py-3 px-6 text-center sm:w-1/4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {map(roles, (role) => (
            <RoleItem key={role._id} role={role} onReload={onReload} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
