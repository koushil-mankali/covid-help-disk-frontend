import { useState, useEffect } from "react";

import Loader from "../../../UI/Loader";
import "./BedsStats.css";

let BedsStats = () => {
  let [state, setState] = useState();
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
          setState({ dateString, regions });
        }
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });
  }, []);

  return (
    <div className="BedsStats">
      {loader ? (
        <Loader />
      ) : (
        <div className="ouuterBox">
          <div className="innerBox1">
            <h3 className="BedsTitle">India:</h3>
            <p>Date: {state ? state.dateString : ""}</p>
          </div>
          <div className="innerBox2">
            <div>
              <p>RuralHospitals : {state.regions.ruralHospitals}</p>
              <p>RuralBeds : {state.regions.ruralBeds}</p>
            </div>
            <div>
              <p>UrbanHospitals : {state.regions.urbanHospitals}</p>
              <p>UrbanBeds : {state.regions.urbanBeds}</p>
            </div>
            <div>
              <p>TotalHospitals : {state.regions.totalHospitals}</p>
              <p>TotalBeds : {state.regions.totalBeds}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BedsStats;
