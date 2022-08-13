import React, {useState, useEffect} from "react";
import {supabase} from "../supabaseClient";

export function generateOrderId() {
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function pickRandom5(array) {
    var value1 = array[Math.floor(Math.random() * array.length)];
    var value2 = array[Math.floor(Math.random() * array.length)];
    var value3 = array[Math.floor(Math.random() * array.length)];
    var value4 = array[Math.floor(Math.random() * array.length)];
    var value5 = array[Math.floor(Math.random() * array.length)];

    return [value1, value2, value3, value4, value5];
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

  var [num1, num2, num3, num4, num5] = pickRandom5(numbers);
  var [l1, l2, l3, l4, l5] = pickRandom5(letters);
  return "AFM_" + l1 + num1 + l2 + num2 + l3 + num3 + l4 + num4 + l5 + num5;
}
