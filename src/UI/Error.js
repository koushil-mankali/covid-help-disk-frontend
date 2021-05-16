import { Link } from "react-router-dom";

import Navbar from "../user_view/components/Navbar";

import "./Error.css";

let Error = (req, res) => {
  return (
    <div className="error">
      <Navbar />
      <div className="errBdy">
        <p>Error Page Not Found!</p>
        <Link to="/">Go to Home Page</Link>
      </div>
    </div>
  );
};

export default Error;
