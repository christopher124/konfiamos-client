import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { size, map } from "lodash";
import { LoanRequest } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { LoanRequestItem } from "../LoanRequestItem";
import { EmptyList } from "../../../Shared";
import ReactPaginate from "react-paginate";
import "./ListLoanRequests.scss";

const LoanRequestController = new LoanRequest();

export function ListLoanRequests(props) {
  const { reload, onReload } = props;
  const [loanRequests, setLoanRequests] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5); // Número de prestamos por página
  const { accessToken } = useAuth();

  useEffect(() => {
    const fetchLoanRequests = async () => {
      try {
        let validAccessToken = accessToken;
        const response = await LoanRequestController.getLoanRequests(
          validAccessToken
        );
        setLoanRequests(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLoanRequests();
  }, [reload]);

  // Obtener la lista de clientes para la página actual
  const offset = currentPage * pageSize;
  const currentloanRequests = loanRequests
    ? loanRequests.slice(offset, offset + pageSize)
    : [];

  // Calcular el número total de páginas
  const pageCount = loanRequests
    ? Math.ceil(loanRequests.length / pageSize)
    : 0;

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

  if (!loanRequests) return <Loader active inline="centered" />;
  if (size(loanRequests) === 0) {
    return <EmptyList title="No hay ningún préstamo registrado." />;
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
              <th className="py-3 px-6 text-center sm:w-1/4">
                Nombre del cliente
              </th>
              <th className="py-3 px-6 text-center sm:w-1/4">
                Código del préstamo
              </th>
              <th className="py-3 px-6 text-center sm:w-1/4">
                Monto solicitado
              </th>
              <th className="py-3 px-6 text-center sm:w-1/4">Monto a pagar</th>
              <th className="py-3 px-6 text-center sm:w-1/4">
                Estatus del préstamo
              </th>
              <th className="py-3 px-6 text-center sm:w-1/4">Periodo pagado</th>
              <th className="py-3 px-6 text-center sm:w-1/4">Total pagado</th>
              <th className="py-3 px-6 text-center sm:w-1/4">
                Fecha de solicitud
              </th>
              <th className="py-3 px-6 text-center sm:w-1/4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {map(currentloanRequests, (loanRequest) => (
              <LoanRequestItem
                key={loanRequest._id}
                loanRequest={loanRequest}
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
