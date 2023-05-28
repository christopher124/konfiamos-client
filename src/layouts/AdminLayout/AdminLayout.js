import { useState } from "react";
import { Icon } from "../../assets";
import { AdminMenu, Logout } from "../../components/Admin/AdminLayout";
import { Dropdown, Icon as IconA } from "semantic-ui-react";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import "./AdminLayout.scss";

export function AdminLayout(props) {
  const { children } = props; // hijo del componente
  const [isLeftVisible, setIsLeftVisible] = useState(true);

  const toggleLeftVisibility = () => {
    setIsLeftVisible(!isLeftVisible);
  };

  return (
    <div className="admin-layout">
      <div className={`admin-layout__left ${isLeftVisible ? "" : "hidden"}`}>
        <Icon.LogoWhite className={`logo ${isLeftVisible ? "" : "hidden"}`} />
        <AdminMenu />
      </div>
      <div className="admin-layout__right">
        <div className="admin-layout__right-header">
          <button className="toggle-left-button" onClick={toggleLeftVisibility}>
            {isLeftVisible ? <AiOutlineMenuFold /> : <AiOutlineMenuUnfold />}
          </button>

          <Dropdown icon item text="Opciones">
            <Dropdown.Menu>
              <Dropdown.Item>English</Dropdown.Item>
              <Dropdown.Item>
                <IconA name="user" />
                Mi cuenta
              </Dropdown.Item>
              <Logout />
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="admin-layout__right-content">{children}</div>
      </div>
    </div>
  );
}
