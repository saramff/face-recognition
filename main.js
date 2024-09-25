/**
 * Sara's Experiment
 * Some info...
 *
 */

const PEOPLE_URL =
  "https://github.com/saramff/face-recognition-images";
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
  post_trial_gap: 500,
};
timeline.push(instructions);

/* define trial stimuli array for timeline variables */
var test_stimuli = peopleImages.map((imgUrl) => {
  return {
    stimulus: imgUrl,
    correct_response: "f",
  };
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
};
timeline.push(test_procedure);

/* start the experiment */
jsPsych.run(timeline);
