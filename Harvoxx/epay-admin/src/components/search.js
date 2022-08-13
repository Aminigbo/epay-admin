import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import "../App.css";
import HeaderLiner from "./header-liner";
import Header from "./header";
import Footer from "./footer";
// import {NormalItems, DealsItems, GroupedItems} from "./items";
import MobileMenu from "./mobile-menu";
import {supabase} from "../supabaseClient";
import SiteLoader from "./site_loader";

import {NormalItem, DummyNormalItem} from "./items";

function Search() {
  const [searchedProducts, setSearchedProducts] = useState();
  const [otherProducts, setOtherProducts] = useState();
  const [offset, setOffset] = useState();
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    getSearchedProducts();
    getOtherProducts();
  }, []);

  async function getSearchedProducts() {
    setLoading(true);
    let {data: products, error} = await supabase
      .from("products")
      .select("*")
      .ilike("name", `%${params.query}%`);

    if (error) {
      alert(error.message);
    } else if (products) {
      setSearchedProducts(products);
      setLoading(false);
    }
  }

  async function getOtherProducts() {
    setLoading(true);
    let {data: products, error} = await supabase.from("products").select("*");

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
      <div className="page-title">Showing results for: {params.query}</div>
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
            No results found for: {params.query}
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

export default Search;
