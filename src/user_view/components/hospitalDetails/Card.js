import "./card.css";

let Card = () => {
  return (
    <div className="card">
      <h3 className="ttl">Total Beds: 20</h3>
      <p className="bds">Occupied Beds: 18</p>
      <p className="avbds">Avaliable Beds: 2</p>
      <p className="avbds">{'oxygen left for : 2hr'}</p>
    </div>
  );
};

export default Card;
