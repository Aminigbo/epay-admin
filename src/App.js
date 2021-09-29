import React from "react";
import { Route, Switch } from "react-router";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import "./App.css";
import About from "./pages/About";
import FormPage from "./pages/FormPage";
import Contact from "./pages/Contact";
import Investor from "./pages/Investor";
import { ScrollToTop } from "react-router-scroll-to-top";

function App() {

  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/offer" component={About} />
        <Route path="/apply" component={FormPage} />
        <Route path="/contact" component={Contact} />
        <Route path="/investor" component={Investor} />
        {/* <Route path="https://wa.link/th4a3h" component={() => {
          window.location.href = 'https://wa.link/th4a3h'
          return null
        }}/> */}
      </Switch>
      <Footer />
    </>
  );
}

export default App;
