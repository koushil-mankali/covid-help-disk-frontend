import Card from "./Card";
import Loader from "../../../UI/Loader";

import "./StatesData.css";

let StatesData = (props) => {
  return (
    <div className="stateData">
      <div className="statesTtl">States Data:</div>
      <div className="statesBdy">
        {props?.loader ? (
          <Loader />
        ) : (
          props.regional?.map((value) => (
            <Card
              state={value.state}
              ruralHospitals={value.ruralHospitals}
              ruralBeds={value.ruralBeds}
              urbanHospitals={value.urbanHospitals}
              urbanBeds={value.urbanBeds}
              totalHospitals={value.totalHospitals}
              totalBeds={value.totalBeds}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default StatesData;
