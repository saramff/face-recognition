/**
 * Sara's Experiment
 * Facial recognition experiment with automatic image presentation
 */

import { correctObjects, incorrectObjects } from "./objects.js";

const PEOPLE_URL =
  "https://raw.githubusercontent.com/saramff/face-recognition-images/refs/heads/master/";
const IMAGES_PER_GENDER = 5;

// Create pictures arrays for men and women images
const menImages = Array.from(
  { length: IMAGES_PER_GENDER },
  (_, i) => `${PEOPLE_URL}/men/man_${i + 1}.jpg`
);
const womenImages = Array.from(
  { length: IMAGES_PER_GENDER },
  (_, i) => `${PEOPLE_URL}/women/woman_${i + 1}.jpg`
);

// Create new array concatenating men & women images
const peopleImages = [...menImages, ...womenImages];

// Create name arrays for men and women
const menNames = ["Antonio", "Manuel", "José", "Francisco", "David"];
const womenNames = ["María", "Carmen", "Laura", "Marta", "Elena"];

// Create suffle function - suffles array index randomly
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Suffle all arrays (images and names)
shuffle(menImages);
shuffle(womenImages);
shuffle(menNames);
shuffle(womenNames);

// Create object array for men and women {img, name} 
const menImgsNames = menImages.map((img, index) => {
  return {
    img: img,
    name: menNames[index],
  };
});

const womenImgsNames = womenImages.map((img, index) => {
  return {
    img: img,
    name: womenNames[index],
  };
});

// Create new array concatenating men & women images & names
const peopleImgsNames = [...menImgsNames, ...womenImgsNames];

// suffle people imgs & names array randomly
shuffle(peopleImgsNames);

/**********************************************************/

// create objects images array to preload them
const objectsImgs = correctObjects.map((object) => object.img);

// Create function to get a new array with a random slice from other array
function getRandomSlice(array, sliceSize) {
  const arraySlice = [];

  for (let i = 0; i < sliceSize; i++) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const randomPerson = array.splice(randomIndex, 1)[0];
    arraySlice.push(randomPerson);
  }

  return arraySlice;
}

// Define slice size & create men & women array copy not to alter the original ones
const SLICE_SIZE = 4;
const menCopy = [...menImgsNames];
const womenCopy = [...womenImgsNames];

// Create men & women slice array
const menSlice = getRandomSlice(menCopy, SLICE_SIZE);
const womenSlice = getRandomSlice(womenCopy, SLICE_SIZE);

// Create correct objects slice array
const correctObjectsSlice = getRandomSlice(correctObjects, SLICE_SIZE)

// Add correct objects to men & women
const menCorrectObjects = correctObjectsSlice.slice(0, SLICE_SIZE / 2);
const womenCorrectObjects = correctObjectsSlice.slice(SLICE_SIZE / 2, correctObjectsSlice.length);

menCorrectObjects.forEach((object, index) => menSlice[index].object = object);
womenCorrectObjects.forEach((object, index) => womenSlice[index].object = object);

// Create incorrect objects slice (first is just sentences, and then random images are added)
const incorrectObjectsSlice = getRandomSlice(incorrectObjects, SLICE_SIZE);

const incorrectObjectsWithImg = incorrectObjectsSlice.map((objectSentence) => {
  const img = getRandomSlice(correctObjects, 1)[0].img;

  return {
    sentence: objectSentence,
    img: img,
    correct: false
  }
})

// Add incorrect objects to men & women
const menIncorrectObjects = incorrectObjectsWithImg.slice(0, SLICE_SIZE / 2);
const womenIncorrectObjects = incorrectObjectsWithImg.slice(SLICE_SIZE / 2, incorrectObjectsSlice.length);

menIncorrectObjects.forEach((object, index) => menSlice[menSlice.length - 1 - index].object = object);
womenIncorrectObjects.forEach((object, index) => womenSlice[womenSlice.length - 1 - index].object = object);

// Create people slice array concatenating men & women slice arrays
const peopleSlice = [...menSlice, ...womenSlice];

// Shuffle people slice array
shuffle(peopleSlice);
console.log(peopleSlice);


/* Initialize jsPsych */
let jsPsych = initJsPsych({
  on_finish: function () {
    jsPsych.data.displayData();
  },
});

/* Create timeline */
let timeline = [];

/* Preload images */
let preload = {
  type: jsPsychPreload,
  images: peopleImages,
};
timeline.push(preload);

/* Preload objects */
let preloadObjects = {
  type: jsPsychPreload,
  images: objectsImgs,
};
timeline.push(preloadObjects);

/* Welcome message trial */
let welcome = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "Welcome to the experiment. Press any key to begin.",
};
timeline.push(welcome);

/* Instructions trial */
let instructions = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <p>In this experiment, faces will appear one by one automatically.</p>
    <p>Please pay close attention to each face.</p>
    <p>Press any key to begin when you're ready.</p>
  `,
  post_trial_gap: 500,
};
timeline.push(instructions);

/* Create stimuli array for image presentation */
let test_stimuli = peopleImgsNames.map((person) => {
  return {
    stimulus: `
      <img class="person-img" src="${person.img}">
      <p class="person-name">${person.name}</p>
    `,
  };
});

/* Fixation trial */
let fixation = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<div style="font-size:60px;">+</div>',
  choices: "NO_KEYS", // Prevent key press
  trial_duration: 500, // Fixation duration
  data: {
    task: "fixation",
  },
};

/* Image presentation trial */
let test = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: jsPsych.timelineVariable("stimulus"),
  choices: "NO_KEYS", // Prevent key press
  trial_duration: 1000, // Display each image for 1 second
};

/* Test procedure: fixation + image presentation */
let test_procedure = {
  timeline: [fixation, test],
  timeline_variables: test_stimuli,
  randomize_order: true, // Randomize image order
};
timeline.push(test_procedure);

/* Instructions for recognition phase */
let instructionsrecognition = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <p>Next, you will see a series of faces with an object and a related sentence.</p>
    <p>Press 'A' if the sentence is false, and 'L' if the sentence is true.</p>
    <p>For example, if the screen shows Ana's face and a teddy, and the sentence says "Ana has a marker," press 'A'(NO). 
    <p>On the other side, if the screen shows Ana's face and a teddy and it says "Ana has a teddy," press 'L'(YES).</p>
    <p>Press any key to begin.</p>
  `,
  post_trial_gap: 500,
};
timeline.push(instructionsrecognition);

/* Create stimuli array for image presentation */
let test_objects_stimuli = peopleSlice.map((person) => {
  return {
    stimulus: `
      <div class="imgs-container">
        <img class="person-img" src="${person.img}">
        <img class="object-img" src="${person.object.img}">
      </div>
      <p class="person-name">${person.name} ${person.object.sentence}</p>
    `,
  };
});

/* Test procedure: fixation + image presentation */
let test_objects_procedure = {
  timeline: [fixation, test],
  timeline_variables: test_objects_stimuli,
  randomize_order: true, // Randomize image order
};
timeline.push(test_objects_procedure);

/* Run the experiment */
jsPsych.run(timeline);
