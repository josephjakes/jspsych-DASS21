

var jsPsych = initJsPsych({
    on_finish: function(data) {
        jsPsych.data.displayData('csv');
    }
});

let questions = [  "I found it hard to wind down",  "I was aware of dryness of my mouth",  "I couldn’t seem to experience any positive feeling at all",  "I experienced breathing difficulty (e.g., excessively rapid breathing, breathlessness in the absence of physical exertion)",  "I found it difficult to work up the initiative to do things",  "I tended to over-react to situations",  "I experienced trembling (e.g., in the hands)",  "I felt that I was using a lot of nervous energy",  "I was worried about situations in which I might panic and make a fool of myself",  "I found myself getting agitated",  "I found it difficult to relax",  "I felt down-hearted and blue",  "I was intolerant of anything that kept me from getting on with what I was doing",  "I felt I was close to panic",  "I was unable to become enthusiastic about anything",  "I felt I wasn’t worth much as a person",  "I felt that I was rather touchy",  "I was aware of the action of my heart in the absence of physical exertion (e.g., sense of heart rate increase, heart missing a beat)",  "I felt scared without any good reason",  "I felt that life was meaningless"];

function makeDass21Trial(question) {
    let trial = {
      type: 'survey-likert',
      questions: [{
        prompt: question,
        labels: ["Did not apply to me at all", "Applied to me to some degree, or some of the time", "Applied to me to a considerable degree or a good part of the time", "Applied to me very much or most of the time"],
        required: true
      }],
      scale_width: 500
    };
    return trial;
  }

let timeline = [];

for (const question of questions) {
  timeline.push(makeDass21Trial(question));
}

let end_trial = {
    type: 'html-keyboard-response',
    stimulus: '<p>The experiment is now complete. Press any key to exit.</p>'
};
timeline.push(end_trial);

jsPsych.run(timeline);