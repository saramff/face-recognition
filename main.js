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

/**************************************************************************************/

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
    correct_response: "l"
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

/**************************************************************************************/

const NEW_PEOPLE_URL =
  "https://raw.githubusercontent.com/saramff/face-recognition-images/refs/heads/master/new-faces/newface_";
const NEW_IMAGES = 10;

// Create pictures array for new images
const newImages = Array.from(
  { length: NEW_IMAGES },
  (_, i) => {
    return {
      img: `${NEW_PEOPLE_URL}${i + 1}.jpg`,
      correct_response: "l"
    }
  }
);

const peopleSliceImgs = peopleSlice.map((person) => {
  return {
    img: person.img,
    correct_response: "a"
  }
})

const recognitionFaces = [...newImages, ...peopleSliceImgs];

shuffle(recognitionFaces);

// create faces images array to preload them
const recognitionFacesImgs = recognitionFaces.map((face) => face.img);

/**************************************************************************************/

/* Initialize jsPsych */
let jsPsych = initJsPsych({
  on_finish: function () {
    jsPsych.data.displayData();
  },
});

/* Create timeline */
let timeline = [];

////////////////////////////////////////////////////////////////////////
//                           Consent                                  //
//                           (!works only on server)                  //  
////////////////////////////////////////////////////////////////////////
let check_consent = (elem) => {
  if (document.getElementById('consent_checkbox').checked) {
    return true;
  }
  else {
    alert("Vielen Dank f&uumlr ihr Interesse an unserem Experiment. Wenn Sie bereit sind teilzunehmen, geben Sie uns bitte Ihr Einverst&aumlndnis.");
    return false;
  }
  return false;
};

let html_block_consent = {
  type: jsPsychExternalHtml,
  url: "consentA2.html",
  cont_btn: "start_experiment",
  check_fn: check_consent
};
timeline.push(html_block_consent);

// ////////////////////////////////////////////////////////////////////////
// //                           Demographic  variables                   //
// ////////////////////////////////////////////////////////////////////////

/* fullscreen */
timeline.push({
  type: jsPsychFullscreen,
  fullscreen_mode: true,
  message: '<p>Bitte Klicken, um zum Vollbildmodus zu wechseln.</p>',
  button_label:'Weiter',
  on_finish: function(data){
    var help_fullscreen = data.success;
    jsPsych.data.addProperties({fullscreen: help_fullscreen});
  }
});

var age = {
  type: jsPsychSurveyText,
  preamble: 'Im folgenden fragen wir Sie nach einigen demographischen Daten.',
  name: 'age',
    button_label:'Weiter',
    questions: [{prompt:'<div>Wie alt sind Sie derzeit?<\div>', rows: 1, columns: 2, required: 'true'}],
  data: {
    type:"demo",
    age: age,
  },
  on_finish: function(data){
    var help_age = data.response.Q0;
    jsPsych.data.addProperties({age: help_age});
  },
  on_load: function() {
    document.querySelector('.jspsych-btn').style.marginTop = '20px'; // Adjust margin as needed
  }
};

//jsPsych.data.get().last(1).values()[0].response.Q0

timeline.push(age);

var demo2 = {
  type: jsPsychSurveyMultiChoice,
  questions: [
    {
      prompt:'Bitte w&aumlhlen Sie das Geschlecht aus, mit dem Sie sich identifizieren.',
      name: 'gender',
      options: ["m&aumlnnlich", "weiblich", "divers", "keine Angabe"],
      required: true,
      horizontal: true
    },
    {
      prompt:'Bitte geben Sie Ihre H&aumlndigkeit an.',
      name: 'handedness',
      options: ["links", "rechts", "beidh&aumlndig"],
      required: true,
      horizontal: true
    },
    {
      prompt:'Bitte w&aumlhlen Sie Ihre Muttersprache aus.',
      name: 'language',
      options: ["Deutsch", "andere"],
      required: true,
      horizontal: true
    },
  ],
  button_label:'Weiter',
  on_finish: function(data) {
    var help_gender = data.response.gender;
    var help_hand = data.response.handedness;
    var help_language = data.response.language;
    jsPsych.data.addProperties({gender: help_gender, handedness: help_hand, language: help_language});
  }
};
timeline.push(demo2);

// based on random Number:
const vpNum = Math.floor(Math.random()*1000000);

jsPsych.data.addProperties({
 subject: vpNum,
 expName: "Cognition Sara",
});

/************************************************************************************************ */

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

/* Preload new faces */
let preloadNewFaces = {
  type: jsPsychPreload,
  images: recognitionFacesImgs,
};
timeline.push(preloadNewFaces);

/* Welcome message trial */
let welcome = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "Welcome to the experiment. Press any key to begin.",
};
timeline.push(welcome);


/**************************************************************************************/


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
  trial_duration: 500, // Display each image for 2 second
};

/* Test procedure: fixation + image presentation */
let test_procedure = {
  timeline: [fixation, test],
  timeline_variables: test_stimuli,
  randomize_order: true, // Randomize image order
};
timeline.push(test_procedure);


/**************************************************************************************/


/* Instructions for recognition phase */
let instructionsrecognition = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <p>Next, you will see a series of faces with an object and a related sentence.</p>
    <p>Press 'A' if the sentence is false, and 'L' if the sentence is true.</p>
    </p></p>
    <p>As in this example, if the screen shows Ana's face and a teddy, and the sentence says "Ana has a marker," press 'A'(NO).</p>
    <br />
    <div>
      <img src='https://raw.githubusercontent.com/saramff/face-recognition-images/refs/heads/master/Example/Ana.jpg'  class="img-instructions" />
      <img src='https://raw.githubusercontent.com/saramff/face-recognition-images/refs/heads/master/Example/Teddy.jpg' class="img-instructions" />
    </div>
    <br />
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
    correct_response: person.object.correct_response
  };
});

/* Image presentation trial */
let testObjects = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: jsPsych.timelineVariable("stimulus"),
  choices: ['a', 'l'],
  data: {
    task: "response",
    correct_response: jsPsych.timelineVariable("correct_response"),
  },
  on_finish: function (data) {
    data.correct = jsPsych.pluginAPI.compareKeys(
      data.response,
      data.correct_response
    );
  },
};

/* Test procedure: fixation + image presentation */
let test_objects_procedure = {
  timeline: [fixation, testObjects],
  timeline_variables: test_objects_stimuli,
  randomize_order: true, // Randomize image order
};
timeline.push(test_objects_procedure);


/**************************************************************************************/


/* Tetris */
let tetris = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <div class="tetris-visible"></div>
  `,
  post_trial_gap: 500,
  choices: "NO_KEYS", // Prevent key press
  trial_duration: 1500, // Fixation duration
};
timeline.push(tetris);


/**************************************************************************************/

/* Create stimuli array for image presentation */
let face_recognition_stimuli = recognitionFaces.map((face) => {
  return {
    stimulus: `
      <div class="imgs-container">
        <img class="person-img" src="${face.img}">
      </div>
    `,
    correct_response: face.correct_response
  };
});

/* Image presentation trial */
let testFaces = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: jsPsych.timelineVariable("stimulus"),
  choices: ['a', 'l'],
  data: {
    task: "response",
    correct_response: jsPsych.timelineVariable("correct_response"),
  },
  on_finish: function (data) {
    data.correct = jsPsych.pluginAPI.compareKeys(
      data.response,
      data.correct_response
    );
  },
};

/* Test procedure: fixation + image presentation */
let test_faces_procedure = {
  timeline: [fixation, testObjects],
  timeline_variables: face_recognition_stimuli,
  randomize_order: true, // Randomize image order
};
timeline.push(test_faces_procedure);


/* Run the experiment */
jsPsych.run(timeline);
