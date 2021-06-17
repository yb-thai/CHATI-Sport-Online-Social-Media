import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import App from "./App";
import Home from "./components/Home/HomePage";
import EventPage from "./components/Event/EventPage";
import Profile from "./components/Profile/Profile";
import Status from "./components/Status/Statuses";
import NotFound from "./NotFound";
import StatusScreen from "./components/Status/StatusScreen";
import Login from "./components/Login/login";
import Register from "./components/Login/register";
import EditProfile from "./components/Profile/EditProfile";

// whatever page we need to link, this is the router

const Root = (props) => {
  const ProtectedRoute = ({ component: Comp, path, ...rest }) => {
    return (
      <Route
        path={path}
        {...rest}
        render={(props) => {
          return localStorage.getItem("token") != null ? (
            <Comp {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  prevLocation: path,
                  error: "You need to login before using the website!",
                },
              }}
            />
          );
        }}
      />
    );
  };

  return (
    <Router>
      <App>
        <Switch>
          <ProtectedRoute exact path="/" component={EventPage} />
          <ProtectedRoute path="/Profile" component={Profile} />
          <ProtectedRoute path="/status" component={Status} />
          <ProtectedRoute path="/UserStatus/:id/" component={StatusScreen} />
          <ProtectedRoute path="/editprofile" component={EditProfile} />
          <Route path="/Login" component={Login} />
          <Route path="/Register" component={Register} />
          <Route path="*" component={NotFound} />
        </Switch>
      </App>
    </Router>
  );
};

export default Root;
