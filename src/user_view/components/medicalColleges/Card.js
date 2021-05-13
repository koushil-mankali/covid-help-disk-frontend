import "./Card.css";

let Card = (props) => {
  return (
    <div className="cardState">
      <div className="cardTtl">{props?.name}</div>
      <div className="cardBdy">
        <p className="cardP">City : {props?.city}</p>
        <p className="cardP">Type : {props?.ownership}</p>
        <p className="cardP">Admission Capacity : {props?.admissionCapacity}</p>
        <p className="cardP">Hospital Beds : {props?.hospitalBeds}</p>
      </div>
    </div>
  );
};

export default Card;
