import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addDays, format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Customer } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { RiWallet3Line } from "react-icons/ri";
import { Loader } from "semantic-ui-react";

const CustomerController = new Customer();

export function CustomerView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const { accessToken } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        setCustomer(null);
        const response = await CustomerController.getCustomer(accessToken, id);
        setCustomer(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  if (!customer && customer !== null) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <RiWallet3Line size={48} color="#fff" className="mb-4" />
        <span className="text-white">El cliente no existe.</span>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-center">Cargando información del cliente...</div>
        <Loader active inline="centered" />
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="w-full mb-6 pt-3">
          <div className="flex flex-row items-center justify-between mb-4">
            <div className="flex flex-col">
              <div className="text-base font-bold text-gray-500 uppercase">
                <span className="text-gray-600">Vista General</span>
                <div className="text-xl font-bold">
                  <span className="text-gray-600">clientes</span>
                </div>
              </div>
            </div>
          </div>
          <button
            className="text-white bg-[#1678C2] font-bold py-2 px-4 rounded-xl"
            onClick={() => navigate(`/admin/customers`)}
          >
            <i className="fas fa-arrow-left text-white mr-2 text-lg"></i>
            Regresar
          </button>
        </div>
      </div>
      <div className="flex flex-col w-full mb-2 lg:flex-row lg:space-x-2 space-y-4 lg:space-y-0 lg:mb-4">
        <div className=" w-full p-4 rounded-lg  bg-cyan-800 border-white">
          <div className=" w-full p-4 rounded-lg bg-cyan-800 border-white">
            <div className="w-full flex flex-row items-center justify-between mb-6">
              <div className="flex flex-col">
                <div className="text-lg font-light text-white">Cliente</div>
                <div className="text-base text-white font-bold">
                  <span>Información de cliente</span>
                </div>
              </div>
            </div>

            <div className="p-5 text-center flex flex-col w-full">
              <p className="py-[0.15rem] text-white ">
                Nombre completo:{" "}
                <span className="text-bold">
                  {customer.firstname && customer.lastname
                    ? `${customer.firstname} ${customer.lastname}`
                    : "No hay datos"}
                </span>
              </p>
              <p className="py-[0.15rem] text-white ">
                Género:{" "}
                <span className="text-bold">
                  {customer.gender || "No hay datos"}
                </span>
              </p>
              <p className="py-[0.15rem] text-white ">
                Teléfono:{" "}
                <span className="text-bold">
                  {customer.phone || "No hay datos"}
                </span>
              </p>

              <p className="py-[0.15rem] text-white ">
                Estatus:{" "}
                <span className="text-bold">
                  {customer.status
                    ? "Cliente en préstamo"
                    : "El cliente no tiene préstamo" || "No hay datos"}{" "}
                </span>
              </p>
              <p className="py-[0.15rem] text-white ">
                Domicilio:{" "}
                <span className="text-bold">
                  {`${customer.street} ${customer.number_int_address} ${customer.number_ext_address}`}
                </span>
              </p>
              <p className="py-[0.15rem] text-white ">
                Colonia y municipio:{" "}
                <span className="text-bold">
                  {`${customer.neighborhood}, ${customer.municipality}`}
                </span>
              </p>
              <p className="py-[0.15rem] text-white ">
                Codigo postal:{" "}
                <span className="text-bold">{`${customer.zip}`}</span>
              </p>
              <p className="py-[0.15rem] text-white ">
                Estado y ciudad:{" "}
                <span className="text-bold">{`${customer.state}, ${customer.city}`}</span>
              </p>
              <p className="py-[0.15rem] text-white ">
                Fecha de creación:{" "}
                <span className="text-bold">
                  {format(
                    new Date(customer.createdAt || "No hay datos"),
                    "dd/MM/yyyy hh:mm:ss a"
                  )}
                </span>
              </p>
              <p className="py-[0.15rem] text-white ">
                Última actualización:{" "}
                <span className="text-bold">
                  {format(
                    new Date(customer.updatedAt || "No hay datos"),
                    "dd/MM/yyyy hh:mm:ss a"
                  )}
                </span>
              </p>
            </div>
          </div>
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
                {customer.loanRequests && customer.loanRequests.length > 0 ? (
                  customer.loanRequests.map((loan) => (
                    <tr key={loan._id} className="border-b border-slate-50">
                      <td className="p-3 text-white">{loan.code}</td>
                      <td className="p-3 text-white">{loan.amountRequested}</td>
                      <td className="p-3 text-white">{loan.totalAmount}</td>
                      <td className="p-3 text-white">{loan.status}</td>
                      <td className="p-3 text-white">
                        {loan.startDate
                          ? format(
                              addDays(new Date(loan.startDate), 1),
                              "dd/MM/yyyy "
                            )
                          : "No hay datos"}
                      </td>
                      <td className="p-3 text-white">
                        {loan.endDate
                          ? format(
                              addDays(new Date(loan.endDate), 1),
                              "dd/MM/yyyy "
                            )
                          : "No hay datos"}
                      </td>
                      <td className="p-3 text-white">{loan.period}</td>
                      <td className="p-3 text-white">{loan.interestAmount}</td>
                      <td className="p-3 text-white">{loan.interestRate}</td>
                      <td className="p-3 text-white">{loan.periodPaid}</td>
                      <td className="p-3 text-white">{loan.totalPaid}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="p-3" colSpan="11">
                      <div className="flex flex-col items-center justify-center py-8">
                        <RiWallet3Line
                          size={48}
                          color="#fff"
                          className="mb-4"
                        />

                        <span className="text-white">
                          El cliente no tiene nungún prestamo.
                        </span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
