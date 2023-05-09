let timeline = []

const dass_scale = [
  'Did not apply to me at all',
  'Applied to me to some degree, or some of the time',
  'Applied to me to a considerable degree or a good part of time',
  'Applied to me very much or most of the time'
]

const dass21_questions = [
  'I found it hard to wind down.',
  'I was aware of dryness of my mouth.',
  'I couldn’t seem to experience any positive feeling at all.',
  'I experienced breathing difficulty (e.g., excessively rapid breathing, breathlessness in the absence of physical exertion).',
  'I found it difficult to work up the initiative to do things.',
  'I tended to over-react to situations.',
  'I experienced trembling (e.g., in the hands).',
  'I felt that I was using a lot of nervous energy.',
  'I was worried about situations in which I might panic and make a fool of myself.',
  'I felt that I had nothing to look forward to.',
  'I found myself getting agitated.',
  'I found it difficult to relax.',
  'I felt down-hearted and blue.',
  'I was intolerant of anything that kept me from getting on with what I was doing.',
  'I felt I was close to panic.',
  'I was unable to become enthusiastic about anything.',
  'I felt I wasn’t worth much as a person.',
  'I felt that I was rather touchy.',
  'I was aware of the action of my heart in the absence of physical exertion (e.g., sense of heart rate increase, heart missing a beat).',
  'I felt scared without any good reason.'
]

function generate_questions (question_wordings, scale) {
  return question_wordings.map(wording => {
    return {
      prompt: wording,
      labels: dass_scale
    }
  })
}

const questions = generate_questions(dass21_questions, dass_scale)

let test_trial = {
  type: 'survey-likert',
  questions: questions
}

timeline.push(test_trial)

jsPsych.init({
  timeline: timeline,
  on_finish: function () {
    jsPsych.data.displayData()
  }
})
