import React from "react"
import Dashboard from "./pages/Dashboard";
import {
  Switch,
  Route,
} from "react-router-dom";
import Users from "./pages/Users";
import Event from "./pages/Event"
import Ticket from "./pages/Ticket";
import Profile from "./pages/Profile";
import Description from "./pages/Description";
import Slider from "./components/Slider";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/user" component={Users} />
        <Route exact path="/event" component={Event} />
        <Route exact path="/ticket" component={Ticket}/>
        <Route exact path="/profile/:userId" component={Profile}/>
        <Route exact path="/event-Description/:eventId" component={Description}/>
        <Route exact path="/slider" component={Slider}/>
      </Switch>
    </>
  );
}

export default App;
