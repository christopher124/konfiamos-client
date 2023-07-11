import React, { useEffect, useState } from "react";
import { Customer } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { FaUser } from "react-icons/fa";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

const CustomerController = new Customer();

export function DashboardCount() {
  const [customerCount, setCustomerCount] = useState({
    countWithLoan: 0,
    countWithoutLoan: 0,
  });
  const { accessToken } = useAuth();

  useEffect(() => {
    fetchCustomerCount();
  }, []);

  const fetchCustomerCount = async () => {
    try {
      const count = await CustomerController.getCustomersCount(accessToken);
      setCustomerCount(count);
    } catch (error) {
      console.error("Error al obtener el contador de clientes:", error);
    }
  };

  const renderIcon = (hasLoan) => {
    if (hasLoan) {
      return <RiMoneyDollarCircleLine className="text-gray-500 text-4xl" />;
    } else {
      return <FaUser className="text-gray-500 text-4xl" />;
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-4">{renderIcon(true)}</div>
            <h2 className="text-xl font-bold">Clientes con Préstamo</h2>
          </div>
          <div className="bg-gray-200 rounded-full px-4 py-2">
            <span className="text-xl">{customerCount.countWithLoan}</span>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-4">{renderIcon(false)}</div>
            <h2 className="text-xl font-bold">Clientes sin Préstamo</h2>
          </div>
          <div className="bg-gray-200 rounded-full px-4 py-2">
            <span className="text-xl">{customerCount.countWithoutLoan}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
