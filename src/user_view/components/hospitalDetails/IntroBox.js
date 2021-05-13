import "./introBox.css";

let IntroBox = (props) => {
  let data;
  if (!props.loader) {
    console.log(props.hospitalData)
    data = props.hospitalData.map((val) => (
      <div className="introBox">
        <p className="ptab">Hospital Name: {val.hospitalName}</p>
        <p className="ptab">Address: {`${val.address.state},${val.address.district},${val.address.street}`}</p>
        <p className="ptab">Contact Details: {val.contacts}</p>
      </div>
    ));
  }

  return <>{props.loader ? "loading ..." : data}</>;
};

export default IntroBox;
