import React, { useEffect, useState } from "react";
import { LoanRequest } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

const LoanRequestController = new LoanRequest();

export function DashboardBart() {
  const [data, setData] = useState(null);
  const { accessToken } = useAuth();

  useEffect(() => {
    fetchLoanData();
  }, []);

  const fetchLoanData = async () => {
    try {
      const response = await LoanRequestController.getTotalInvestment(
        accessToken
      );
      const { totalInvestment } = response;
      setData(totalInvestment);
    } catch (error) {
      console.log(error);
    }
  };

  const getMonthLabel = (month) => {
    // Retorna la etiqueta del mes según el número de mes
    const monthNames = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    return monthNames[month - 1];
  };

  const getBarColors = () => {
    // Retorna un array de colores para las barras
    const colors = [
      "#FFB6AF",
      "#FFE1AD",
      "#FAFDB0",
      "#B0F2C2",
      "#FFE6ED",
      "#A8C8FF",
      "#FFA8D1",
      "#D1A8FF",
      "#FFA8A8",
      "#C8FFA8",
      "#A8FFC8",
      "#A8FFD6",
    ];
    return colors.slice(0, data.length); // Utiliza los colores según la cantidad de barras
  };

  const chartData = {
    labels: data ? data.map((item) => getMonthLabel(item.month)) : [],
    datasets: [
      {
        label: "Monto de inversión",
        data: data ? data.map((item) => item.totalAmount) : [],
        backgroundColor: data ? getBarColors() : [],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 50,
        },
      },
    },
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-lg font-semibold mb-4">
          Gráfico de barras de inversión
        </div>
        <div className="flex justify-start">
          <Bar
            data={chartData}
            options={chartOptions}
            width={400}
            height={300}
          />
        </div>
      </div>
    </div>
  );
}
