import { NavLink } from "react-router-dom";

import "./UserNavbar.css";

let Navbar = () => {
  let toggleMenu = (e) => {
    let target = e.target.parentElement.parentElement.parentElement.classList;
    let target2 = e.target.parentElement.parentElement.classList;
    let target3 = document.getElementById("navbar2");
    target.toggle("navbarR");
    target2.remove("active");
    target3.classList.toggle("navlinksR");
    target3.classList.toggle("navlinks1");
  };

  return (
    <div className="navbar">
      <NavLink to="/" className="title cttl">
        Covid Help Disk
        <div className="menuBar">
          <img
            src={process.env.PUBLIC_URL + "images/covid.png"}
            alt="menu bar"
            className="menubarImage"
            onClick={toggleMenu}
          />
        </div>
      </NavLink>

      <div className="navlinks1" id="navbar2">
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
        {sessionStorage.getItem("isLogin") ? (
          <NavLink to="/logout" activeClassName="active" className="navbarLi">
            Logout
          </NavLink>
        ) : null}
      </div>
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
        {sessionStorage.getItem("isLogin") ? (
          <NavLink to="/logout" activeClassName="active" className="navbarLi">
            Logout
          </NavLink>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
