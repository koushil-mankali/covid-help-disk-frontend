import Navbar from "./components/Navbar";
import Footer from "../user_view/components/Footer";
import Sidebar from "./components/sidebar/Sidebar";
import "./Dashboard.css";

import { Helmet } from "react-helmet";

const TITLE = "Dashboard";

let Dashboard = () => {


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
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
