import { Routes, Route, Navigate, Link } from "react-router-dom";
import { AdminLayout } from "../layouts";
import {
  Auth,
  Customer,
  Dashboard,
  Users,
  Menu,
  LoanRequest,
  Role,
  LoanPayment,
} from "../pages/admin";
import { CustomerView } from "../components/Admin/Customers";
import { useAuth } from "../hooks";
import { LoanDetailsView } from "../components/Admin/LoanRequest";

export function AdminRouter() {
  const { user } = useAuth();

  const isAdmin = user && user.role && user.role.name === "Admin";
  const isUser = user && user.role && user.role.name === "User";

  // Función para cargar el layout de admin
  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };

  // Redirección para rutas no autorizadas
  const redirectToUnauthorized = () => <Navigate to="/admin/unauthorized" />;

  let validPath = true;

  return (
    <Routes>
      {!user ? (
        <Route path="/admin/*" element={<Auth />} />
      ) : (
        <>
          {isAdmin && (
            <>
              <Route
                path="/admin/dashboard"
                element={loadLayout(AdminLayout, Dashboard)}
              />
              Una pagina dos path
              {["/admin", "/admin/dashboard"].map((path) => (
                <Route
                  key={path}
                  path={path}
                  element={loadLayout(AdminLayout, Dashboard)}
                />
              ))}
              <Route
                path="/admin/users"
                element={loadLayout(AdminLayout, Users)}
              />
              <Route
                path="/admin/customers"
                element={loadLayout(AdminLayout, Customer)}
              />
              <Route
                path="/admin/roles"
                element={loadLayout(AdminLayout, Role)}
              />
              <Route
                path="/admin/customer/:id"
                element={loadLayout(AdminLayout, CustomerView)}
              />
              <Route
                path="/admin/loanrequests"
                element={loadLayout(AdminLayout, LoanRequest)}
              />
              <Route
                path="/admin/loanrequest/:id"
                element={loadLayout(AdminLayout, LoanDetailsView)}
              />
              <Route
                path="/admin/loanpayments/:id"
                element={loadLayout(AdminLayout, LoanPayment)}
              />
              {/* Agregar rutas adicionales para el rol "Admin" */}
            </>
          )}

          {isUser && (
            <>
              <Route
                path="/admin"
                element={loadLayout(AdminLayout, Dashboard)}
              />
              <Route
                path="/admin/menu"
                element={loadLayout(AdminLayout, Menu)}
              />
              {/* Agregar rutas adicionales para el rol "Usuario" */}
            </>
          )}

          <Route path="/admin/menu" element={loadLayout(AdminLayout, Menu)} />
          <Route path="/admin/unauthorized" element={<UnauthorizedPage />} />
          {/* Agregar más rutas públicas o de error aquí */}
          <Route
            path="*"
            element={
              validPath ? (
                redirectToUnauthorized()
              ) : (
                <Navigate to="/admin/unauthorized" replace />
              )
            }
          />
        </>
      )}
    </Routes>
  );
}

function UnauthorizedPage() {
  return (
    <div>
      <h1>Acceso no autorizado</h1>
      <p>No tienes permiso para acceder a esta página.</p>
      <Link to="/admin/menu">Volver al Dashboard</Link>
    </div>
  );
}
