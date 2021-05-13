import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "./form.css";

let Form2 = (props) => {
  let history = useHistory();

  let [state, setState] = useState();
  let [district, setDistrict] = useState();
  let [districtData, setDistrictData] = useState();
  let [isLoading, setLoading] = useState(true);

  let handleState = (e) => {
    setState(e.target.value);
  };
  let handleDistrict = (e) => {
    setDistrict(e.target.value);
  };

  useEffect(() => {
    setLoading(true);
    if (state) {
      fetch("http://localhost:4000/get-districts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          state: state,
        }),
      })
        .then((result) => result.json())
        .then((result) => {
          setDistrictData(result);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  }, [state]);

  let hospitalNameHandler = (e) => {
    e.preventDefault();

    history.push({
      pathname: "/hospital-list",
      data: { state, district },
    });
  };

  return (
    <form onSubmit={hospitalNameHandler} className="form2">
      <div>
        <label htmlFor="sname">
          State Name: &nbsp;&nbsp;
          <select
            className="input"
            value={state}
            onChange={handleState}
            id="sname"
            name="sname"
          >
            <option value="">Select</option>
            {props.loader ? (
              <option>Loading...</option>
            ) : (
              props?.stateNames?.map((value) => (
                <option value={value} key={value}>
                  {value}
                </option>
              ))
            )}
          </select>
        </label>
        <label htmlFor="dname">
          District Name: &nbsp;&nbsp;
          <select
            className="input"
            value={district}
            onChange={handleDistrict}
            id="dname"
            name="dname"
          >
            <option value="">Select</option>
            {isLoading ? (
              <option>Loading...</option>
            ) : (
              districtData.map((val) => (
                <option value={val} key={val}>
                  {val}
                </option>
              ))
            )}
          </select>
        </label>
      </div>
      <div className="frmbtn">
        <input type="submit" value="Search" className="submit" />
      </div>
    </form>
  );
};

export default Form2;
