import { Menu, Icon } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../../hooks";
import "./AdminMenu.scss";

export function AdminMenu() {
  const { pathname } = useLocation();
  const {
    user: { role },
  } = useAuth();
  const isAdmin = role.name === "Admin";
  const isCurrentPath = (path) => {
    if (path === pathname) return true;
    return false;
  };

  console.log(pathname);
  return (
    <Menu fluid vertical icon text className="admin-menu">
      {isAdmin && (
        <>
          <Menu.Item
            as={Link}
            to="/admin/dashboard"
            active={isCurrentPath("/admin/dashboard")}
          >
            <Icon name="dashboard" />
            Dashboard
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/admin/users"
            active={isCurrentPath("/admin/users")}
          >
            <Icon name="user" />
            Usuarios
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/admin/roles"
            active={isCurrentPath("/admin/roles")}
          >
            <Icon name="address card" />
            Roles
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/admin/customers"
            active={isCurrentPath("/admin/customers")}
          >
            <Icon name="address book" />
            Clientes
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/admin/loanrequest"
            active={isCurrentPath("/admin/loanrequest")}
          >
            <Icon name="pencil alternate" />
            Prestamos
          </Menu.Item>
        </>
      )}

      <Menu.Item
        as={Link}
        to="/admin/menu"
        active={isCurrentPath("/admin/menu")}
      >
        <Icon name="bars" />
        Menu
      </Menu.Item>
    </Menu>
  );
}
