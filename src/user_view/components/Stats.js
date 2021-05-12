import { useState, useEffect } from "react";
import "./stats.css";

import Loader from "../../UI/Loader";

let Stats = () => {
  let [state, setState] = useState();
  let [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(true);
    fetch("https://api.rootnet.in/covid19-in/stats/latest")
      .then((result) => result.json())
      .then((result) => {
        if (result.success) {
          let data = result.data.summary;
          let date = result.lastRefreshed;
          date = new Date(date);
          let dateString = `Last Updated: ${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
          let totalCases = data.total;
          let ConfirmedCases = data.confirmedCasesIndian;
          let ConfirmedCasesForeign = data.confirmedCasesForeign;
          let deaths = data.deaths;
          let discharged = data.discharged;
          setState({
            dateString,
            totalCases,
            ConfirmedCases,
            ConfirmedCasesForeign,
            deaths,
            discharged,
          });
          return setLoader(false);
        }
        setLoader(true);
        throw new Error("No Data Found!");
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });
  }, []);

  return (
    <div className='statBox'>
      {loader ? (
        <div className='centered'>
          <Loader />
        </div>
      ) : (
        <div>
          <div className="stats">
            <p className="title">Stats</p>
            <p className="date">{state ? state.dateString : ""}</p>
          </div>
          <div className="statsBdy">
            <div className="statsBdyRow">
              <div className="statsRow">
                <p className="statsTitle"> Total Cases: </p>
                <p className="statsCount">{state ? state.totalCases : ""}</p>
              </div>
              <div className="statsRow">
                <p className="statsTitle"> Confirmed Cases: </p>
                <p className="statsCount">
                  {state ? state.ConfirmedCases : ""}
                </p>
              </div>
            </div>
            <div className="statsBdyRow">
              <div className="statsRow">
                <p className="statsTitle"> Discharged: </p>
                <p className="statsCount">{state ? state.discharged : ""}</p>
              </div>
              <div className="statsRow">
                <p className="statsTitle"> Deaths: </p>
                <p className="statsCount">{state ? state.deaths : ""}</p>
              </div>
            </div>
            <div className="statsBdyRow">
              <div className="statsRow">
                <p className="statsTitle"> Confirmed Foreign Cases: </p>
                <p className="statsCount">
                  {state ? state.ConfirmedCasesForeign : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stats;
