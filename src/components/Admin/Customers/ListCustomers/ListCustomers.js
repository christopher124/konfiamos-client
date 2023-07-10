import { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { size, map } from "lodash";
import { Customer } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { CustomerItem } from "../CustomerItem";
import { EmptyList } from "../../../Shared";
import ReactPaginate from "react-paginate";
import "./ListCustomers.scss";

const CustomerController = new Customer();

export function ListCustomers(props) {
  const { customerStatus, reload, onReload } = props;
  const [customers, setCustomers] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10); // Número de clientes por página
  const { accessToken } = useAuth();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await CustomerController.getCustomers(
          accessToken,
          customerStatus
        );
        setCustomers(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCustomers();
  }, [customerStatus, reload, accessToken]);

  if (!customers) return <Loader active inline="centered" />;
  if (size(customers) === 0) {
    return (
      <EmptyList
        title={
          customerStatus === true
            ? "No hay clientes con préstamo."
            : "No hay clientes sin préstamo, registra un cliente."
        }
      />
    );
  }

  // Obtener la lista de clientes para la página actual
  const offset = currentPage * pageSize;
  const currentCustomers = customers.slice(offset, offset + pageSize);

  // Calcular el número total de páginas
  const pageCount = Math.ceil(customers.length / pageSize);

  // Cambiar de página
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  // Cambiar la cantidad de clientes por página
  const handlePageSizeChange = (event) => {
    const size = parseInt(event.target.value);
    setPageSize(size);
    setCurrentPage(0);
  };

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

      <div className="overflow-x-auto">
        <table className="w-full text-base text-white">
          <thead className="bg-[#687584]">
            <tr className="border border-slate-50">
              <th className="py-3 px-6 text-center">Nombres completos</th>
              <th className="py-3 px-6 text-center">Correo</th>
              <th className="py-3 px-6 text-center">Teléfono de casa</th>
              <th className="py-3 px-6 text-center">Teléfono celular</th>
              <th className="py-3 px-6 text-center">Ocupación</th>
              <th className="py-3 px-6 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {map(currentCustomers, (customer) => (
              <CustomerItem
                key={customer._id}
                customer={customer}
                onReload={onReload}
              />
            ))}
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
