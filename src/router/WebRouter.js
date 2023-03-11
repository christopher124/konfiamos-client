import { Routes, Route } from "react-router-dom"; // rutas
import { ClientLayout } from "../layouts"; // Layout del cliente
import { Home } from "../pages/web";

export function WebRouter() {
  // funcion para cargar layout de Cliente
  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };

  return (
    <Routes>
      <Route path="/" element={loadLayout(ClientLayout, Home)} />
    </Routes>
  );
}
