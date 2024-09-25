/**
 * Sara's Experiment
 * Some info...
 *
 */

const PEOPLE_URL =
  "https://raw.githubusercontent.com/Amaza-ing/images/refs/heads/master/people/";
const IMAGES_PER_GENDER = 10;

// Create arrays from picture 1 to IMAGES_PER_GENDER
const menImages = Array.from(
  { length: IMAGES_PER_GENDER },
  (_, i) => `${PEOPLE_URL}/men/man-${i + 1}.PNG`
);
const womenImages = Array.from(
  { length: IMAGES_PER_GENDER },
  (_, i) => `${PEOPLE_URL}/women/woman-${i + 1}.PNG`
);
const peopleImages = [...menImages, ...womenImages];

/* initialize jsPsych */
let jsPsych = initJsPsych({
  on_finish: function () {
    jsPsych.data.displayData();
  },
});

/* create timeline */
let timeline = [];

/* preload images */
let preload = {
  type: jsPsychPreload,
  images: peopleImages,
};
timeline.push(preload);

/* define welcome message trial */
let welcome = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "Welcome to the experiment. Press any key to begin.",
};
timeline.push(welcome);

/* define instructions trial */
let instructions = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
        <p>In this experiment, you will see faces appear one by one in the center of the screen.</p>
<p>We ask you to pay special attention to each of these faces.</p>
<p>They will all pass automatically, one after the other.</p>
<p>Press any key to begin.</p>
      `,
  post_trial_gap: 500,
};
timeline.push(instructions);

/* define trial stimuli array for timeline variables */
let test_stimuli = peopleImages.map((imgUrl) => {
  return {
    stimulus: imgUrl,
  response: "NO_KEYS"};
});

/* define fixation and test trials */
let fixation = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<div style="font-size:60px;">+</div>',
  choices: "NO_KEYS",
  trial_duration: 500,
  data: {
    task: "fixation",
  },
};

let test = {
  type: jsPsychImageKeyboardResponse,
  stimulus: jsPsych.timelineVariable("stimulus"),
  choices: "NO KEYS",
   },

/* define instructionsrecognition trial */
let instructionsrecognition = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
        <p>Next, you will see a series of images with an object and a related sentence.</p>
<p>You will need to decide whether the sentence is true or false.</p>
<p>Press the letter A if it is false, and the letter L if it is true.</p>
<p>For example, if the screen shows a picture of Maria and a phone, and the sentence says "Maria has a marker," you should respond false by pressing the A key. If the sentence says "Maria has a phone," you should respond true by pressing the L key.</p>
<p>You will now see some practice examples.</p>
      `,
  post_trial_gap: 500,
};
timeline.push(instructions);

/* define test procedure */
let test_procedure = {
  timeline: [fixation, test],
  timeline_variables: test_stimuli,
  randomize_order: true,
};
timeline.push(test_procedure);

/* start the experiment */
jsPsych.run(timeline);
