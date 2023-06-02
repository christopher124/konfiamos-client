import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Customer } from "../../../../api/costumer";
import { useAuth } from "../../../../hooks";

const CustomerController = new Customer();

export function CustomerView() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const { accessToken } = useAuth();

  console.log(customer);

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

  if (!customer) {
    return (
      <div className="text-center">Cargando información del cliente...</div>
    );
  }

  const firstLoan =
    customer.loanRequests && customer.loanRequests.length > 0
      ? customer.loanRequests[0]
      : null;
  const otherLoans =
    customer.loanRequests && customer.loanRequests.length > 1
      ? customer.loanRequests.slice(1)
      : [];

  return (
    <>
      <div className="flex flex-col w-full mb-2 lg:flex-row lg:space-x-2 space-y-4 lg:space-y-0 lg:mb-4">
        <div className="w-full lg:w-1/3 lg:h-1/3">
          <div className="font-noto w-full p-4 rounded-lg bg-cyan-800 border-white">
            <div className="w-full flex flex-row items-center justify-between mb-6">
              <div className="flex flex-col">
                <div className="text-lg font-light text-white">Cliente</div>
                <div className="text-base text-white font-bold">
                  <span>Información de cliente</span>
                </div>
              </div>
            </div>

            <div className="p-5 text-center flex flex-col w-full">
              <p className="py-[0.15rem] text-white font-noto">
                Nombre completo:{" "}
                <span className="text-bold">
                  {customer.firstname && customer.lastname
                    ? `${customer.firstname} ${customer.lastname}`
                    : "No hay datos"}
                </span>
              </p>
              <p className="py-[0.15rem] text-white font-noto">
                Género:{" "}
                <span className="text-bold">
                  {customer.gender || "No hay datos"}
                </span>
              </p>
              <p className="py-[0.15rem] text-white font-noto">
                Teléfono:{" "}
                <span className="text-bold">
                  {customer.phone || "No hay datos"}
                </span>
              </p>

              <p className="py-[0.15rem] text-white font-noto">
                Estatus:{" "}
                <span className="text-bold">
                  {customer.status
                    ? "Cliente en préstamo"
                    : "El cliente no tiene préstamo" || "No hay datos"}{" "}
                </span>
              </p>
              <p className="py-[0.15rem] text-white font-noto">
                Domicilio:{" "}
                <span className="text-bold">
                  {`${customer.street} ${customer.number_int_address} ${customer.number_ext_address}`}
                </span>
              </p>
              <p className="py-[0.15rem] text-white font-noto">
                Colonia y municipio:{" "}
                <span className="text-bold">
                  {`${customer.neighborhood}, ${customer.municipality}`}
                </span>
              </p>
              <p className="py-[0.15rem] text-white font-noto">
                Codigo postal:{" "}
                <span className="text-bold">{`${customer.zip}`}</span>
              </p>
              <p className="py-[0.15rem] text-white font-noto">
                Estado y ciudad:{" "}
                <span className="text-bold">{`${customer.state}, ${customer.city}`}</span>
              </p>
              <p className="py-[0.15rem] text-white font-noto">
                Fecha de creación:{" "}
                <span className="text-bold">
                  {format(
                    new Date(customer.createdAt || "No hay datos"),
                    "dd/MM/yyyy hh:mm:ss a"
                  )}
                </span>
              </p>
              <p className="py-[0.15rem] text-white font-noto">
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

        <div className="w-full lg:w-2/3 lg:h-auto">
          {firstLoan && (
            <div className="w-full p-3 rounded-lg bg-cyan-800">
              <div className="flex flex-row items-center justify-between mb-6">
                <div className="flex flex-col">
                  <div className="text-lg font-bold text-white">Préstamo 1</div>
                  <div className="text-base font-bold text-white">
                    <span>Detalles del primer préstamo</span>
                  </div>
                </div>
                <div className="relative inline-block text-left z-10"></div>
              </div>
              <div className="p-0 flex flex-col w-full">
                <div className="p-4 rounded-lg bg-cyan-800 border-white">
                  <p className="font-bold">Código: {firstLoan.code}</p>
                  <p>Monto solicitado: {firstLoan.amountRequested}</p>
                  <p>Monto a pagar: {firstLoan.totalAmount}</p>
                  <p>Estatus: {firstLoan.status}</p>
                  <p>
                    Fecha de inicio:{" "}
                    {format(
                      new Date(firstLoan.startDate || "No hay datos"),
                      "dd/MM/yyyy hh:mm:ss a"
                    )}
                  </p>
                  <p>
                    Fecha de Fin:{" "}
                    {format(
                      new Date(firstLoan.endDate || "No hay datos"),
                      "dd/MM/yyyy hh:mm:ss a"
                    )}
                  </p>
                  <p>Período: {firstLoan.period}</p>
                  <p>Monto de interés: {firstLoan.interestAmount}</p>
                  <p>Tasa de interés: {firstLoan.interestRate}</p>
                  <p>Período pagado: {firstLoan.periodPaid}</p>
                  <p>Total pagado: {firstLoan.totalPaid}</p>
                </div>
              </div>
            </div>
          )}

          {otherLoans.length > 0 && (
            <div className="w-full p-3 rounded-lg bg-cyan-800">
              <div className="flex flex-row items-center justify-between mb-6">
                <div className="flex flex-col">
                  <div className="text-lg font-bold text-white">
                    Otros Préstamos
                  </div>
                  <div className="text-base font-bold text-white">
                    <span>Detalles de los demás préstamos</span>
                  </div>
                </div>
                <div className="relative inline-block text-left z-10"></div>
              </div>
              <div className="p-0 flex flex-col w-full">
                <ul className="list-disc pl-4">
                  {otherLoans.map((loan) => (
                    <li key={loan._id} className="mb-4">
                      <div className="p-4 rounded-lg bg-cyan-800 border-white">
                        <p className="font-bold">Código: {loan.code}</p>
                        <p>Monto solicitado: {loan.amountRequested}</p>
                        <p>Monto a pagar: {loan.totalAmount}</p>
                        <p>Estatus: {loan.status}</p>
                        <p>
                          Fecha de inicio:{" "}
                          {format(
                            new Date(loan.startDate || "No hay datos"),
                            "dd/MM/yyyy hh:mm:ss a"
                          )}
                        </p>
                        <p>
                          Fecha de Fin:{" "}
                          {format(
                            new Date(loan.endDate || "No hay datos"),
                            "dd/MM/yyyy hh:mm:ss a"
                          )}
                        </p>
                        <p>Período: {loan.period}</p>
                        <p>Monto de interés: {loan.interestAmount}</p>
                        <p>Tasa de interés: {loan.interestRate}</p>
                        <p>Período pagado: {loan.periodPaid}</p>
                        <p>Total pagado: {loan.totalPaid}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
