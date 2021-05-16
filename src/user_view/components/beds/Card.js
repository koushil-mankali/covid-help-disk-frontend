import "./Card.css";

let Card = (props) => {
  return (
    <div className="cardState">
      <div className="cardTtl">{props?.state}</div>
      <div className="cardBdy">
        <p className="cardP">Rural Hospitals : {props?.ruralHospitals}</p>
        <p className="cardP">Rural Beds : {props?.ruralBeds}</p>
        <p className="cardP">Urban Hospitals : {props?.urbanHospitals}</p>
        <p className="cardP">Urban Beds : {props?.urbanBeds}</p>
        <p className="cardP">Total Hospitals : {props?.totalHospitals}</p>
        <p className="cardP">Total Beds : {props?.totalBeds}</p>
      </div>
    </div>
  );
};

export default Card;
