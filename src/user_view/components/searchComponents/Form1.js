import { useState } from "react";

import "./form.css";

let Form1 = () => {
  let [hospitalName, setHospitalName] = useState("");

  let handleChange = (e) => {
    setHospitalName(e.target.value);
  };

  let hospitalNameHandler = async (e) => {
    e.preventDefault();

    try {
      const result = await fetch("http://localhost:8080/hospital-details");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={hospitalNameHandler} className="form1">
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
            <option value="option">Option</option>
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
