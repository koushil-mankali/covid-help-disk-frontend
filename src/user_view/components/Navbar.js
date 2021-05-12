import { NavLink } from "react-router-dom";

import "./Navbar.css";

let Navbar = () => {
  return (
    <div className="navbar">
      <NavLink to="/" className="title">
        Covid Help Disk
      </NavLink>
      <div className="navlinks">
        <NavLink to="/beds" activeClassName="active" className="navbarLi">
          Beds
        </NavLink>
        <NavLink
          to="/medical-colleges"
          activeClassName="active"
          className="navbarLi"
        >
          Medical Colleges
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
