import { useState } from "react";

import "./form.css";

let Form1 = () => {
  let [state, setState] = useState("");
  let [district, setDistrict] = useState("");

  let handleState = (e) => {
    setState(e.target.value);
  };
  let handleDistrict = (e) => {
    setDistrict(e.target.value);
  };

  let hospitalNameHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch("");
    } catch (error) {
      console.log(error);
    }
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
            <option value="option">Option</option>
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
