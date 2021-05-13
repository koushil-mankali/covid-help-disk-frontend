import "./card.css";

let Card = (props) => {
  let data;
  if (!props.loader) {
    data = props.hospitalData.map((val) => (
      <div className="card">
        <h3 className="ttl">Total Beds: {val.totalBeds}</h3>
        <p className="bds">Occupied Beds: {val.occupiedBeds}</p>
        <p className="avbds">Avaliable Beds: {val.avaliableBeds}</p>
        <p className="avbds">oxygen left for : {val.oxy}</p>
      </div>
    ));
  }
  return <>{props.loader ? "loading..." : data}</>;
};

export default Card;
