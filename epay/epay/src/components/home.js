import React, {useState, useEffect} from "react";
import "../App.css";
import HeaderLiner from "./header-liner";
import Header from "./header";
import Footer from "./footer";
import {NormalItems, DealsItems, GroupedItems} from "./items";
import MobileMenu from "./mobile-menu";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
// import BorderAllIcon from '@mui/icons-material/BorderAll';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import LocalMallIcon from '@mui/icons-material/LocalMall';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import CropOriginalIcon from '@mui/icons-material/CropOriginal'; // image
// import CreateIcon from '@mui/icons-material/Create';
// import SearchIcon from '@mui/icons-material/Search';
// import LogoutIcon from '@mui/icons-material/Logout';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import BackupIcon from '@mui/icons-material/Backup';
import HeroImage1 from "../images/hero1.jpeg";
import HeroImage2 from "../images/hero2.jpg";
import HeroImage3 from "../images/hero3.jpg";
import HeroImage4 from "../images/hero4.jpg";
import DoubleBanner from "./double-banner";
import {getProducts} from "../handlers/productsHandler";
import {NormalItem, DummyNormalItem} from "./items";

function Home() {
  const [normalProducts, setNormalProducts] = useState();
  let heroImages = [HeroImage1, HeroImage2, HeroImage3, HeroImage4];
  const [heroImage, setHeroImage] = useState(HeroImage2);
  const [fadeHeroImage, setFadeHeroImage] = useState(false);
  const categories = [
    "Meat",
    "Seafood",
    "Ingredients",
    "starchy",
    "Meat",
    "Sea food",
    "Meat",
    "Seafood",
    "Ingredients",
    "starchy",
    "Meat",
    "Sea food",
  ];

  useEffect(() => {
    getNormalProducts();
    setInterval(() => {
      // setFadeHeroImage(true);
      // console.log("outside timeout");
      // setTimeout(() => {
      //   let rand = Math.floor(Math.random() * heroImages.length);
      //   setHeroImage(heroImages[rand]);
      //   setFadeHeroImage(false);
      //   console.log("inside timeout");
      // }, 1000);
      let rand = Math.floor(Math.random() * heroImages.length);
      setHeroImage(heroImages[rand]);
    }, 10000);
  }, []);

  async function getNormalProducts() {
    let [res, error] = await getProducts();
    if (error) {
      alert(error.message);
    } else if (res) {
      setNormalProducts(res);
    }
  }
  return (
    <div className="home">
      <HeaderLiner />
      <Header />
      <div className="hero">
        <img src={heroImage} alt="" className={`image-overlay fade`} />
        <div className="div-overlay">
          <div className="title">
            Life is more easier when you shop your Foodstuffs Online
            <div className="btn-container">
              <button className="btn">Shop now</button>
            </div>
          </div>
        </div>
      </div>
      <div className="categories">
        <div className="title">Categories</div>
        <div className="box-container">
          {categories.map(category => {
            return (
              <div class="box">
                <div class="category">{category}</div>
              </div>
            );
          })}
        </div>
      </div>
      {/* <GroupedItems />
      <DealsItems />
      <DoubleBanner /> */}
      <div className="items-title">Our Foodstuffs</div>
      <div className="normal-items-container">
        {normalProducts ? (
          normalProducts.map((item, index) => {
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
      <div className="see-more-btn-container">
        <button class="see-more-btn">See more items</button>
      </div>
      <div className="info-container">
        <div className="row">
          <div className="icon-container">
            <ShieldOutlinedIcon className="icon" />
          </div>
          <div className="title">Safe Shopping</div>
          <div className="description">
            You experience with us is highly secured. Shop with peace of mind
          </div>
        </div>
        <div className="row">
          <div className="icon-container">
            <LocalAtmIcon className="icon" />
          </div>
          <div className="title">Safe Shopping</div>
          <div className="description">
            You experience with us is highly secured. Shop with peace of mind
          </div>
        </div>
        <div className="row">
          <div className="icon-container">
            <HeadsetMicIcon className="icon" />
          </div>
          <div className="title">Safe Shopping</div>
          <div className="description">
            You experience with us is highly secured. Shop with peace of mind
          </div>
        </div>
      </div>

      <div className="newsletter">
        <div className="title">Newsletter</div>
        <div className="subtitle">Subscribe to get our great deals alert</div>
        <form className="form-container">
          <input type="text" className="field" />
          <button>Subscribe</button>
        </form>
      </div>
      <MobileMenu />
      <Footer />

      {/* <img src={process.env.PUBLIC_URL+'images/afra3.png'} alt=""></img> */}
    </div>
  );
}

export default Home;
