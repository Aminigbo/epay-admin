import "./App.css";
import store from "./redux/store/index";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import Home from "./pages/feeds";
import Login from "./pages/login";
import Reset from "./pages/reset_pwd";
import Create from "./pages/create";
import Register from "./pages/register";
import Create_giveaway from "./pages/create-giveaway";
import Create_event from "./pages/create-event"
import "bootstrap/dist/css/bootstrap.min.css";
import Tour from "./pages/tour.js";
import Events from "./pages/events.js";
import Touring from "./pages/touring.js";
import Account from "./pages/account.js";
import Setschool from "./pages/setschool.js";
import Topup from "./components/topup";
import Withdraw from "./components/withdraw";
// import Otp from "./components/otp"
import Giveaway from "./pages/giveaway";
import Terms from "./components/tc";
import Responsible from "./components/responsible";
import Updateprofile from "./pages/profileupdate";
import Buz from "./pages/buz";
import Marketproducts from "./pages/marketproducts";
import Listmart from "./pages/marketlist";
import CASHBACK from "./pages/cashback";
import Create_cb from "./pages/createcashback";
import Nonstudentfeeds from "./components/nonstudentfeeds";
import Requestbuz from "./pages/requestBuz";
import Reactions from "./pages/reactions";
import History from "./pages/history";
import Notification from "./components/notification";
import Lock from "./components/lock";
import Buzzpay from "./components/buzzpay";
import Reqresponse from "./pages/req-response";
import Otp from "./pages/otp";
import CbHistory from "./pages/cbHistory";
import TopupHistory from "./pages/topupHistory";
import BuzzHistory from "./pages/buzzHistory";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Scan from "./components/qrscan";
import Splash from "./pages/spash"
import Scantopay from "./pages/scanpayHistory"

import Index from "./pages/home"
export default function App() {
  return (
    <Provider store={store().store}>
      <PersistGate loading={null} persistor={store().persistor}>
        <Router>
          <div className="body">
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/splash">
                <Splash />
              </Route>
              <Route path="/reset">
                <Reset />
              </Route>
              <Route path="/create">
                <Create />
              </Route>
              <Route path="/create-giveaway">
                <Create_giveaway />
              </Route>
              <Route path="/create-event">
                <Create_event />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/topup">
                <Topup />
              </Route>
              <Route path="/withdraw">
                <Withdraw />
              </Route>
              <Route path="/otp/:phone">
                <Otp />
              </Route>
              <Route path="/giveaway">
                <Giveaway />
              </Route>
              {/*  */}
              <Route path="/cb">
                <Nonstudentfeeds />
              </Route>
              <Route path="/otp">
                <Otp />
              </Route>
              <Route path="/nonstudentfeed">
                <Nonstudentfeeds />
              </Route>{" "}
              <Route path="/history">
                <CbHistory />
              </Route>
              <Route path="/topuphistory">
                <TopupHistory />
              </Route>
              <Route path="/buzzhistory">
                <BuzzHistory />
              </Route>
              <Route path="/notification">
                <Notification />
              </Route>
              <Route path="/lockout">
                <Lock />
              </Route>
              <Route path="/buzzpay">
                <Buzzpay />
              </Route>
              {/*  */}
              {/* admin view users  AdminUsers*/}
              <Route path="/events">
                <Events />
              </Route>
              <Route path="/profile/:profileId/:userId">
                <Account />
              </Route>
              <Route path="/request">
                <Requestbuz />
              </Route>
              <Route path="/listmart">
                <Listmart />
              </Route>
              <Route path="/student-cashback">
                <CASHBACK />
                {/* <Buzzpay /> */}
              </Route>
              {/* Reqresponse */}
              <Route path="/req-response">
                <Reqresponse />
              </Route>
              <Route path="/cashback-create">
                <Create_cb />
              </Route>
              <Route path="/market/:marketID">
                <Marketproducts />
              </Route>
              <Route path="/tour">
                <Tour />
              </Route>
              <Route path="/touring/:school">
                <Touring />
              </Route>
              <Route path="/account/:userId">
                <Account />
              </Route>
              <Route path="/setschool">
                <Setschool />
              </Route>
              <Route path="/terms"> 
                <Terms />
              </Route>

              <Route path="/scanPay">
              {/* <Route path="/terms"> */}
                <Scantopay />
              </Route>
              <Route path="/scan">
                <Scan />
              </Route>
              <Route path="/responsible">
                <Responsible />
              </Route>
              <Route path="/transfer">
                <Buz />
              </Route>
               <Route path="/feedsX">
                <Home />
              </Route>
              <Route path="/updateprofile">
                <Updateprofile />
              </Route>
              <Route path="/reaction/:postId">
                <Reactions />
              </Route>
              <Route path="/"> 
                <Index />
              </Route>  
              
            </Switch>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}
