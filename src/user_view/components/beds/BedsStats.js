import Loader from "../../../UI/Loader";
import "./BedsStats.css";

let BedsStats = (props) => {
  let loader = props.loader;
  let state = props.state;

  return (
    <div className="BedsStats">
      {loader ? (
        <Loader />
      ) : (
        <div className="ouuterBox">
          <div className="innerBox1">
            <h3 className="BedsTitle">India:</h3>
            <p>Date: {state ? state.dateString : ""}</p>
          </div>
          <div className="innerBox2">
            <div>
              <p>RuralHospitals : {state.regions.ruralHospitals}</p>
              <p>RuralBeds : {state.regions.ruralBeds}</p>
            </div>
            <div>
              <p>UrbanHospitals : {state.regions.urbanHospitals}</p>
              <p>UrbanBeds : {state.regions.urbanBeds}</p>
            </div>
            <div>
              <p>TotalHospitals : {state.regions.totalHospitals}</p>
              <p>TotalBeds : {state.regions.totalBeds}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BedsStats;
