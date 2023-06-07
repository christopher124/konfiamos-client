import { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { size, map } from "lodash";
import { Customer } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { CustomerItem } from "../CustomerItem";

const CustomerController = new Customer();

export function ListCustomers(props) {
  const { customerStatus, reload, onReload } = props;
  const [customers, setCustomers] = useState(null);
  const { accessToken } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        setCustomers(null);
        const response = await CustomerController.getCustomers(
          accessToken,
          customerStatus
        );
        setCustomers(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [customerStatus, reload]);

  if (!customers) return <Loader active inline="centered" />;
  if (size(customers) === 0) return "No hay ningún usuario";

  return (
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
          {map(customers, (customer) => (
            <CustomerItem
              key={customer._id}
              customer={customer}
              onReload={onReload}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
