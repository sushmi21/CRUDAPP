import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";
import AddAirport from "./components/AddAirport";
import UpdateAirport from "./components/UpdateAirport";
import AirportList from "./components/AirportList";
import AddAirline from "./components/AddAirline";
import AirlineList from "./components/AirlineList";
import UpdateAirline from "./components/UpdateAirline";
import "./App.css";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        {/* Wrap the Children inside layout component to add NavBar in all pages */}
        <Layout>
          <Switch>
            <Route exact path="/" component={AddAirport} />
            <Route path="/addairport" component={AddAirport} />
            <Route path="/updateairport/:id" component={UpdateAirport} />
            <Route path="/airports" component={AirportList} />
            <Route path="/addairline" component={AddAirline} />
            <Route path="/updateairline/:id" component={UpdateAirline} />
            <Route path="/airlines" component={AirlineList} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </div>
  );
};

export default App;
