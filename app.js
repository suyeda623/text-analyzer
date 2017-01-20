
$('#submit').click(function (event){
  var $textarea = $('#user-text')
  var text = $textarea.val()
  var isNotError = !$('#error').length
  if (text) {
    var results = textAnalyzer(text)
    console.log(results)
  } else if (isNotError) {
    $textarea.after('<p id="error">Error: This field is required!</p>')
    $textarea.addClass('error')
  }
})

$('#user-text').click(function (event){
  $(event.target).removeClass('error')
  $('#error').remove()
})

function textAnalyzer (text) {
  var uniqueWords = []
  var uniqueSentences = []
  var words = text.split(' ')
  var wordCount = words.length
  var numUniqueWords = getUniqueWords(uniqueWords, words).length
  var averageWordLength = getAverageWordLength(words)
  var averageWordsPerSentence = getAverageSentenceLength(uniqueSentences, text)
  showResults(wordCount, numUniqueWords, averageWordLength, averageWordsPerSentence)
}

function getUniqueWords (uniqueWords, words){
  return words.filter(function (word){
    if (uniqueWords.indexOf(word) == -1) {
      uniqueWords.push(word)
      return word
    }
  })
}

function getAverageWordLength (text) {
  var totalLength = text.join('').length
  return (totalLength / text.length).toFixed(1)
}

function getAverageSentenceLength (uniqueSentences, text) {
  var sentences = text.split('.')
  sentences.forEach(function (sentence) {
    findSentences(sentence, uniqueSentences)
  })
  console.log(uniqueSentences, 'sentences')
  var wordCount = text.split(' ').length
  return (wordCount / uniqueSentences.length).toFixed(1)
}

function addUniqueSentence (sentence, uniqueSentences){
  var isUnique = (uniqueSentences.indexOf(sentence) == -1)
  var hasNotMoreSentences = !/[!?.]/.test(sentence)
  var isNotEmpty = sentence
  if (isUnique && hasNotMoreSentences && isNotEmpty){
    uniqueSentences.push(sentence)
  }
}

function findSentences (sentence, uniqueSentences){
  var questions = sentence.split('?')
  questions.forEach(function (question) {
    findQuestions(question, uniqueSentences)
  })
  questions.map(function (question) {
    addUniqueSentence(question, uniqueSentences)
  })
  console.log(questions, 'questions')
}

function findQuestions (questions, uniqueSentences){
  var exclamations = questions.split('!')
  exclamations.map(function (exclamation) {
    addUniqueSentence(exclamation, uniqueSentences)
  })
  console.log(exclamations, 'exclamations')
}

function showResults (wordCount, numUniqueWords, averageWordLength, averageWordsPerSentence) {
  var $textReport = $('#js-text-report')
  $textReport.find('#js-word-count').text(wordCount)
  $textReport.find('#js-unique-word-count').text(numUniqueWords)
  $textReport.find('#js-average-word-length').text(averageWordLength + ' characters')
  $textReport.find('#js-average-sentence-length').text(averageWordsPerSentence + ' words')
  $textReport.removeClass('hidden')
}
