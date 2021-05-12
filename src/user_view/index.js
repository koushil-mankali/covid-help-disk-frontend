import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Intro from "./components/Intro";
import Stats from "./components/Stats";
import AddHospital from "./components/AddHospital";
import SearchBox from "../user_view/components/searchComponents/SearchBox";

import "./index.css";

let UserView = () => {
  return (
    <div className="main">
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
