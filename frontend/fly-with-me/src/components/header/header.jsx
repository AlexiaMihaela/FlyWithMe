// Header.jsx
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
import "./Header.css";
import { IoSettingsSharp } from "react-icons/io5";

const Header = () => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  return (
    <header className="header">
      <div className="header-title">Fly with me</div>

      <div className="header-center">
        {isAdmin ? (
          <>
            <Button component={Link} to="/admin" variant="light">
              Flights
            </Button>
            <Button component={Link} to="/requests" variant="light">
              Requests
            </Button>
          </>
        ) : (
          <>
            <Button component={Link} to="/user" variant="light">
              Home
            </Button>
            <Button component={Link} to="/reservations" variant="light">
              Reservations
            </Button>
          </>
        )}
      </div>

      <div className="header-right">
        <Button variant="subtle">
         <IoSettingsSharp/>
        </Button>
      </div>
    </header>
  );
};

export default Header;
