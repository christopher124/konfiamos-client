import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addDays, format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { LoanRequest } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { Loader } from "semantic-ui-react";
import { RiWallet3Line } from "react-icons/ri";

const LoanRequestController = new LoanRequest();

export function LoanDetailsView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loanRequest, setloanRequest] = useState(null);
  const { accessToken } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        setloanRequest(null);
        const response = await LoanRequestController.getLoanRequest(
          accessToken,
          id
        );
        setloanRequest(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  if (!loanRequest && loanRequest !== null) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <RiWallet3Line size={48} color="#fff" className="mb-4" />
        <span className="text-white">El prestamo no existe.</span>
      </div>
    );
  }

  if (!loanRequest) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-center">Cargando información del prestamo...</div>
        <Loader active inline="centered" />
      </div>
    );
  }

  return (
    <>
      {" "}
      <div>
        <div className="w-full mb-6 pt-3">
          <div className="flex flex-row items-center justify-between mb-4">
            <div className="flex flex-col">
              <div className="text-base font-bold text-gray-500 uppercase">
                <span className="text-gray-600">Vista General</span>
                <div className="text-xl font-bold">
                  <span className="text-gray-600">Prestamo</span>
                </div>
              </div>
            </div>
          </div>
          <button
            className="text-white bg-[#1678C2] font-bold py-2 px-4 rounded-xl"
            onClick={() => navigate(`/admin/loanrequests`)}
          >
            <i className="fas fa-arrow-left text-white mr-2 text-lg"></i>
            Regresar
          </button>
        </div>
      </div>
      <div className="w-full mb-2 lg:space-x-2 space-y-2 lg:space-y-0 lg:mb-4">
        <div className=" w-full p-4 rounded-lg  bg-cyan-800 border-white">
          <div className="flex flex-row items-center justify-between mb-6">
            <div className="flex flex-col">
              <div className="text-lg font-bold text-white">Cliente</div>
              <div className="text-base font-bold text-white">
                <span>Información Préstamos</span>
              </div>
            </div>
            <div className="relative inline-block text-left z-10"></div>
          </div>
          <div className="p-0 w-full">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-cyan-800 border-white">
                  <th className="p-3 font-bold text-white">Código</th>
                  <th className="p-3 font-bold text-white">Monto solicitado</th>
                  <th className="p-3 font-bold text-white">Monto a pagar</th>
                  <th className="p-3 font-bold text-white">Estatus</th>
                  <th className="p-3 font-bold text-white">Fecha de inicio</th>
                  <th className="p-3 font-bold text-white">Fecha de Fin</th>
                  <th className="p-3 font-bold text-white">Período</th>
                  <th className="p-3 font-bold text-white">Monto de interés</th>
                  <th className="p-3 font-bold text-white">Tasa de interés</th>
                  <th className="p-3 font-bold text-white">Período pagado</th>
                  <th className="p-3 font-bold text-white">Total pagado</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-50">
                  <td className="p-3 text-white">{loanRequest.code}</td>
                  <td className="p-3 text-white">
                    {loanRequest.amountRequested}
                  </td>
                  <td className="p-3 text-white">{loanRequest.totalAmount}</td>
                  <td className="p-3 text-white">{loanRequest.status}</td>
                  <td className="p-3 text-white">
                    {loanRequest.startDate
                      ? format(
                          addDays(new Date(loanRequest.startDate), 1),
                          "dd/MM/yyyy"
                        )
                      : "No hay datos"}
                  </td>
                  <td className="p-3 text-white">
                    {loanRequest.endDate
                      ? format(
                          addDays(new Date(loanRequest.endDate), 1),
                          "dd/MM/yyyy"
                        )
                      : "No hay datos"}
                  </td>
                  <td className="p-3 text-white">{loanRequest.period}</td>
                  <td className="p-3 text-white">
                    {loanRequest.interestAmount}
                  </td>
                  <td className="p-3 text-white">{loanRequest.interestRate}</td>
                  <td className="p-3 text-white">{loanRequest.periodPaid}</td>
                  <td className="p-3 text-white">{loanRequest.totalPaid}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
