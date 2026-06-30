import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="app-header">
      <div
        className="app-logo"
        onClick={() => navigate("/")}
      >
        TDR Smart Assistant
      </div>
    </header>
  );
}

export default Header;