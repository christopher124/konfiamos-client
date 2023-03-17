import { useState } from "react";
import { Tab } from "semantic-ui-react";
import { Icon } from "../../../assets"; // Icono de la apalicacion
import { LoginForm } from "../../../components/Admin/Auth";

import "./Auth.scss"; // Estilos de auth

export function Auth() {
  const [activeIndex, setActiveIndex] = useState(0);

  const openLogin = () => setActiveIndex(0);

  const panes = [
    {
      menuItem: "iniciar sesión",
      render: () => (
        <Tab.Pane>
          <LoginForm />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <div className="auth">
      <Icon.LogoWhite className="logo" />
      <Tab
        panes={panes}
        className="auth__forms"
        activeIndex={activeIndex}
        onTabChange={(_, data) => setActiveIndex(data.activeIndex)}
      />
    </div>
  );
}
