import { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { size, map } from "lodash";
import { LoanRequest } from "../../../../api";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../../hooks";
import { LoanPaymentsItem } from "../LoanPaymentsItem";
import { EmptyList } from "../../../Shared";
import ReactPaginate from "react-paginate";

const LoanRequestController = new LoanRequest();

export function ListLoanPayments(props) {
  const { reload, onReload } = props;
  const [loanPayments, setLoanPayments] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10); // Número de clientes por página
  const { accessToken } = useAuth();
  const { id } = useParams();
  useEffect(() => {
    const fetchLoanPayments = async () => {
      try {
        let validAccessToken = accessToken;

        const loanPayments = await LoanRequestController.getLoanPayments(
          validAccessToken,
          id
        );
        setLoanPayments(loanPayments);
        console.log(loanPayments);
      } catch (error) {
        // Manejo de errores
      }
    };

    fetchLoanPayments();
  }, [reload]);

  if (!loanPayments) return <Loader active inline="centered" />;
  if (size(loanPayments) === 0) {
    return <EmptyList title="No hay ningún pago asociado al prestamo." />;
  }

  // Obtener la lista de clientes para la página actual
  const offset = currentPage * pageSize;
  const currentloanPayments = loanPayments.slice(offset, offset + pageSize);

  // Calcular el número total de páginas
  const pageCount = Math.ceil(loanPayments.length / pageSize);

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

      <div className="relative overflow-x-auto shadow-2xl sm:rounded-lg">
        <table className="w-full border border-slate-50 text-base text-center text-white">
          <thead className="border-b text-base uppercase bg-[#687584] text-white">
            <tr className="border border-slate-50">
              <th className="py-3 px-6 text-center sm:w-1/4">Fecha de pago</th>
              <th className="py-3 px-6 text-center sm:w-1/4">
                Codigo del prestamo
              </th>
              <th className="py-3 px-6 text-center sm:w-1/4">
                Fecha limite de pago
              </th>
              <th className="py-3 px-6 text-center sm:w-1/4">Monto a pagar</th>
              <th className="py-3 px-6 text-center sm:w-1/4">
                Estatus de pago
              </th>
              <th className="py-3 px-6 text-center sm:w-1/4">
                Estatus de pago parcial
              </th>
              <th className="py-3 px-6 text-center sm:w-1/4">
                Monto pago parcial
              </th>
              <th className="py-3 px-6 text-center sm:w-1/4">Comentario</th>

              <th className="py-3 px-6 text-center sm:w-1/4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {map(currentloanPayments, (loanPayment) => (
              <LoanPaymentsItem
                key={loanPayment._id}
                loanPayment={loanPayment}
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
