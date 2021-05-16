import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Intro from "./components/Intro";
import Stats from "./components/Stats";
import AddHospital from "./components/AddHospital";
import SearchBox from "../user_view/components/searchComponents/SearchBox";

import "./index.css";

import { Helmet } from "react-helmet";

const TITLE = "Covid Help Disk";

let UserView = () => {
  return (
    <div className="main">
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <Navbar />
      <div className="box1">
        <Intro />
        <Stats />
      </div>
      <div className="centered">
        <AddHospital />
      </div>
      <div className="searchForms">
        <SearchBox />
      </div>
      <div className="foo">
        <Footer />
      </div>
    </div>
  );
};

export default UserView;
