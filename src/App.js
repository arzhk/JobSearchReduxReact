import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import MainSearch from "./components/MainSearch";
import JobDetails from "./components/JobDetails";
import Favourites from "./components/Favourites";

function App() {
  return (
    <Router>
      <Route path="/" component={NavBar} />
      <Route path="/" exact>
        <MainSearch />
      </Route>
      <Switch>
        <Route path="/favourites" exact component={Favourites} />
        <Route path="/:id" component={JobDetails} />
      </Switch>
    </Router>
  );
}

export default App;
