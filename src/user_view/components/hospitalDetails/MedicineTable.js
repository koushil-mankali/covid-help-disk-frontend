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
          <tr className="btab">
            <td>Ramdisver</td>
            <td>₹ 10</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MedicineTable;
