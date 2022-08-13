import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./global-context";

import Home from "./components/home";

 



import VendorHome from "./components/vendors/home";
import VendorOrders from "./components/vendors/orders";
import VendorProducts from "./components/vendors/products";
import VendorMyProducts from "./components/vendors/my-products";
import VendorAddProduct from "./components/vendors/add-product";
import VendorEditProduct from "./components/vendors/edit-product";
import VendorSignup from "./components/vendors/signup";
import VendorLogin from "./components/vendors/login";
import VendorOrderedProducts from "./components/vendors/ordered-products";
import VendorMyOrders from "./components/vendors/my-orders";
import VendorVerifications from "./components/vendors/verifications";
import VendorWithdrawals from "./components/vendors/withdrawals";
import VendorMyAccount from "./components/vendors/my-account";
import Product from "./components/product";



function App() {
  const [session, setSession] = useState();
  return (
    <GlobalProvider>
      <Router>
        <div className="App">
          <Routes>

            <Route
              path="/"
              exact
              element={<VendorHome session={session} />}
            ></Route>

            <Route path="/product/:id" element={<Product />}></Route>


            <Route
              path="/vendors/orders"
              exact
              element={<VendorOrders session={session} />}
            ></Route>
            <Route
              path="/vendors/products"
              exact
              element={<VendorProducts session={session} />}
            ></Route>
            <Route
              path="/vendors/my-products"
              exact
              element={<VendorMyProducts session={session} />}
            ></Route>
            <Route
              path="/vendors/add-product"
              exact
              element={<VendorAddProduct session={session} />}
            ></Route>
            <Route
              path="/vendors/edit-product/:id"
              exact
              element={<VendorEditProduct session={session} />}
            ></Route>
            <Route
              path="/vendors/signup"
              exact
              element={
                <VendorSignup session={session} setSession={setSession} />
              }
            ></Route>
            <Route
              path="/login"
              exact
              element={
                <VendorLogin session={session} setSession={setSession} />
              }
            ></Route>
            <Route
              path="/vendors/my-orders"
              element={
                <VendorMyOrders session={session} setSession={setSession} />
              }
            ></Route>
            <Route
              path="/vendors/verifications"
              element={
                <VendorVerifications
                  session={session}
                  setSession={setSession}
                />
              }
            ></Route>
            <Route
              path="/vendors/withdrawals"
              element={
                <VendorWithdrawals session={session} setSession={setSession} />
              }
            ></Route>
            <Route
              path="/vendors/my-account"
              element={
                <VendorMyAccount session={session} setSession={setSession} />
              }
            ></Route>
            <Route
              path="/vendors/ordered_products/:id"
              element={
                <VendorOrderedProducts
                  session={session}
                  setSession={setSession}
                />
              }
            ></Route>

          </Routes>
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;
