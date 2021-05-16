import { Link } from "react-router-dom";

import "./Navbar.css";

let Navbar = () => {
  let toggleMenu = (e) => {
    let target = document.getElementById("sidebar").classList;
    target.toggle("activeSidebar");
  };
  return (
    <div className="adminNavbar">
      <Link to="/" className="title">
        Covid Help Disk
      </Link>

      <div className="adminNavlinks">
        <Link to="/logout" className="adminNavbarLi">
          Logout
        </Link>
        <div className="menuBar">
          <img
            src={process.env.PUBLIC_URL + "images/covid.png"}
            alt="menu bar"
            className="menubarImage"
            onClick={toggleMenu}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
