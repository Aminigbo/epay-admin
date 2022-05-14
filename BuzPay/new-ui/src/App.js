import "./App.css";
import store from "./redux/store/index";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Onboard from "./pages/onboard"
import Home from "./pages/home";
import Login from "./pages/login"
import Register from "./pages/register"
import Setpin from "./pages/setpin"
import OTP from './pages/otp' 
import Resetpwd from "./pages/resetpwd"
import Dashboard from "./pages/dashboard"

// account
import Account from "./pages/account/account"
import AccountDetails from "./pages/account/user-details"
import Gethelp from "./pages/account/get-help"
import Terms from "./pages/account/terms"
import Security from "./pages/account/security"
import ChangePin from "./pages/account/change-pin"
import Transactions from "./pages/transactions/transactions"
import TransactionsView from "./pages/transactions/transaction-view"
import Buzzme from "./pages/buzzme"
import Scan from "./pages/scan/index"
import ScanError from "./pages/scan/error"
import ScanSuccess  from "./pages/scan/success"


import Kashback from "./pages/kashback/index"
import CreateKashback from "./pages/kashback/create-kashback"
import ViewKashback  from "./pages/kashback/view-kashback"

export default function App() {
  return (
    <Provider store={store().store}>
      <PersistGate loading={null} persistor={store().persistor}>
        <Router>
          <div className="body">
            <Switch>
              <Route path="/onboard">
                <Onboard />
              </Route>

              <Route path="/login">
                <Login />
              </Route>
              <Route path="/signup">
                <Register />
              </Route>
              <Route path="/setpin">
                <Setpin />
              </Route>
              <Route path="/OTP">
                <OTP />
              </Route>
               <Route path="/resetpassword">
                <Resetpwd />
              </Route> 
              <Route path="/dashboard">
                <Dashboard />
              </Route>

              {/* Account */}
              <Route path="/account">
                <Account />
              </Route>
               <Route path="/account-details">
                <AccountDetails />
              </Route>

              <Route path="/get-help">
                <Gethelp />
              </Route>
              <Route path="/terms">
                <Terms />
              </Route>

              <Route path="/security">
                <ChangePin />
              </Route>

              <Route path="/transaction">
                <Transactions />
              </Route>

              <Route path="/transaction-view">
                <TransactionsView />
              </Route>

              <Route path="/buzzme">
                <Buzzme />
              </Route>

               <Route path="/scan">
                <Scan />
              </Route>

              <Route path="/scan-error">
                <ScanError />
              </Route>
              <Route path="/scan-success">
                <ScanSuccess />
              </Route>


              <Route path="/kashback">
                <Kashback />
              </Route>
              <Route path="/create-kashback">
                <CreateKashback />
              </Route>
              <Route path="/view-kashback">
                <ViewKashback />
              </Route>

{/* ======================== */}


               <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}
