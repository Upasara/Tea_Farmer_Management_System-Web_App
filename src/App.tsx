import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { RouteName } from "./RouteName";
import "./components/assets/css/home.css";
import "./components/assets/css/bootstrap.min.css";
import "./components/assets/css/media.css";
import "./components/assets/css/icomoon.css";
import AdminNavBar from "./components/admin/AdminNavbar";
import AdminUserManagement from "./components/admin/UserManagement";
import AdminClientReport from "./components/admin/ClientReport";
import AdminAddFetures from "./components/admin/AddFeaturs";
import Login from "./components/common/Login";
import { AuthService } from "./components/servises/AuthService";

const App: React.FC = () => {
  const token = AuthService.getToken();

  return (
    <Router>
      <Switch>
        <Route path="/" exact={true}  >
          <Login />
        </Route>
        {token &&
          <Router>
            <AdminNavBar />
            <Switch>
              <Route path={RouteName.ADMIN_DASHBOARD} exact={true}  >
                <AdminUserManagement />
              </Route>
              <Route path={RouteName.ADMIN_USER_COMPLAINTS}  >
                <AdminClientReport />
              </Route>
              <Route path={RouteName.ADMIN_COMPANY_UPDATES}  >
                <AdminAddFetures />
              </Route>
            </Switch>
          </Router>
        }
      </Switch>
    </Router>
  );
};
export default App;
