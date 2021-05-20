import { Switch, Route } from "react-router-dom";

import HospitalList from "./user_view/components/hospitalsList/HospitalList";
import HospitalDetails from "./user_view/components/hospitalDetails/HospitalDetails";
import Beds from "./user_view/components/beds/Beds";
import MedicalColleges from "./user_view/components/medicalColleges/MedicalCollege";
import UserView from "./user_view/index";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import Logout from "./auth/Logout";
import Error from "./UI/Error";

import Dashboard from "./hospital_dashboard/Dashboard";
import HospitalInfo from "./hospital_dashboard/components/Hospitalnfo";
import UpdateDeatils from "./hospital_dashboard/components/UpdateDetails";
import UpdateHospitalDetails from "./hospital_dashboard/components/updateHospitalDetails";

import "./App.css";

let App = () => {
  return (
    <>
      <Switch>
        {/* User Interface */}
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
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/logout" exact>
          <Logout />
        </Route>

        {/* Admin Interface */}

        <Route path="/dashboard" exact>
          <Dashboard />
        </Route>
        <Route path="/hospital-info" exact>
          <HospitalInfo />
        </Route>
        <Route path="/update-details" exact>
          <UpdateDeatils />
        </Route>
        <Route path="/update-hospital-details" exact>
          <UpdateHospitalDetails />
        </Route>

        <Route>
          <Error />
        </Route>
      </Switch>
    </>
  );
};

export default App;
