import Navbar from "./Navbar";
import Footer from "../../user_view/components/Footer";
import Sidebar from "./sidebar/Sidebar";

import { Helmet } from "react-helmet";

const TITLE = "Account Info";

let AccountInfo = () => {
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
            <h1>Account Info</h1>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AccountInfo;
