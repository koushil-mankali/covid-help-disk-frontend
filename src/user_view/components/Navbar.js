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
        <NavLink to="/oxygen" activeClassName="active" className="navbarLi">
          Oxygen
        </NavLink>
        <NavLink to="/medicine" activeClassName="active" className="navbarLi">
          Medicine
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
