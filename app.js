var gameType = 0;

var turn;

var colours = [
  "question.gif",
  "yellow.gif",
  "green.gif",
  "blue.gif",
  "red.gif",
  "grey.gif",
  "orange.gif"
];

var initializeBoard = function() {
  turn = new Matrix(10, 5);
  var answer = makeAnswer(gameType);

  [0, 1, 2, 3].forEach(function (i) {
    document.images[110+i].src = colours[0];
  });

  window.revealAnswer = function () {
    var i;
    for (i=0; i<10; i++) {
      turn[i][4] = 0;
    }
    [0, 1, 2, 3].forEach(function (i) {
      document.images[110+i].src = colours[answer[i]];
    });
  };

  window.submitGuess = function (i) {
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


var reportResults = function (guess, reference) {
  var answer = reference.map(function (v) { return v; });
  var picks = guess.map(function (v) { return v; });

  var exact_indices = picks.map(function( pick, index ) {
    return (pick === reference[index]) ? index : -1;
  });

  var right_indices = [];

  picks.forEach(function( pick, index ) {
    if (exact_indices.indexOf(index) > -1) return;
    if (right_indices.indexOf(reference.indexOf(pick)) > -1) return;
    if (exact_indices.indexOf(reference.indexOf(pick)) > -1) return;

    right_indices.push(reference.indexOf(pick));
  });

  exact_indices = exact_indices.map(function(v) { return v < 0 ? 0 : 2; }).filter(function(v) { return v > 0; });
  right_indices = right_indices.map(function(v) { return v < 0 ? 0 : 1; }).filter(function(v) { return v > 0; });

  return exact_indices.concat(right_indices);
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

var reloadGame = function () {
  var i;
  for (i=0; i<109; i++) document.images[i].src = "blank.gif";
  initializeBoard();
};

var toggleType = function (event) {
  var element = this;
  var message = {
    unique: 'Using unique colour rules.<br /><button>Switch to repeated colour rules</button>',
    repeated: 'Using repeated colour rules.<br /><button>Switch to unqiue colour rules</button>'
  };

  gameType = gameType === 0 ? 1 : 0;
  element.innerHTML = gameType ? message.repeated : message.unique;
  reloadGame();
};

document.getElementById('switcher').onclick = toggleType;

initializeBoard();

// tests! :o

var should = function(a, b) {

  var equal = true;

  a.forEach(function(v, i) {
    equal = v === b[i] && equal;
  });

  if (equal) {
    console.log(true);
  } else {
    console.log(a, 'is not ===', b);
  }
};

var ref = ['b', 'a', 'f', 'a'];

should( reportResults(['a', 'd', 'e', 'a'], ref), [2, 1] );
should( reportResults(['b', 'b', 'a', 'b'], ref), [2, 1] );
should( reportResults(['c', 'b', 'f', 'a'], ref), [2, 2, 1] );
should( reportResults(['a', 'b', 'a', 'e'], ref), [1, 1, 1] );
should( reportResults(['c', 'a', 'a', 'e'], ref), [2, 1] );
should( reportResults(['f', 'f', 'e', 'e'], ref), [1] );
should( reportResults(['f', 'f', 'e', 'e'], ['e', 'a', 'b', 'c']), [1] );
should( reportResults(['f', 'f', 'e', 'e'], ['a', 'b', 'c', 'e']), [2] );
