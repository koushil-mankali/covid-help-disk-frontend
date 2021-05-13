import { Switch, Route } from "react-router-dom";

import HospitalList from "./user_view/components/hospitalsList/HospitalList";
import HospitalDetails from "./user_view/components/hospitalDetails/HospitalDetails";
import Beds from "./user_view/components/beds/Beds";
import MedicalColleges from "./user_view/components/medicalColleges/MedicalCollege";
import UserView from "./user_view/index";
import "./App.css";

let App = () => {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <UserView />
        </Route>
        <Route path="/beds" exact>
          <Beds />
        </Route>
        <Route path="/medical-colleges" exact>
          <MedicalColleges />
        </Route>
        <Route path="/hospital-list" exact>
          <HospitalList />
        </Route>
        <Route path="/hospital-details" exact>
          <HospitalDetails />
        </Route>
      </Switch>
    </>
  );
};

export default App;
