let baseUrl = "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/"

const images = (item) => {
   if (item == "Water") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/11178-Different_types_of_water_header-1296x728.webp"
   } else if (item == "Tea") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/5dbded954f6148d410c9fc09_5ba17e0767e2b10c916afcaa_pexels-photo-209356_2392x.webp"
   } else if (item == "Coffee") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/5feb75be2a1985026bdffb1b71898c46.jpg"
   } else if (item == "Olive Oil") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/81-IWGqo6dL._SL1500_.jpg"
   } else if (item == "BBQ Sauce") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/81DusSdpyqL._SL1500_.jpg"
   } else if (item == "Palm Oil") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/91mOvn72bWL._SL1500_.jpg"
   } else if (item == "Achi") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/ACHI-POWDER-scaled.jpg"
   } else if (item == "Sports Drink") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/BODYARMOR-Beverage-Industry.jpg"
   } else if (item == "Coffee Filters") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/BloomPaperFilters50MAIN-02.webp"
   } else if (item == "Bitters") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/IX2A1544-2-600x900.jpg"
   } else if (item == "Vegetable Oil") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/Kirkland-Signature-Vegetable-Oil-284L-4HSYd0TsVX.jpg"
   } else if (item == "Garbage Bags") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/Low-Price-Heavy-Duty-Trash-Bag-Contractor-Garbage-Bag.jpg"
   } else if (item == "Tissues") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/Paper_towel_roll_000012273711XSmall.jpg"
   } else if (item == "Utensils") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/Utensils.jpg"
   } else if (item == "Wax Paper") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/Wax Paper.jpg"
   } else if (item == "Cassava") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/cassava_stock.jpg"
   } else if (item == "Potatoes") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/iC7HBvohbJqExqvbKcV3pP.jpg"
   } else if (item == "Hot Sauce") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/image.png"
   } else if (item == "Ofor") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/mychopchop-2021-best-numberone-african-online-grocer-canada-delivery-toronto-0139_512x512.webp"
   } else if (item == "Napkins") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/napkins.jpg"
   } else if (item == "Ogbono") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/ogbono seeds,african wild mango seed, ogbono seed, irvinia gabonensis Wild Mango Seeds.jpg"
   } else if (item == "Plastic Wrap") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/plastic wraps.jpg"
   } else if (item == "Plates") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/plates.jpg"
   } else if (item == "Paper Towels") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/resize.avif"
   } else if (item == "Soda") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/soda-can-aluminium-white_1308-32368.webp"
   } else if (item == "Toilet Paper") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/toilet paper.webp"
   } else if (item == "Yam") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/yam.jpg"
   }
   else if (item == "Dried Okazi") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/bcadc651-f785-43c8-9b54-274a21617eff.jpg"
   } else if (item == "Blended Okazi") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/f8187313-953d-4119-8734-afd93bc6e507.jpg"
   } else if (item == "Dried Ngolo (Prewinkles)") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/42c44719-828a-4702-8fe7-b295aab53f60.jpg"
   } else if (item == "Dried Isam  (Prewinkles)") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/42c44719-828a-4702-8fe7-b295aab53f60.jpg"
   } else if (item == "Dried Bitterleaf") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/bcadc651-f785-43c8-9b54-274a21617eff.jpg"
   } else if (item == "Cashew nut") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/Cashew nut.jpg"
   } else if (item == "Coconut Chips") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/Coconut Chips.jpg"
   } else if (item == "Groundnuts") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/Groundnuts.jpg"
   }
   else if (item == "Aki na Ukwa") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/Aki na Ukwa.jpg"
   } else if (item == "Dried Oha") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/bcadc651-f785-43c8-9b54-274a21617eff.jpg"
   } else if (item == "Dried Uziza") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/bcadc651-f785-43c8-9b54-274a21617eff.jpg"
   } else if (item == "Dried/Blended Uziza seed") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/bcadc651-f785-43c8-9b54-274a21617eff.jpg"
   } else if (item == "Egusi") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/c5170245-225e-4065-9301-6d386870227d.jpg"
   } else if (item == "Okpa Flour") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/Okpa Flour.jpg"
   } else if (item == "Ukpo (ABACHI)") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/Ukpo.jpg"
   } else if (item == "Dried Utazi") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/bcadc651-f785-43c8-9b54-274a21617eff.jpg"
   }
   else if (item == "Azuma (AKIDI)") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/akidi.jpg"
   } else if (item == "STOCKFISH") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/okporoko.jpg"
   } else if (item == "Cameroon Pepper") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/46eb8c47-f952-470c-a94e-62cc2b10e712.jpg"
   } else if (item == "Red Pepper") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/download (1).jpg"
   } else if (item == "Dried Abacha") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/Abacha.jpg"
   } else if (item == "Dried Scent Leaf") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/bcadc651-f785-43c8-9b54-274a21617eff.jpg"

   } else if (item == "Atama Leave") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/bcadc651-f785-43c8-9b54-274a21617eff.jpg"

   } else if (item == "Blended Crayfish") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/be72bc92-0df5-4572-955a-a74f432a8159.jpg"

   } else if (item == "Blended Prawns") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/be72bc92-0df5-4572-955a-a74f432a8159.jpg"

   } else if (item == "Beans Powder") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/64c6f383-ba1b-4416-9137-0da57b44a3e9.jpg"

   } else if (item == "Ogiri Igbo") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/ebc494ab-688d-42a7-ae17-14fa0c5293f0.jpg"

   } else if (item == "Pap (Akamu)") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/Akamu.jpg"

   } else if (item == "Dried Fish") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/ebc494ab-688d-42a7-ae17-14fa0c5293f0.jpg"

   } else if (item == "Amala") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/Amala.jpg"

   } else if (item == "Yellow Garri") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/c07cc55d-4f99-4331-a90c-a41fdeafec54.jpg"

   } else if (item == "Honey Beans") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/a5fc40a3-753f-45b0-ae87-ab6f06efb34f.jpg"

   } else if (item == "Peeled Beans") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/0ab4841f-d700-4f4d-9167-45d5c97e2603.jpg"

   } else if (item == "Black eyed Beans") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/b06d4204-7517-4a1e-a2cc-17b939761d69.jpg"

   } else if (item == "White Corn") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/White Corn.jpg"

   } else if (item == "Uda") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/e0af5956-d574-468c-96a5-b261347cf5d9.jpg"
   }
   else if (item == "Aligator Pepper") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/7088aa5c-0cfb-4233-87fb-3aba939dd2d7.jpg"

   } else if (item == "Ground Ogbono") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/70620bd7-a566-4fc0-92ff-ce08d25fb065.jpg"

   } else if (item == "Ugba seeds (African oil bean seeds)") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/aaa34269-2367-43c0-b5fb-4aabc2e88ece.jpg"

   }
   else if (item == "Calabash Nutmeg (Ehuru )") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/bffe5929-1aad-4337-bcc7-a7934d806f1b.jpg"

   }
   else if (item == "Ijebu Garri") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/64c6f383-ba1b-4416-9137-0da57b44a3e9.jpg"

   }
   else if (item == "Prawn (Oporo)") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/2b056a0e-3161-4fde-b5ac-3ce7edc79e06.jpg"

   }
   else if (item == "Melon seeds (Egusi )") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/96cc0523-d7f5-4892-b1a3-4da14c509111.jpg"

   } else if (item == "Yam flour (Elubo)") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/876d2b42-f7db-409f-a63c-0a355d6546ef.jpg"

   }







   else if (item == "Shampoo") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/shampoo.jpg"

   }
   else if (item == "Deodorant") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/gettyimages-932734888.webp"

   }
   else if (item == "Floss") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/flossing.jpg"

   }
   else if (item == "Hair Spray") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/hair-spray-guide-feature-image.jpg"

   } else if (item == "Lip Balm") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/lip balm.webp"

   } else if (item == "Lotion") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/lotion.webp"

   } else if (item == "Makeup") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/makeup-cosmetics.webp"

   } else if (item == "Mouthwash") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/mouth wash.jpg"

   } else if (item == "Razor Blades") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/razor blade.jpg"

   } else if (item == "Shaving Cream") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/shaving cream.webp"

   } else if (item == "Soap") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/soap.jpg"

   } else if (item == "Sunscreen") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/sunscreen.webp"

   } else if (item == "Toothbrush") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/toothbrush.jpg"

   } else if (item == "Toothpaste") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/toothpaste.jpg"

   } else if (item == "Batteries") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/batteries.jpg"

   } else if (item == "Bleach") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/bleach.jpg"

   } else if (item == "Detergent") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/Detergent.webp"

   } else if (item == "Dish Soap") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/dish soap.webp"

   } else if (item == "Fabric Softener") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/fabric softener.jpg"

   }
   else if (item == "Charcoal") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/charcoal.webp"

   }
   else if (item == "Peppers") {
      return "https://phkplgcbadhhlvzvhbtn.supabase.co/storage/v1/object/public/images/download (1).jpg"

   }

};

export default images;
