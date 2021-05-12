import { useState, useEffect } from "react";

import Navbar from "../Navbar";
import Footer from "../Footer";
import BedsStats from "./BedsStats";
import StatesData from "./StatesData";

import "./Beds.css";

let Beds = () => {
  let [state, setState] = useState();
  let [regional, setRegional] = useState();
  let [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(true);
    fetch("https://api.rootnet.in/covid19-in/hospitals/beds")
      .then((result) => result.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          let date = result.lastRefreshed;
          date = new Date(date);
          let dateString = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
          let regions = result.data.summary;
          let regional = result.data.regional;
          setState({ dateString, regions });
          setRegional(regional);
        }
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });
  }, []);

  return (
    <div className="beds">
      <Navbar />
      <BedsStats loader={loader} state={state} />
      <StatesData regional={regional} loader={loader} />
      <Footer />
    </div>
  );
};

export default Beds;
