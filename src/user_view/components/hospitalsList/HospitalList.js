import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

import Navbar from "../Navbar";
import Footer from "../Footer";
import Button from "../../../UI/Button";
import Loader from "../../../UI/Loader";

import "./HospitalList.css";

import { Helmet } from "react-helmet";

const TITLE = "Hospitals List";

let HospitalList = (props) => {
  const history = useHistory();
  const location = useLocation();

  let [data, setData] = useState();
  let [isLoading, setLoading] = useState(true);

  let state = location?.data?.state;
  let district = location?.data?.district;

  if (!state && !district) {
    history.push({
      pathname: "/",
    });
  }

  useEffect(() => {
    setLoading(true);
    // fetch("https://chd.koushilmankali.com/get-hospital-data", {
    fetch("https://covidhd.onrender.com/get-hospital-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        state: state,
        district: district,
      }),
    })
      .then((result) => result.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [state, district]);

  let filterHandlerGovt = (e) => {
    setLoading(true);
    // fetch("https://chd.koushilmankali.com/filter-data", {
    fetch("https://covidhd.onrender.com/filter-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        state: state,
        district: district,
        data: "govt",
      }),
    })
      .then((result) => result.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  let filterHandlerPrivate = (e) => {
    setLoading(true);
    // fetch("https://chd.koushilmankali.com/filter-data", {
    fetch("https://covidhd.onrender.com/filter-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        state: state,
        district: district,
        data: "private",
      }),
    })
      .then((result) => result.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
    setLoading(false);
  };

  return (
    <div className="main">
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <Navbar />
      <div className="hospitalList">
        <p className="introTab">
          Details of Hospitals in {state} state &nbsp;
          {district} district
        </p>
        <div className="filtersTab">
          <div></div>
          <div className="filters">
            Filters: &nbsp;
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
              {isLoading ? (
                <Loader />
              ) : (
                data.map((value) => (
                  <tr className="btab">
                    <td>{value.hospitalName}</td>
                    <tr className="trr">
                      <td className="tbb">{value.totalBeds}</td>
                      <td className="tbb">{value.occupiedBeds}</td>
                      <td className="tbb">{value.avaliableBeds}</td>
                    </tr>
                    <td>{value.oxygen}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="foo">
        <Footer />
      </div>
    </div>
  );
};

export default HospitalList;
