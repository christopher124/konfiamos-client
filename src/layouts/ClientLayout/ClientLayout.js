import { TopBar } from "../../components/web/TopBar";
import "./ClientLayout.scss";

export function ClientLayout(props) {
  const { children } = props;
  return (
    <div>
      {/* Navigation */}

      <div>
        <TopBar />
      </div>
      {/* Navigation - final */}

      {/* Contenido */}

      {children}

      {/* Contenido - final */}

      {/* Footer */}
      <div></div>
    </div>
  );
}
