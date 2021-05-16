import { useHistory } from "react-router-dom";

let Logout = (req, res) => {
  let history = useHistory();

  sessionStorage.clear();
  history.push({ pathname: "/login" });

  return <></>;
};

export default Logout;
