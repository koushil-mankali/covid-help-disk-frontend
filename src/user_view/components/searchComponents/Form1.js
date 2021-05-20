import { useState } from "react";
import { useHistory } from "react-router-dom";

import "./form.css";

let Form1 = (props) => {
  const history = useHistory();
  let [hospitalName, setHospitalName] = useState("");
  let [message, setMessage] = useState({});

  let handleChange = (e) => {
    setHospitalName(e.target.value);
  };

  let hospitalNameHandler = (e) => {
    e.preventDefault();

    try {
      fetch("https://chd.koushilmankali.com/hospital-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hospitalName }),
      })
        .then((result) => result.json())
        .then((result) => {
          if (result.result === "valfail") {
            return setMessage({
              result: false,
              message: result.errors[0].msg,
            });
          }
          history.push({
            pathname: "/hospital-details",
            state: { data: result },
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  let css;

  if (message?.result) {
    css = "messageBoxSuccess";
  } else if (message?.result === false) {
    css = "messageBoxFail";
  } else {
    css = null;
  }

  return (
    <form onSubmit={hospitalNameHandler} className="form1">
      <div className={css}>{message.message}</div>
      <div>
        <label htmlFor="hname">
          Hospital Name: &nbsp;&nbsp;
          <select
            className="input"
            value={hospitalName}
            onChange={handleChange}
            id="hname"
            name="hname"
          >
            <option value="">Select</option>
            {props?.loader ? (
              <option>Loading...</option>
            ) : (
              props?.hospitalData?.map((value) => (
                <option value={value.hospitalName}>{value.hospitalName}</option>
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

export default Form1;
