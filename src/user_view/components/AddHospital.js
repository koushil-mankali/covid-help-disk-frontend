import { Link } from "react-router-dom";
import Button from "../../UI/Button";

let AddHospital = () => {
  return (
    <Button>
      <Link to="/dashboard" className="linkdiss">
        Add You'r Hospital to Our List
      </Link>
    </Button>
  );
};

export default AddHospital;
