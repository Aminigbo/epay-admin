import "./App.css";
import store from "./redux/store/index";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"; 
import Login from "./pages/login"; 
import Otp from "./pages/otp";  



import "bootstrap/dist/css/bootstrap.min.css"; 
import Nonstudentfeeds from "./components/nonstudentfeeds"; 
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; 
export default function App() {
  return (
    <Provider store={store().store}>
      <PersistGate loading={null} persistor={store().persistor}>
        <Router>
          <div className="body">
            <Switch>
               
              <Route path="/nonstudentfeed">
                <Nonstudentfeeds />
              </Route>{" "}

               <Route path="/home">
                <Otp />
              </Route>{" "} 

              <Route path="/">
                <Login />
              </Route>{" "}
              
              
            </Switch>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}
