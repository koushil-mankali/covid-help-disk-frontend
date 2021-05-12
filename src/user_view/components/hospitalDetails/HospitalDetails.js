import Navbar from "../Navbar";
import Footer from "../Footer";
import Card from "./Card";
import IntroBox from "./IntroBox";
import MedicineTable from "./MedicineTable";

import "./HospitalDetails.css";

let HospitalDetails = () => {
  return (
    <>
      <Navbar />
      <IntroBox />
      <Card />
      <MedicineTable />
      <Footer />
    </>
  );
};

export default HospitalDetails;
