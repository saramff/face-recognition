/**
 * Sara's Experiment
 * 
 * Some info...
 *
 */

import { shuffle } from "./utils.js";

const PEOPLE_URL = "https://raw.githubusercontent.com/Amaza-ing/images/refs/heads/master/people/";
const IMAGES_PER_GENDER = 10;

const personImg = document.querySelector("#person-img");

let imgSrc = "";

// Create numeric arrays from 1 to IMAGES_PER_GENDER number and then shuffles them
const menArray = Array.from({ length: IMAGES_PER_GENDER }, (_, i) => i + 1);
const womenArray = Array.from({ length: IMAGES_PER_GENDER }, (_, i) => i + 1);
// console.log("men", menArray);
// console.log("women", womenArray);
shuffle(menArray);
shuffle(womenArray);
console.log("men shuffled", menArray);
console.log("women shuffled", womenArray);


/**
 *  Initializes men index [mi] & women index [wi] to 0
 *  Chose gender randomly - Gender: 0 = man; 1 = woman
 *  Display the chosen picture
 *  Add one to index for chosen gender
 */
let mi = 0;
let wi = 0;
let gender = Math.round(Math.random());

if (gender === 0) {
  imgSrc = `${PEOPLE_URL}men/man-${menArray[mi]}.PNG`;
  mi++;
} else if (gender === 1) {
  imgSrc = `${PEOPLE_URL}women/woman-${womenArray[wi]}.PNG`;
  wi++;
}

personImg.setAttribute("src", imgSrc);
