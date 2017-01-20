$("#submit").click(function(event){
  debugger
  var text = $("#user-text").val()
  text.split(" ").length
  console.log(textData(text))
})

function checkWords(text){
    return text.filter(function(word){
      if (word) {
        return word
      }
    })
}


function getUniqueWords(uniqueWords, words){
    return words.filter(function(word){
      if (uniqueWords.indexOf(word) == -1) {
        uniqueWords.push(word)
        return word
      }
    })
}

function getAverageWordLength(text) {
  var totalLength = text.join("").length
  return (totalLength / text.length).toFixed(1)
}

var uniqueSentences =[]
function averageSentenceLength(text) {
  var sentences = text.split(".")
  sentences.forEach(function(sentence){
    var questions = sentence.split("?")
    questions.forEach(function(questions){
      var exclamations = questions.split("!")
      exclamations.map(addUniqueSentence)
      console.log(exclamations, "exclamations")
    })
    questions.map(addUniqueSentence)
    console.log(questions, "questions")
  })
  console.log(uniqueSentences, "sentences")
  var wordCount = text.split(" ").length;
  return (wordCount / uniqueSentences.length).toFixed(1);
}

function addUniqueSentence(sentence){
  if (uniqueSentences.indexOf(sentence) == -1 && !/[!?.]/.test(sentence) && sentence
){
    uniqueSentences.push(sentence)
  }
}

function tokenizeText(text) {
  return text.toLowerCase().match(/\b[^\s]+\b/g).sort();
}


function textData(text) {
  var uniqueWords = []
  var words = text.split(" ")
  var sentences = text.split("\n")
  var wordCount = words.length
  var numUniqueWords = getUniqueWords(uniqueWords, words).length
  var averageWordLength = getAverageWordLength(words)
  var averageWordsPerSentence = averageSentenceLength(text)


  var textReport = $('#js-text-report');
  textReport.find('#js-word-count').text(wordCount)
  textReport.find('#js-unique-word-count').text(numUniqueWords);
  textReport.find('#js-average-word-length').text(
    averageWordLength + " characters");
  textReport.find('#js-average-sentence-length').text(
    averageWordsPerSentence + " words");
  textReport.removeClass('hidden');
  }
