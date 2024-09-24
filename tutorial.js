/* initialize jsPsych */
var jsPsych = initJsPsych({
  on_finish: function () {
    jsPsych.data.displayData();
  },
});

/* create timeline */
var timeline = [];

/* preload images */
var preload = {
  type: jsPsychPreload,
  images: [
    "https://www.jspsych.org/latest/img/blue.png",
    "https://www.jspsych.org/latest/img/orange.png",
  ],
};
timeline.push(preload);

/* define welcome message trial */
var welcome = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "Welcome to the experiment. Press any key to begin.",
};
timeline.push(welcome);

/* define instructions trial */
var instructions = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
        <p>In this experiment, a circle will appear in the center 
        of the screen.</p><p>If the circle is <strong>blue</strong>, 
        press the letter F on the keyboard as fast as you can.</p>
        <p>If the circle is <strong>orange</strong>, press the letter J 
        as fast as you can.</p>
        <div style='width: 700px;'>
        <div style='float: left;'><img src='https://www.jspsych.org/latest/img/blue.png'></img>
        <p class='small'><strong>Press the F key</strong></p></div>
        <div style='float: right;'><img src='https://www.jspsych.org/latest/img/orange.png'></img>
        <p class='small'><strong>Press the J key</strong></p></div>
        </div>
        <p>Press any key to begin.</p>
      `,
  post_trial_gap: 2000,
};
timeline.push(instructions);

/* define trial stimuli array for timeline variables */
var test_stimuli = [
  {
    stimulus: "https://www.jspsych.org/latest/img/blue.png",
    correct_response: "f",
  },
  {
    stimulus: "https://www.jspsych.org/latest/img/orange.png",
    correct_response: "j",
  },
];

/* define fixation and test trials */
var fixation = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<div style="font-size:60px;">+</div>',
  choices: "NO_KEYS",
  trial_duration: function () {
    return jsPsych.randomization.sampleWithoutReplacement(
      [250, 500, 750, 1000, 1250, 1500, 1750, 2000],
      1
    )[0];
  },
  data: {
    task: "fixation",
  },
};

var test = {
  type: jsPsychImageKeyboardResponse,
  stimulus: jsPsych.timelineVariable("stimulus"),
  choices: ["f", "j"],
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

/* define test procedure */
var test_procedure = {
  timeline: [fixation, test],
  timeline_variables: test_stimuli,
  randomize_order: true,
  repetitions: 5,
};
timeline.push(test_procedure);

/* define debrief */
var debrief_block = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function () {
    var trials = jsPsych.data.get().filter({ task: "response" });
    var correct_trials = trials.filter({ correct: true });
    var accuracy = Math.round((correct_trials.count() / trials.count()) * 100);
    var rt = Math.round(correct_trials.select("rt").mean());

    return `<p>You responded correctly on ${accuracy}% of the trials.</p>
      <p>Your average response time was ${rt}ms.</p>
      <p>Press any key to complete the experiment. Thank you!</p>`;
  },
};
timeline.push(debrief_block);

/* start the experiment */
jsPsych.run(timeline);








// import { shuffle } from "./utils.js";

// const PEOPLE_URL = "https://raw.githubusercontent.com/Amaza-ing/images/refs/heads/master/people/";
// const IMAGES_PER_GENDER = 10;

// const personImg = document.querySelector("#person-img");

// let imgSrc = "";

// // Create numeric arrays from 1 to IMAGES_PER_GENDER number and then shuffles them
// const menArray = Array.from({ length: IMAGES_PER_GENDER }, (_, i) => i + 1);
// const womenArray = Array.from({ length: IMAGES_PER_GENDER }, (_, i) => i + 1);
// // console.log("men", menArray);
// // console.log("women", womenArray);
// shuffle(menArray);
// shuffle(womenArray);
// console.log("men shuffled", menArray);
// console.log("women shuffled", womenArray);

// /**
//  *  Initializes men index [mi] & women index [wi] to 0
//  *  Chose gender randomly - Gender: 0 = man; 1 = woman
//  *  Display the chosen picture
//  *  Add one to index for chosen gender
//  */
// let mi = 0;
// let wi = 0;
// let gender = Math.round(Math.random());

// if (gender === 0) {
//   imgSrc = `${PEOPLE_URL}men/man-${menArray[mi]}.PNG`;
//   mi++;
// } else if (gender === 1) {
//   imgSrc = `${PEOPLE_URL}women/woman-${womenArray[wi]}.PNG`;
//   wi++;
// }

// personImg.setAttribute("src", imgSrc);
