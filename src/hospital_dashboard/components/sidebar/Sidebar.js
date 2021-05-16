import { Link } from "react-router-dom";

import "./Sidebar.css";

let Sidebar = (req, res) => {
  return (
    <aside className="sidebar" id="sidebar">
      <Link className="sidebarEle" to="/dashboard">
        Dashboard
      </Link>
      <Link className="sidebarEle" to="/hospital-info">
        Hospital Info
      </Link>
      <Link className="sidebarEle" to="/update-details">
        Update Details
      </Link>
      <Link className="sidebarEle" to="/account-info">
        Account Info
      </Link>
    </aside>
  );
};

export default Sidebar;
