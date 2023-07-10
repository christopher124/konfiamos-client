import { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { size, map } from "lodash";
import { User } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { UserItem } from "../UserItem";
import { EmptyList } from "../../../Shared";
import ReactPaginate from "react-paginate";
import "./ListUsers.scss";

const userController = new User();

export function ListUsers(props) {
  const { usersActive, reload, onReload } = props;
  const [users, setUsers] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5); // Número de usuarios por página
  const { user: currentUser, accessToken } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
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
    };

    fetchUsers();
  }, [usersActive, reload, accessToken]);

  // Obtener la lista de usuarios para la página actual
  const offset = currentPage * pageSize;
  const currentUsers = users?.slice(offset, offset + pageSize) || [];

  // Calcular el número total de páginas
  const pageCount = Math.ceil(size(users) / pageSize);

  // Cambiar de página
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Cambiar la cantidad de usuarios por página
  const handlePageSizeChange = (event) => {
    const size = parseInt(event.target.value);
    setPageSize(size);
    setCurrentPage(0);
  };

  if (!users) return <Loader active inline="centered" />;
  if (size(users) === 0) {
    return (
      <EmptyList
        title={
          usersActive === true
            ? "No hay clientes activos."
            : "No hay clientes inactivos."
        }
      />
    );
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
              currentUsers,
              (user) =>
                user._id !== currentUser._id && (
                  <UserItem
                    key={user._id}
                    user={user}
                    onReload={onReload}
                    disabled={user._id === currentUser._id}
                  />
                )
            )}
          </tbody>
        </table>
      </div>
      <div className="pagination-container">
        <ReactPaginate
          previousLabel={"Anterior"}
          nextLabel={"Siguiente"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    </>
  );
}
