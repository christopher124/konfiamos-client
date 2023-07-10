import { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { size, map } from "lodash";
import { Role } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { RoleItem } from "../RoleItem";
import { EmptyList } from "../../../Shared";
import ReactPaginate from "react-paginate";
import "./ListRoles.scss";

const RoleController = new Role();

export function ListRoles(props) {
  const { reload, onReload } = props;
  const [roles, setRoles] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5); // Número de roles por página
  const { accessToken } = useAuth();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        let validAccessToken = accessToken;
        const roles = await RoleController.getRoles(validAccessToken);
        setRoles(roles);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRoles();
  }, [reload]);

  // Obtener la lista de roles para la página actual
  const offset = currentPage * pageSize;
  const currentRoles = roles?.slice(offset, offset + pageSize) || [];

  // Calcular el número total de páginas
  const pageCount = Math.ceil(size(roles) / pageSize);

  // Cambiar de página
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Cambiar la cantidad de roles por página
  const handlePageSizeChange = (event) => {
    const size = parseInt(event.target.value);
    setPageSize(size);
    setCurrentPage(0);
  };

  if (!roles) return <Loader active inline="centered" />;
  if (size(roles) === 0) {
    return <EmptyList title="No hay ningún rol registrado." />;
  }

  return (
    <>
      <div className="pageSize-container">
        <label htmlFor="pageSize">Mostrar:</label>
        <select id="pageSize" value={pageSize} onChange={handlePageSizeChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
      <div className="relative overflow-x-auto shadow-2xl sm:rounded-lg">
        <table className="w-full border border-slate-50 text-base text-center text-white">
          <thead className="border-b text-base uppercase bg-[#687584] text-white">
            <tr className="border border-slate-50">
              <th className="py-3 px-6 text-center sm:w-1/4">Nombre del rol</th>
              <th className="py-3 px-6 text-center sm:w-1/4">
                Nombre a mostrar
              </th>
              <th className="py-3 px-6 text-center sm:w-1/4">Descripción</th>
              <th className="py-3 px-6 text-center sm:w-1/4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {map(currentRoles, (role) => (
              <RoleItem key={role._id} role={role} onReload={onReload} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination-container">
        <ReactPaginate
          previousLabel="Anterior"
          nextLabel="Siguiente"
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName="pagination"
          subContainerClassName="pages pagination"
          activeClassName="active"
        />
      </div>
    </>
  );
}
