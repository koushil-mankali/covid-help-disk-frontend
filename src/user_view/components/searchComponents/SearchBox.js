import Form1 from "./Form1";
import Form2 from "./Form2";

import "./searchBox.css";

let SearchBox = () => {
  return (
    <>
      <h2 className="h2">Search Hospitals:</h2>
      <div className="searchComps">
        <Form1 />
        <Form2 />
      </div>
    </>
  );
};

export default SearchBox;
