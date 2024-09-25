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
  images: peopleImages,
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
        <p>In this experiment, you will see faces appear one by one in the center of the screen.</p>
<p>We ask you to pay special attention to each of these faces.</p>
<p>They will all pass automatically, one after the other.</p>
<p>Press any key to begin.</p>
      `,
  post_trial_gap: 500,
};
timeline.push(instructions);

/* define trial stimuli array for timeline variables */
var test_stimuli = peopleImages.map((imgUrl) => {
  return {
    stimulus: imgUrl,
  response: "NO_KEYS"};
});

/* define fixation and test trials */
var fixation = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<div style="font-size:60px;">+</div>',
  choices: "NO_KEYS",
  trial_duration: 500,
  data: {
    task: "fixation",
  },
};

var test = {
  type: jsPsychImageKeyboardResponse,
  stimulus: jsPsych.timelineVariable("stimulus"),
  choices: "NO KEYS",
   },

/* define test procedure */
var test_procedure = {
  timeline: [fixation, test],
  timeline_variables: test_stimuli,
  randomize_order: true,
};
timeline.push(test_procedure);

/* start the experiment */
jsPsych.run(timeline);
