var game = new Mastermind();

var colours = [
  "question.gif",
  "yellow.gif",
  "green.gif",
  "blue.gif",
  "red.gif",
  "grey.gif",
  "orange.gif"
];

var prepareBoard = function () {
  for (var i=0; i<109; i++) document.images[i].src = "blank.gif";

  [0, 1, 2, 3].forEach(function (i) {
    document.images[110+i].src = colours[0];
  });
};

var revealAnswer = function () {
  var answer = game.getAnswer();
  [0, 1, 2, 3].forEach(function (i) {
    document.images[110+i].src = colours[answer[i]];
  });
}

if (document.getElementById('switcher')) {
  document.getElementById('switcher').onclick = function (event) {
    var element = this;
    var newType = game.getType() === 0 ? 1 : 0;
    var message = {
      unique: 'Using unique colour rules.<br /><button>Switch to repeated colour rules</button>',
      repeated: 'Using repeated colour rules.<br /><button>Switch to unqiue colour rules</button>'
    };

    element.innerHTML = newType ? message.repeated : message.unique;

    initializeBoard(newType);
  };
}

if (document.getElementById('reloader')) {
  document.getElementById('reloader').onclick = function (event) {
    initializeBoard();
  };
}

if (document.getElementById('revealer')) {
  document.getElementById('revealer').onclick = revealAnswer;
}

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

var initializeRow = function (i) {
  if ( i > 0 ) {
    document.images[ i * 10 - 1 ].src = "blank.gif";
  }
  document.images[ (i+1) * 10 - 1 ].src = "submit.gif";
  [0, 1, 2, 3].forEach(function (j) {
    document.images[ i * 10 + j ].src = colours[0];
  });
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
};

var submitGuess = function (i) {
  var result = game.submitGuess(i);

  if (result === false) return;

  if ( result === true ) {
    gameOver(1);
  } else {
    displayResults(i, result);
    if ( game.getTurn() === -1 ) {
      gameOver(0);
    } else {
      initializeRow(game.getTurn());
    }
  }
};

var rotateColour =  function (i, j) {
  var currentColour = game.rotateColour(i, j);
  document.images[ i * 10 + j ].src = colours[currentColour];
};

var initializeBoard = function (type) {
  prepareBoard();
  game.initialize(type);
  initializeRow(0);
};

initializeBoard();
