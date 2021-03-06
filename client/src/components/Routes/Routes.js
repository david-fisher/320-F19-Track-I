import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "../../pages/Home/Home";
import About from "../../pages/About/About";
import Dashboard from "../../pages/Dashboard/Dashboard";
import Gallery from "../../pages/Gallery/Gallery";
import Login from "../../pages/Login/Login";
import Profile from "../../pages/Profile/Profile";
import Observations from "../../pages/Observations/Observations";
import AI from "../../pages/AI/AI";
import Data from "../../pages/Data/Data";
import Orchards from "../../pages/Orchards/Orchards";
import Register from "../../pages/Register/Register";
import Predict from "../../pages/Predict/Predict";
import Annotate from "../../pages/Annotate/Annotate";
import NotFound from "../../pages/NotFound/NotFound";
import Forgot from "../../pages/Forgot/Forgot";
import Announcements from "../../pages/Announcements/Announcements";
import AccountInfo from "../../pages/AccountInfo/AccountInfo";
import Contacts from "../../pages/Contacts/Contacts";
import UpdatePass from "../../pages/UpdatePass/UpdatePass";
import UploadData from "../../pages/UploadData/UploadData";
import UnauthenticatedRoute from "./UnauthenticatedRoute";
import AuthenticatedRoute from "./AuthenticatedRoute";
import AddAnnouncement from "../../pages/AddAnnouncement/AddAnnouncement";

export default function Routes() {
  return (
    <Switch>
      <Redirect exact from="/" to="/home" />
      <Route path="/home" exact component={Home} />
      <Route path="/about" exact component={About} />
      <Route path="/gallery" exact component={Gallery} />>
      <AuthenticatedRoute path="/dashboard" exact component={Dashboard} />
      <UnauthenticatedRoute path="/login" exact component={Login} />
      <AuthenticatedRoute path="/profile" exact component={Profile} />
      <Route path="/ask-ai" exact component={AI} />
      <Route path="/observations" exact component={Observations} />
      <Route path="/data" exact component={Data} />
      <Route path="/orchards" exact component={Orchards} />
      <Route path="/register" exact component={Register} />
      <AuthenticatedRoute path="/annotate" exact component={Annotate} />
      <AuthenticatedRoute path="/predict" exact component={Predict} />
      <Route path="/forgot" exact component={Forgot} />
      <Route path="/announcements" exact component={Announcements} />
      <Route path="/addannouncement" exact component={AddAnnouncement} />
      <Route path="/accountinfo" exact component={AccountInfo} />
      <Route path="/contacts" exact component={Contacts} />
      <Route path="/updatepass" exact component={UpdatePass} />
      <Route path="/uploaddata" exact component={UploadData} />
      <Route component={NotFound} />
    </Switch>
  );
}
