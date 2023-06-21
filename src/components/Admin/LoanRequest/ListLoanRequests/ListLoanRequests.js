import { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { size, map } from "lodash";
import { LoanRequest } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { LoanRequestItem } from "../LoanRequestItem";
import { EmptyList } from "../../../Shared";

const LoanRequestController = new LoanRequest();

export function ListLoanRequests(props) {
  const { reload, onReload } = props;
  const [loanRequest, setLoanRequest] = useState(null);
  const { accessToken } = useAuth();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        let validAccessToken = accessToken;

        const loanRequest = await LoanRequestController.getLoanRequests(
          validAccessToken
        );
        setLoanRequest(loanRequest);
      } catch (error) {}
    };

    fetchRoles();
  }, [reload]);

  if (!loanRequest) return <Loader active inline="centered" />;
  if (size(loanRequest) === 0) {
    return <EmptyList title="No hay ningún prestamo registrado." />;
  }

  return (
    <>
      <div className="relative overflow-x-auto shadow-2xl sm:rounded-lg">
        <table className="w-full border border-slate-50 text-base text-center text-white">
          <thead className="border-b text-base uppercase bg-[#687584] text-white">
            <tr className="border border-slate-50">
              <th className="py-3 px-6 text-center sm:w-1/4">
                Nombre del cliente
              </th>
              <th className="py-3 px-6 text-center sm:w-1/4">
                codigo del prestamo
              </th>
              <th className="py-3 px-6 text-center sm:w-1/4">
                Monto solicitado
              </th>
              <th className="py-3 px-6 text-center sm:w-1/4">Monto a pagar</th>
              <th className="py-3 px-6 text-center sm:w-1/4">
                Estatus del prestamo
              </th>
              <th className="py-3 px-6 text-center sm:w-1/4">Periodo pagado</th>
              <th className="py-3 px-6 text-center sm:w-1/4">total pagado</th>
              <th className="py-3 px-6 text-center sm:w-1/4">
                Fecha de solicitud
              </th>
              <th className="py-3 px-6 text-center sm:w-1/4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {map(loanRequest, (loanRequest) => (
              <LoanRequestItem
                key={loanRequest._id}
                loanRequest={loanRequest}
                onReload={onReload}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
