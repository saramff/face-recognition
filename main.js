/**
 * Sara's Experiment
 * Facial recognition experiment with automatic image presentation
 */

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
const menNames = ["Paco", "Alberto", "Juan", "Manolo", "Pablo"];
const womenNames = ["Ana", "María", "Juana", "Sandra", "Sofía"];

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
const SLICE_SIZE = 3;
const menCopy = [...menImgsNames];
const womenCopy = [...womenImgsNames];

// Create men & women slice array
const menSlice = getRandomSlice(menCopy, SLICE_SIZE);
const womenSlice = getRandomSlice(womenCopy, SLICE_SIZE);

const peopleSlice = [...menSlice, ...womenSlice];

shuffle(peopleSlice);

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
    <p>Next, you will see a series of images with an object and a related sentence.</p>
    <p>Press 'A' if the sentence is false, and 'L' if it is true.</p>
    <p>For example, if the screen shows a picture of Maria and a phone, and the sentence says "Maria has a marker," press 'A'(NO). 
    <p>If the screen shows a picture of Maria and a phone and it says "Maria has a phone," press 'L'(YES).</p>
    <p>Press any key to begin the practice examples.</p>
  `,
  post_trial_gap: 500,
};
timeline.push(instructionsrecognition);

/* Run the experiment */
jsPsych.run(timeline);
