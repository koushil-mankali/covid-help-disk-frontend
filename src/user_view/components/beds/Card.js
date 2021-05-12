import "./Card.css";

let Card = (props) => {
  return (
    <div className="cardState">
      <div className="cardTtl">{props?.state}</div>
      <div className="cardBdy">
        <p className="cardP">ruralHospitals : {props?.ruralHospitals}</p>
        <p className="cardP">ruralBeds : {props?.ruralBeds}</p>
        <p className="cardP">urbanHospitals : {props?.urbanHospitals}</p>
        <p className="cardP">urbanBeds : {props?.urbanBeds}</p>
        <p className="cardP">totalHospitals : {props?.totalHospitals}</p>
        <p className="cardP">totalBeds : {props?.totalBeds}</p>
      </div>
    </div>
  );
};

export default Card;
