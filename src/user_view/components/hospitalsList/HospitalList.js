import Navbar from "../Navbar";
import Footer from "../Footer";
import Button from "../../../UI/Button";

import "./HospitalList.css";

let HospitalList = () => {
  let filterHandlerGovt = (e) => {};

  let filterHandlerPrivate = (e) => {};

  return (
    <>
      <Navbar />
      <div className="hospitalList">
        <p className="introTab">
          Details of Hospitals in {"State"} state {"District"} district
        </p>
        <div className="filtersTab">
          <div></div>
          <div className="filters">
            Filters: &nbsp;{" "}
            <Button onClick={filterHandlerGovt} className="btnHost">
              Govt
            </Button>
            <Button onClick={filterHandlerPrivate} className="btnHost">
              Private
            </Button>
          </div>
        </div>
        <div className="tableBox">
          <table className="table">
            <thead>
              <tr className="htab">
                <th className="row">Hospital Name</th>
                <th className="row">
                  Beds
                  <tr className="trr">
                    <td className="hhsttl1">Total</td>
                    <td className="hhsttl2">Occupied</td>
                    <td className="hhsttl3">avaliable</td>
                  </tr>
                </th>
                <th className="row">Oxygen</th>
              </tr>
            </thead>
            <tbody>
              <tr className="btab">
                <td>Sharada</td>
                <tr className="trr">
                  <td className="tbb">20</td>
                  <td className="tbb">18</td>
                  <td className="tbb">2</td>
                </tr>
                <td>avaliable</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HospitalList;
