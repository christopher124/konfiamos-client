import React, { useEffect, useState } from "react";
import { DashboardCount, DashboardBart } from "../../../components/Admin";
import { User } from "../../../api";
import { useAuth } from "../../../hooks";

const UserController = new User();

export function Dashboard() {
  const [mensaje, setMensaje] = useState("");
  const [userName, setUserName] = useState("");
  const { accessToken } = useAuth();

  useEffect(() => {
    const obtenerSaludo = () => {
      const fecha = new Date();
      const hora = fecha.getHours();

      if (hora >= 6 && hora < 12) {
        return "Buenos días";
      } else if (hora >= 12 && hora < 20) {
        return "Buenas tardes";
      } else {
        return "Buenas noches";
      }
    };

    setMensaje(obtenerSaludo());
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await UserController.getMe(accessToken);
        const { username } = response;
        setUserName(username);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [accessToken]);

  return (
    <>
      <p className="text-3xl font-semibold text-left mb-4">
        {mensaje}, {userName}
      </p>
      <div className="mb-4">
        <DashboardCount />
      </div>
      <div className="mb-4">
        <DashboardBart />
      </div>
    </>
  );
}
