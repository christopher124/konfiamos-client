import { Routes, Route } from "react-router-dom"; // rutas
import { AdminLayout } from "../layouts"; // Layout del admin
import { Auth } from "../pages/admin";
import { useAuth } from "../hooks";

export function AdminRouter() {
  const { user } = useAuth();
  console.log(useAuth());

  // funcion para cargar layout de admin
  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };
  return (
    <Routes>
      {!user ? (
        <Route path="/admin/*" element={<Auth />} />
      ) : (
        <>
          {/* Una pagina dos path */}
          {["/admin", "/admin/blog"].map((path) => ({
            /* <Route
            key={path}
            path={path}
            element={loadLayout(AdminLayout, Blog)}
          /> */
          }))}

          {/* <Route path="/admin/users" element={loadLayout(AdminLayout, Users)} />

        <Route
          path="/admin/courses"
          element={loadLayout(AdminLayout, Courses)}
        />
        <Route path="/admin/menu" element={loadLayout(AdminLayout, Menu)} />
        <Route
          path="/admin/newsletter"
          element={loadLayout(AdminLayout, Newsletter)}
        /> */}
        </>
      )}
    </Routes>
  );
}
