import { useState } from "react";
import { Icon } from "../../assets";
import { AdminMenu } from "../../components/Admin/AdminLayout";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import "./AdminLayout.scss";

export function AdminLayout(props) {
  const { children } = props; // hijo del componente
  const [isLeftVisible, setIsLeftVisible] = useState(true);

  const toggleLeftVisibility = () => {
    setIsLeftVisible(!isLeftVisible);
  };

  return (
    <div className={`admin-layout ${isLeftVisible ? "" : "left-hidden"}`}>
      <div className={`admin-layout__left ${isLeftVisible ? "" : "hidden"}`}>
        <Icon.LogoWhite className="logo" />
        <AdminMenu />
      </div>
      <div className="admin-layout__right">
        <div className="admin-layout__right-header">
          <button className="toggle-left-button" onClick={toggleLeftVisibility}>
            {isLeftVisible ? <AiOutlineMenuFold /> : <AiOutlineMenuUnfold />}
          </button>
          <span>LOGOUT</span>
        </div>
        <div className="admin-layout__right-content">{children}</div>
      </div>
    </div>
  );
}
