var Mastermind = function (gameType) {

  gameType = (gameType === 1) ? 1 : 0;

  var turn;

  var answer;

  var colours = [
    "question.gif",
    "yellow.gif",
    "green.gif",
    "blue.gif",
    "red.gif",
    "grey.gif",
    "orange.gif"
  ];

  var initializeBoard = function(type) {
    type = (type !== undefined) ? type : gameType;
    turn = new Matrix(10, 5);
    answer = makeAnswer(gameType);

    [0, 1, 2, 3].forEach(function (i) {
      document.images[110+i].src = colours[0];
    });

    initializeRow(0);
  };

  var initializeRow = function (i) {
    if ( i === 10 ) {
      gameOver(0);
    } else {
      if ( i > 0 ) {
        document.images[ i * 10 - 1 ].src = "blank.gif";
      }
      document.images[ (i+1) * 10 - 1 ].src = "submit.gif";
      [0, 1, 2, 3].forEach(function (j) {
        document.images[ i * 10 + j ].src = colours[0];
      });
      turn[i][4] = 1;
    }
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

  var revealAnswer = function () {
    var i;
    for (i=0; i<10; i++) {
      turn[i][4] = 0;
    }
    [0, 1, 2, 3].forEach(function (i) {
      document.images[110+i].src = colours[answer[i]];
    });
  };

  var submitGuess = function (i) {
    if ( ! (turn[i][0] && turn[i][1] && turn[i][2] && turn[i][3]) ) return;

    turn[i][4] = 0;

    var guess = [0, 1, 2, 3].map(function (j) {
      return turn[i][j];
    });

    var correct = guess.every(function (v, k) {
      return v === answer[k];
    });

    if ( correct ) {
      gameOver(1);
    } else {
      displayResults(i, reportResults(guess, answer));
      initializeRow(i+1);
    }
  };


  var Matrix = function (r, c) {
    var i, j;
    for (i = 0; i<r; i++) {
      this[i] = [];
      for (j = 0; j<c; j++) {
        this[i][j] = 0;
      }
    }

    return this;
  };

  var rotateColour =  function (i, j) {
    if ( !turn[i][4] ) return;

    n = turn[i][j];
    if (n === 6 ) turn[i][j] = 0;
    else turn[i][j] = n+1;
    document.images[ i * 10 + j ].src = colours[turn[i][j]];
  };

  var gameOver = function (win) {
    if (win) {
      document.images[100].src = "letterW.gif";
      document.images[101].src = "letterI.gif";
      document.images[102].src = "letterN.gif";
      document.images[103].src = "exclaim.gif";
    } else {
      document.images[100].src = "letterL.gif";
      document.images[101].src = "letterO.gif";
      document.images[102].src = "letterS.gif";
      document.images[103].src = "letterE.gif";
    }
    revealAnswer();
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

  var displayResults = function (i, clues) {
    var cluepegs = [
      "blank.gif",
      "black.gif",
      "white.gif"
    ];

    var padded_clues = [0,1,2,3].map(function(v) {
      if (clues[v]) return clues[v];
      return 0;
    });

    // show the result
    [0, 1, 2, 3].forEach(function (j) {
      document.images[ i * 10 + j + 5 ].src = cluepegs[ padded_clues[j] ];
    });
  }

  return {
    reportResults: reportResults,
    rotateColour: rotateColour,
    initializeBoard: initializeBoard,
    submitGuess: submitGuess,
    revealAnswer: revealAnswer,
    gameType: gameType
  };
};
