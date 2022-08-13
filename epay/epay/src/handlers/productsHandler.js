import React, {useState, useEffect} from "react";
import {supabase} from "../supabaseClient";

export function generateProductCode() {
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function pickRandom3(array) {
    var value1 = array[Math.floor(Math.random() * array.length)];
    var value2 = array[Math.floor(Math.random() * array.length)];
    var value3 = array[Math.floor(Math.random() * array.length)];

    return [value1, value2, value3];
  }

  var letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  shuffleArray(letters);
  shuffleArray(numbers);

  var [num1, num2, num3] = pickRandom3(numbers);
  var [l1, l2, l3] = pickRandom3(letters);
  return l1 + num1 + l2 + num2 + l3 + num3;
}

export async function getProducts() {
  let {data: products, error} = await supabase.from("products").select("*");

  return [products, error];
}
