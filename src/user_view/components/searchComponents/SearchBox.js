import { useState, useEffect } from "react";

import Form1 from "./Form1";
import Form2 from "./Form2";

import "./searchBox.css";

let SearchBox = () => {
  let [hospitalData, setHospitalData] = useState();
  let [stateNames, setStateNames] = useState();
  let [loader, setLoader] = useState(true);
  let [loader2, setLoader2] = useState(true);

  useEffect(() => {
    setLoader(true);
    fetch("https://chd.koushilmankali.com/get-data")
      .then((result) => result.json())
      .then((result) => {
        setHospitalData(result);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setLoader2(true);
    fetch("https://chd.koushilmankali.com/get-state")
      .then((result) => result.json())
      .then((result) => {
        setStateNames(result);
        setLoader2(false);
      })
      .catch((err) => {
        setLoader2(false);
        console.log(err);
      });
  }, []);

  return (
    <>
      <h2 className="h2">Search Hospitals:</h2>
      <div className="searchComps">
        <Form1 hospitalData={hospitalData} loader={loader} />
        <Form2 stateNames={stateNames} loader={loader2} />
      </div>
    </>
  );
};

export default SearchBox;
