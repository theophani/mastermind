var Mastermind = function (type) {

  var type = (type === 1) ? 1 : 0;

  var turn;

  var guesses;

  var answer;

  var initialize = function (gameType) {
    type = (gameType !== undefined) ? gameType : type;
    guesses = (function (r, c) {
      var i;
      var m = [];

      while (m.length < r) {
        m.push([]);
        i = m.length - 1;
        while (m[i].length < c) {
          m[i].push(0);
        }
      }

      return m;
    })(10, 5);

    turn = 0;
    answer = makeAnswer(type);
  };

  var makeAnswer = function (type) {
    var answer = [];
    var options = [1, 2, 3, 4, 5, 6];
    var i, j;
    [0, 1, 2, 3].forEach(function (i) {
      j = Math.floor(Math.random() * options.length);
      answer[i] = options[j];
      if (type === 0) { // unique, therefore remove options
        options[j] = 0;
        options.sort();
        options.shift();
      }
    });
    return answer;
  };

  var submitGuess = function (i) {
    if ( ! (guesses[i][0] && guesses[i][1] && guesses[i][2] && guesses[i][3]) ) return false;

    var guess = [0, 1, 2, 3].map(function (j) {
      return guesses[i][j];
    });

    var correct = guess.every(function (v, k) {
      return v === answer[k];
    });

    if ( correct ) {
      turn = -1;
      return true;
    } else {
      turn = i + 1;
      if (turn === 10) {
        turn = -1;
      }
      return reportResults(guess, answer);
    }
  };

  var rotateColour =  function (i, j) {
    var n = guesses[i][j];

    if ( turn != i ) return n;

    if (n === 6 ) guesses[i][j] = 0;
    else guesses[i][j] = n + 1;

    return guesses[i][j];
  };

  var reportResults = function (picks, answer) {

    var clues = [];

    picks.forEach(function( pick, index ) {
      if (pick === answer[index]) {
        clues[index] = 2;
      } else {

        var position = answer.map(function(v,i) { return i; }).filter(function(i) {
          return clues[i] === undefined && answer[i] === pick;
        })[0];

        if (position !== undefined) {
          clues[position] = 1;
        }
      }
    });

    return clues.filter(function (v) { return v !== undefined }).sort().reverse();
  };

  var getTurn = function () {
    return turn;
  };

  var getType = function () {
    return type;
  };

  var getAnswer = function () {
    turn = -1;
    return answer;
  };

  return {
    reportResults: reportResults,
    rotateColour: rotateColour,
    initialize: initialize,
    submitGuess: submitGuess,
    getType: getType,
    getTurn: getTurn,
    getAnswer: getAnswer
  };
};
