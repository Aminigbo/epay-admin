import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "../App.css";
import HeaderLiner from "./header-liner";
import Header from "./header";
import Footer from "./footer";
// import {NormalItems, DealsItems, GroupedItems} from "./items";
import MobileMenu from "./mobile-menu";
import { supabase } from "../supabaseClient";
import SiteLoader from "./site_loader";
import { globalContext } from "../global-context";

import { NormalItem, DummyNormalItem } from "./items";
import { getSearchedProductsByRegion } from "../handlers/cpHandler";

function SearchByRegion() {
  const [searchedProducts, setSearchedProducts] = useState();
  const [otherProducts, setOtherProducts] = useState();
  const [offset, setOffset] = useState();
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const globalState = useContext(globalContext);

  useEffect(() => {
    getSearchedProducts();
    getOtherProducts();
  }, []);

  async function getSearchedProducts() {
    setLoading(true);
    // let {data: products, error} = await supabase
    //   .from("products")
    //   .select("*")
    //   .ilike("region", `%${params.query}%`);

    // if (error) {
    //   alert(error.message);
    // } else if (products) {
    //   setSearchedProducts(products);
    //   setLoading(false);
    // }
    let searched = await getSearchedProductsByRegion(
      globalState.state.globalRegion
    );

    setSearchedProducts(searched);
  }

  async function getOtherProducts() {
    setLoading(true);
    let { data: products, error } = await supabase.from("products").select("*");

    if (error) {
      alert(error.message);
    } else if (products) {
      setOtherProducts(products);
      setLoading(false);
    }
  }

  var noOfSearchedProducts = 0;
  var noOfOtherProducts = 0;
  return (
    <div className="search">
      <SiteLoader show={loading} />
      <HeaderLiner />
      <Header />
      <div className="page-title">
        Showing results for: {globalState.state.globalRegion}
      </div>
      <div className="normal-items-container">
        {searchedProducts ? (
          searchedProducts.map((item, index) => {
            noOfSearchedProducts = noOfSearchedProducts + 1;
            return <NormalItem key={index} item={item} />;
          })
        ) : (
          <>
            <DummyNormalItem />
            <DummyNormalItem />
            <DummyNormalItem />
            <DummyNormalItem />
            <DummyNormalItem />
          </>
        )}
        {noOfSearchedProducts === 0 && searchedProducts ? (
          <div
            className=""
            style={{
              width: "100%",
              padding: "20px 0px",
              color: "grey",
              fontSize: "17px",
              textAlign: "center",
            }}
          >
            Sorry, no item currently available in the selected region
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="load-more-btn-container">
        <button class="load-more-btn">Load more</button>
      </div>

      <div className="page-title">Other products</div>
      <div className="normal-items-container">
        {otherProducts ? (
          otherProducts.map((item, index) => {
            noOfOtherProducts = noOfOtherProducts + 1;
            return <NormalItem key={index} item={item} />;
          })
        ) : (
          <>
            <DummyNormalItem />
            <DummyNormalItem />
            <DummyNormalItem />
            <DummyNormalItem />
            <DummyNormalItem />
          </>
        )}
      </div>
      <MobileMenu />
      <Footer />
    </div>
  );
}

export default SearchByRegion;
