import "./Header.css";
import { IoIosSettings } from "react-icons/io";

const Header = () => {
  return (
    <header className="header">
      <div className="header-title">Fly with me</div>

      <div className="header-center">
        <button className="nav-button">Home</button>
        <button className="nav-button">Reservations</button>
      </div>

      <div className="header-right">
        <button className="settings-button">
        <IoIosSettings />
        </button>
      </div>
    </header>
  );
};

export default Header;
