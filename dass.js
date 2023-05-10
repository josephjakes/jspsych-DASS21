// let timeline = []

// const dass_scale = [
//   'Did not apply to me at all',
//   'Applied to me to some degree, or some of the time',
//   'Applied to me to a considerable degree or a good part of time',
//   'Applied to me very much or most of the time'
// ]

const dass21_items = [
  'I found it hard to wind down.',
  'I was aware of dryness of my mouth.',
  // 'I couldn’t seem to experience any positive feeling at all.',
  // 'I experienced breathing difficulty (e.g., excessively rapid breathing, breathlessness in the absence of physical exertion).',
  // 'I found it difficult to work up the initiative to do things.',
  // 'I tended to over-react to situations.',
  // 'I experienced trembling (e.g., in the hands).',
  // 'I felt that I was using a lot of nervous energy.',
  // 'I was worried about situations in which I might panic and make a fool of myself.',
  // 'I felt that I had nothing to look forward to.',
  // 'I found myself getting agitated.',
  // 'I found it difficult to relax.',
  // 'I felt down-hearted and blue.',
  // 'I was intolerant of anything that kept me from getting on with what I was doing.',
  // 'I felt I was close to panic.',
  // 'I was unable to become enthusiastic about anything.',
  // 'I felt I wasn’t worth much as a person.',
  // 'I felt that I was rather touchy.',
  // 'I was aware of the action of my heart in the absence of physical exertion (e.g., sense of heart rate increase, heart missing a beat).',
  // 'I felt scared without any good reason.'
]

// function generate_questions (question_wordings, scale) {
//   return question_wordings.map(wording => {
//     const prompt_html = `<span style="font-size:20px;">${wording}</span>`;
//     return {
//       prompt: prompt_html,
//       labels: dass_scale
//     }
//   })
// }

// const questions = generate_questions(dass21_questions, dass_scale)

// let test_trial = {
//   type: 'survey-likert',
//   questions: questions,
// }

// timeline.push(test_trial)

// jsPsych.init({
//   timeline: timeline,
//   on_finish: function () {
//     jsPsych.data.displayData()
//   }
// })


// // Define DASS21 questionnaire items
// let dass21_items = [  "I found it hard to wind down",  "I was aware of dryness of my mouth",  "I couldn’t seem to experience any positive feeling at all",  "I experienced breathing difficulty (e.g., excessively rapid breathing, breathlessness in the absence of physical exertion)",  "I found it difficult to work up the initiative to do things",  "I tended to over-react to situations",  "I experienced trembling (e.g., in the hands)",  "I felt that I was using a lot of nervous energy",  "I was worried about situations in which I might panic and make a fool of myself",  "I felt that I had nothing to look forward to",  "I found myself getting agitated",  "I found it difficult to relax",  "I felt down-hearted and blue",  "I was intolerant of anything that kept me from getting on with what I was doing",  "I felt I was close to panic",  "I was unable to become enthusiastic about anything",  "I felt I wasn’t worth much as a person",  "I felt that I was rather touchy",  "I was aware of the action of my heart in the absence of physical exertion (e.g., sense of heart rate increase, heart missing a beat)",  "I felt scared without any good reason",  "I felt that life was meaningless",];

// // Define DASS21 questionnaire scale labels
let dass21_scale_labels = [  "Did not apply to me at all",  "Applied to me to some degree, or some of the time",  "Applied to me to a considerable degree, or a good part of time",  "Applied to me very much, or most of the time",];

// Define DASS21 questionnaire instructions
let dass21_instructions = "<p>Please indicate the extent to which you have experienced each of the following over the past week.</p>";

function generate_questions (question_wordings, scale) {
  return question_wordings.map(wording => {
    const prompt_html = `<span style="font-size:20px;">${wording}</span>`;
    return {
      prompt: prompt_html,
      labels: scale,
      options: dass21_scale_labels,
    }
  });
}

const questions = generate_questions(dass21_items, dass21_scale_labels)

// Define DASS21 questionnaire trial
let dass21_trial = {
  type: "survey-likert",
  questions: questions,
  options: dass21_scale_labels,
  preamble: dass21_instructions,
};

// Define function to calculate subscale scores
function calculateSubscaleScore(subscaleItems) {
  let subscaleScore = 0;
  for (let i = 0; i < subscaleItems.length; i++) {
    subscaleScore += jsPsych.data.get().last(1).values()[0][subscaleItems[i]];
  }
  return subscaleScore;
}

// Define function to calculate DASS21 scores
function calculateDASS21Scores() {
  let anxietyItems = [0, 1, 5, 9, 11, 15, 19];
  let depressionItems = [2, 4, 7, 12, 13, 16, 18];
  let stressItems = [3, 6, 8, 10, 14, 17, 20];
  let anxietyScore = calculateSubscaleScore(anxietyItems);
  let depressionScore = calculateSubscaleScore(depressionItems);
  let stressScore = calculateSubscaleScore(stressItems);
  return {
    anxiety: anxietyScore,
    depression: depressionScore,
    stress: stressScore,
  };
}

// Define DASS21 questionnaire trial with callback function to calculate scores
let dass21_trial_with_scores = {
  timeline: [dass21_trial],
  on_finish: function(data) {
    let scores = calculateDASS21Scores();
    data.anxiety_score = scores.anxiety;
    data.depression_score = scores.depression;
    data.stress_score = scores.stress;
  },
};

// Define experiment timeline
let timeline = [dass21_trial_with_scores];

// Run the experiment
jsPsych.init({
  timeline: timeline,
  on_finish: function() {
    jsPsych.data.displayData();
  }
});

