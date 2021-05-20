import "./MedicineTable.css";

let MedicineTable = (props) => {
  return (
    <div className="tableBox">
      <table className="table">
        <thead>
          <tr className="htab">
            <th className="row">Medicine Name</th>
            <th className="row">Price ₹</th>
          </tr>
        </thead>
        <tbody>
          {props.hospitalData?.map((val) =>
            val.medicineDetails.map((val) => (
              <tr className="btab">
                <td>{val.name}</td>
                <td>₹ {val.price}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MedicineTable;
