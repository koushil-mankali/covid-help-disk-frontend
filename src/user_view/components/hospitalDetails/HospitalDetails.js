import { useState, useEffect } from "react";

import Navbar from "../Navbar";
import Footer from "../Footer";
import Card from "./Card";
import IntroBox from "./IntroBox";
import MedicineTable from "./MedicineTable";
import { useLocation } from "react-router-dom";

import "./HospitalDetails.css";

let HospitalDetails = () => {
  const location = useLocation();
  const [hospitalData, setHospitalData] = useState();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(true);
    setHospitalData(location.state?.data);
    setLoader(false);
  }, [location]);

  return (
    <>
      <Navbar />
      <IntroBox hospitalData={hospitalData} loader={loader} />
      <Card hospitalData={hospitalData} loader={loader} />
      <MedicineTable />
      <div className="foo">
        <Footer />
      </div>
    </>
  );
};

export default HospitalDetails;
