////////////////////////////////////////////////////////////////////////
//                           Creations                                //
//                                                                    //  
////////////////////////////////////////////////////////////////////////

import { correctObjects, incorrectObjects } from "./objects.js";


/**************************************************************************************/

const randomNumber = Math.random();

let correctKey;
let incorrectKey;

if (randomNumber < 0.5) {
  correctKey = "a";
  incorrectKey = "l";
} else {
  correctKey = "l";
  incorrectKey = "a";
}

/**************************************************************************************/

const PEOPLE_URL =
  "https://raw.githubusercontent.com/saramff/face-recognition-images/refs/heads/master/";
const IMAGES_PER_GENDER = 96;

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
const menNames = ["Peter", "Wolfgang", "Michael", "Werner", "Klaus", "Thomas", "Manfred", "Helmut", "Jürgen", "Heinz", "Gerhard", "Andreas", "Hans", "Josef", "Günter", "Dieter", "Horst", "Walter", "Frank", "Bernd", "Karl", "Herbert", "Jörg", "Ralf", "Erich", "Norbert", "Bernhard", "Willi", "Alexander", "Ulrich", "Markus", "Matthias", "Harald", "Paul", "Roland", "Ernst", "Reinhard", "Günther", "Gerd", "Fritz", "Otto", "Friedrich", "Erwin", "Lothar", "Robert", "Dirk", "Johannes", "Volker", "Richard", "Anton", "Jens", "Hubert", "Udo", "Holger", "Albert", "Ludwig", "Dietmar", "Hartmut", "Reinhold", "Adolf", "Detlef", "Oliver", "Christoph", "Stephan", "Axel", "Reiner", "Alois", "Eberhard", "Heiko", "Daniel", "Sven", "Bruno", "Olaf", "Mario", "Konrad", "Steffen", "Ingo", "Jochen", "Thorsten", "Eugen", "Achim", "Tobias", "Theo", "Emil", "Guido", "Arno", "Marc", "Gustav", "Florian", "Dietrich", "Theodor", "Rene", "Artur", "August", "Edmund", "Arnold"];
const womenNames = ["Emilia", "Mia", "Sophia", "Mila", "Emma", "Hannah", "Lea", "Ella", "Lina", "Clar", "Marie", "Leni", "Lia", "Leonie", "Mathilda", "Louisa", "Maja", "Lilly", "Amelie", "Ida", "Frieda", "Mira", "Charlotte", "Malia", "Neele", "Sophie", "Juna", "Eva", "Carla", "Valentina", "Zoé", "Isabel", "Alina", "Lotte", "Julia", "Klara", "Rosalie", "Amira", "Amalia", "Olivia", "Liana", "Paulina", "Annie", "Stella", "Josephine", "Fiona", "Amelia", "Malea", "Marlene", "Mina", "Malina", "Elisabeth", "Marta", "Pia", "Lucie", "Karlotta", "Jasmin", "Maila", "Aurelia", "Finja", "Freya", "Alma", "Elly", "Emelie", "Marla", "Melissa", "Malou", "Livia", "Ronja", "Ayla", "Emm", "Leila", "Annika", "Greta", "Henni", "Katharina", "Annalena", "Anja", "Anouk", "Viola", "Theresa", "Marleen", "Sina", "Frida", "Veronika", "Bianca", "Sabrina", "Carina", "Tabea", "Fabienne", "Svenja", "Nadine", "Celine", "Alissa", "Yara", "Selma"];

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

// add correct_response to objects array
correctObjects.forEach((object) => object.correct_response = correctKey);

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
const SLICE_SIZE = 24;
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
    correct_response: incorrectKey
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

/**************************************************************************************/

const NEW_PEOPLE_URL =
  "https://raw.githubusercontent.com/saramff/face-recognition-images/refs/heads/master/new-faces/newface_";
const NEW_IMAGES = 48;

// Create pictures array for new images
const newImages = Array.from(
  { length: NEW_IMAGES },
  (_, i) => {
    return {
      img: `${NEW_PEOPLE_URL}${i + 1}.jpg`,
      correct_response: incorrectKey
    }
  }
);

const peopleSliceImgs = peopleSlice.map((person) => {
  return {
    img: person.img,
    correct_response: correctKey
  }
})

const recognitionFaces = [...newImages, ...peopleSliceImgs];

shuffle(recognitionFaces);

// create faces images array to preload them
const recognitionFacesImgs = recognitionFaces.map((face) => face.img);

/**************************************************************************************/

const NAMES_PER_GENDER = 24

const newMenNames = ["Franz", "Martin", "Uwe", "Georg", "Heinrich", "Stefan", "Christian", "Rudolf", "Kurt", "Hermann", "Johann", "Wilhelm", "Siegfried", "Rolf", "Joachim", "Alfred", "Rainer", "Egon", "Erhard", "Sebastian", "Jakob", "Marco", "Harry", "Eduard"];
const newWomenNames = ["Lara", "Anna", "Johanna", "Elisa", "Mara", "Luna", "Thea", "Melina", "Isabella", "Paula", "Nora", "Elina", "Antonia", "Helena", "Victoria", "Sarah", "Lotta", "Merle", "Elena", "Maria", "Laura", "Romy", "Tilda", "Hailey"];
const newNames = [...newMenNames, ...newWomenNames];

const newNamesWithResponse = newNames.map((name) => {
  return {
    name: name,
    correct_response: correctKey
  }
})

const menNamesSlice = getRandomSlice([...menNames], NAMES_PER_GENDER);
const womenNamesSlice = getRandomSlice([...womenNames], NAMES_PER_GENDER);
const menAndWomenSliceNames = [...menNamesSlice, ...womenNamesSlice];

const menAndWomenNamesWithResponse = menAndWomenSliceNames.map((name) => {
  return {
    name: name,
    correct_response: incorrectKey
  }
})

const allNames = [...newNamesWithResponse, ...menAndWomenNamesWithResponse];
shuffle(allNames);


/**************************************************************************************/

/* Initialize jsPsych */
let jsPsych = initJsPsych();

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

/* Welcome message trial */
let welcome = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "Willkommen zum Experiment. Drücken Sie eine beliebige Taste, um zu beginnen.",
};
timeline.push(welcome);


/**************************************************************************************/

/* Instructions trial */
let instructions = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <p>In diesem Experiment werden nacheinander automatisch Gesichter angezeigt.</p>
    <p>Bitte achte genau auf jedes Gesicht und seinen Namen.</p>
    <p>Du musst nichts tun. Die Gesichter erscheinen von selbst und du brauchst nichts weiter zu tun, außer aufmerksam zu sein.</p>
    <p>Drücke eine beliebige Taste, um zu beginnen, wenn du bereit bist.</p>
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

/* Image presentation trial */
let test = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: jsPsych.timelineVariable("stimulus"),
  choices: "NO_KEYS", // Prevent key press
  trial_duration: 1000, // Display each image for 1 second
  post_trial_gap: 500
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
    <p>Nun wirst du eine Reihe von Gesichtern mit einem Objekt und einem dazugehörigen Satz sehen.</p>
    <p>Drücke '${correctKey.toUpperCase()}', wenn der Satz falsch ist, und '${incorrectKey.toUpperCase()}', wenn der Satz richtig ist.</p>
    </p></p>
    <p>Wie in diesem Beispiel: Wenn auf dem Bildschirm Anas Gesicht und ein Teddybär erscheinen und der Satz lautet 'Ana hat einen Stift', drücke '${incorrectKey.toUpperCase()}' (NEIN).</p>
    <br />
    <div>
      <img src='https://raw.githubusercontent.com/saramff/face-recognition-images/refs/heads/master/Example/Ana.jpg'  class="img-instructions" />
      <img src='https://raw.githubusercontent.com/saramff/face-recognition-images/refs/heads/master/Example/Teddy.jpg' class="img-instructions" />
    </div>
    <br />
    <p>Drücke eine beliebige Taste, um zu beginnen.</p>
  `,
  post_trial_gap: 500,
};
timeline.push(instructionsrecognition);

/* Create stimuli array for object presentation */
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

/* Object presentation trial */
let testObjects = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: jsPsych.timelineVariable("stimulus"),
  choices: ['a', 'l'],
  data: {
    task: "response object presentation",
    correct_response: jsPsych.timelineVariable("correct_response"),
    correct_response_meaning: correctKey === jsPsych.timelineVariable("correct_response") ? "YES" : "NO"
  },
  on_finish: function (data) {
    data.correct = jsPsych.pluginAPI.compareKeys(
      data.response,
      data.correct_response
    );
  },
};

/* Test procedure: fixation + object presentation */
let test_objects_procedure = {
  timeline: [fixation, testObjects],
  timeline_variables: test_objects_stimuli,
  randomize_order: true, // Randomize object order
};
timeline.push(test_objects_procedure);


/**************************************************************************************/

/* Instructions for Tetris */
let instructionstetris = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <p>Jetzt wirst du für etwa 20 Minuten Tetris spielen.</p>
    <p>Benutze die Pfeiltasten auf der Tastatur, um die Teile zu bewegen.</p>
    </p></p>
    <p>Drücke die Leertaste, um zu beginnen. Wenn der Spielbildschirm erscheint, klicke auf 'Play', um das Spiel zu starten.</p>
    <p>Wenn du verlierst, wähle 'Try again', um das Spiel neu zu starten. Du wirst auf diese Weise spielen, bis die Zeit abläuft.</p>
    <p>Drücke eine beliebige Taste, um zu beginnen.<p>
  `,
  post_trial_gap: 500,
};
timeline.push(instructionstetris);

/* Tetris */
let tetris = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <div class="tetris-visible"></div>
  `,
  post_trial_gap: 500,
  choices: "NO_KEYS", // Prevent key press
  trial_duration: 1200000, 
};
timeline.push(tetris);


/**************************************************************************************/

/* Instructions for faces presentation */
let instructionsFacesPresentation = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <p>Als Nächstes wirst du eine Reihe von Gesichtern auf dem Bildschirm sehen.</p>
    </p></p>
    <p>Wenn du das Gesicht zuvor gesehen hast, drücke '${correctKey.toUpperCase()}' (ja).</p>
    <p>Wenn du das Gesicht nicht gesehen hast, drücke '${incorrectKey.toUpperCase()}' (nein).</p>
    <p>Drücke eine beliebige Taste, um zu beginnen.<p>
  `,
  post_trial_gap: 500,
};
timeline.push(instructionsFacesPresentation);

/* Create stimuli array for faces presentation */
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

/* Faces presentation trial */
let testFaces = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: jsPsych.timelineVariable("stimulus"),
  choices: ['a', 'l'],
  data: {
    task: "response faces test",
    correct_response: jsPsych.timelineVariable("correct_response"),
    correct_response_meaning: correctKey === jsPsych.timelineVariable("correct_response") ? "YES" : "NO"
  },
  on_finish: function (data) {
    data.correct = jsPsych.pluginAPI.compareKeys(
      data.response,
      data.correct_response
    );
  },
};

/* Test procedure: fixation + faces presentation */
let test_faces_procedure = {
  timeline: [fixation, testFaces],
  timeline_variables: face_recognition_stimuli,
  randomize_order: true, // Randomize faces order
};
timeline.push(test_faces_procedure);


/**************************************************************************************/

/* Instructions for name presentation */
let instructionsNamePresentation = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <p>Als Nächstes wirst du eine Reihe von Namen auf dem Bildschirm sehen.</p>
    </p></p>
    <p>Wenn du das Namen zuvor gesehen hast, drücke '${correctKey.toUpperCase()}' (ja).</p>
    <p>Wenn du das Namen nicht gesehen hast, drücke '${incorrectKey.toUpperCase()}' (nein).</p>
    <p>Drücke eine beliebige Taste, um zu beginnen.<p>
  `,
  post_trial_gap: 500,
};
timeline.push(instructionsNamePresentation);

/* Create stimuli array for name presentation */
let name_recognition_stimuli = allNames.map((name) => {
  return {
    stimulus: `
      <h2 class="names-experiment">${name.name}</h2>
    `,
    correct_response: name.correct_response
  };
});

/* Name presentation trial */
let testNames = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: jsPsych.timelineVariable("stimulus"),
  choices: ['a', 'l'],
  data: {
    task: "response name test",
    correct_response: jsPsych.timelineVariable("correct_response"),
    correct_response_meaning: correctKey === jsPsych.timelineVariable("correct_response") ? "YES" : "NO"
  },
  on_finish: function (data) {
    data.correct = jsPsych.pluginAPI.compareKeys(
      data.response,
      data.correct_response
    );
  },
};

/* Test procedure: fixation + name presentation */
let test_names_procedure = {
  timeline: [fixation, testNames],
  timeline_variables: name_recognition_stimuli,
  randomize_order: true, // Randomize name order
};
timeline.push(test_names_procedure);


/************************************************************************** */

// Generate a random subject ID with 15 characters
var subject_id = jsPsych.randomization.randomID(15);
jsPsych.data.addProperties({
  subject: subject_id,
});


function saveData(name, data){
  console.log("Función saveData llamada");
  console.log("Guardando datos:", name, data);

  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'write_data.php'); 
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({filename: name, filedata: data}));

  console.log("Datos enviados");
};

var save_data_block = {
  type: jsPsychCallFunction,
  func: function(){saveData("data/Subject_"+ subject_id, jsPsych.data.get().csv());},
  timing_post_trial: 200
};

timeline.push(save_data_block)


var verguetungsfrage = {
  type: jsPsychHtmlButtonResponse,
  stimulus: '<div class="custom-style">Sie haben das Ende der Studie erreicht. Vielen Dank, dass Sie teilgenommen haben. Welche Verg&uumltung m&oumlchten Sie f&uumlr dieses Experiment?</div>',
  choices: ['<div style="font-size:24px;">VP-Stunde (1/2)', '<div style="font-size:24px;">Gewinnspiel</div>'],
  on_finish: function(data) {
    if(data.response == 0) {
        window.location.href = 'verguetung_b.html';
    } else {
        window.location.href = 'verguetung_a.html';
    }
  }
};

 
timeline.push(verguetungsfrage);


//var html_block_bezahlung = {
//  type: jsPsychExternalHtml,
//  url: "verguetung.html"
//};

//timeline.push(html_block_bezahlung);


/* Run the experiment */
jsPsych.run(timeline);
