import { useHistory } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "../user_view/components/Footer";
import Sidebar from "./components/sidebar/Sidebar";
import "./Dashboard.css";

import { Helmet } from "react-helmet";

const TITLE = "Dashboard";

let Dashboard = () => {
  let history = useHistory();

  let token = sessionStorage.getItem("token");

  if (!token) {
    history.push("/");
  }

  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <Navbar />
      <div className="dashBdy">
        <Sidebar />
        <div className="dashInnerBdy">
          <div className="introBox">
            <h1>Welcome to Dashboard</h1>
          </div>
          <div className="welcomeSign">
            Welcome to Covid Help Desk Hospital Management Dashboard, help us
            get updated and provide correct information about avalibilty of beds
            oxygen and medicine for the people who are in need of them in this
            pandemic situation.
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
