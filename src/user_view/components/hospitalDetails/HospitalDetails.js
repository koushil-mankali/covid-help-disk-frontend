import { useState, useEffect } from "react";

import Navbar from "../Navbar";
import Footer from "../Footer";
import Card from "./Card";
import IntroBox from "./IntroBox";
import MedicineTable from "./MedicineTable";
import { useHistory, useLocation } from "react-router-dom";

import "./HospitalDetails.css";

import { Helmet } from "react-helmet";

const TITLE = "Hospital Details";

let HospitalDetails = () => {
  const history = useHistory();
  const location = useLocation();
  const [hospitalData, setHospitalData] = useState();
  const [loader, setLoader] = useState(true);

  if (location.state?.data === undefined) {
    history.push({
      pathname: "/",
    });
  }

  useEffect(() => {
    setLoader(true);
    setHospitalData(location.state?.data);
    setLoader(false);
  }, [location]);

  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
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
