var gameType = 0;

var cluepegs = [
  "blank.gif",
  "black.gif",
  "white.gif"
];

var colours = [
  "question.gif",
  "yellow.gif",
  "green.gif",
  "blue.gif",
  "red.gif",
  "grey.gif",
  "orange.gif"
];

var answer,
    dummyanswer,
    guess,
    clues,
    turn;

var toggleType = function (element) {
  var message = {
    unique: 'Using unique colour rules.<br /><button>Switch to repeated colour rules</button>',
    repeated: 'Using repeated colour rules.<br /><button>Switch to unqiue colour rules</button>'
  };

  gameType = gameType === 0 ? 1 : 0;
  element.innerHTML = gameType ? message.repeated : message.unique;
  reloadGame();
};

var initializeVariables = function () {
  answer = [];
  dummyanswer = [];
  guess = [];
  clues = [];
  turn = new Matrix(12, 10);
};


var initializeBoard = function() {
  initializeVariables();
  makeAnswer(gameType);
  for (var i=0; i<4; i++) {
    document.images[110+i].src = "question.gif";
  }
  initializeNext(1);
};

var initializeNext = function (i) {
  if ( i==11 ) {
    gameOver(0);
  } else {
    if ( i>1 ) {
      document.images[ (i-1)*10 - 1 ].src = "blank.gif";
    }
    document.images[ i*10 - 1 ].src = "submit.gif";
    for (var j=0; j<4; j++){
      document.images[ (i-1)*10 + j ].src = colours[0];
    }
    turn[i][5] = 1;
  }
};

var makeAnswer = function (type) {
  var options = [6, 5, 4, 3, 2, 1];
  var i, j;
  if (type === 1) { // repeated
    for (i = 0; i < 4; i++) {
      j = Math.round(Math.random() * 5);
      answer[i+1] = options[j];
    }
  } else { // unique
    for (i = 0; i < 4; i++) {
      j = Math.round(Math.random() * (5 - i));
      answer[i+1] = options[j];
      options[j] = 0;
      mySort(options,7-i);
    }
  }
};

var Matrix = function (r, c) {
  var i, j;
  for (i = 1; i<=r; i++) {
    this[i] = [];
    for (j = 1; j<=c; j++) {
      this[i][j]     = 0;
    }
  }

  return this;
};

var turnStatus = function (i, j) {
  if ( turn[i][5] ) {
    if ( j < 5 ) {
      rotateColour(i,j);
    } else if ( j==10 && turn[i][1] && turn[i][2] && turn[i][3] && turn[i][4] ) {
      submitGuess(i);
    }
  }
};

var rotateColour =  function (i, j) {
  n = turn[i][j];
  if (n == 6 ) turn[i][j] = 0;
  else turn[i][j] = n+1;
  document.images[ (i-1)*10 + (j-1) ].src = colours[turn[i][j]];
};

var submitGuess = function (i) {
  var j;
  turn[i][5] = 0;
  for (j=1; j<=4; j++) {
    guess[j] = turn[i][j];
  }
  if ( (guess[1] == answer[1]) && (guess[2] == answer[2]) && (guess[3] == answer[3]) && (guess[4] == answer[4]) ) {
    gameOver(1);
  } else {
    reportResults(i);
    initializeNext(i+1);
  }
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


var reportResults = function (i) {
  var j;
  for (j=1; j<=4; j++) {
    dummyanswer[j] = answer[j];
    clues[j] = 0;
  }
  for (j=1; j<=4; j++) {
    if ( guess[j] == dummyanswer[j] ) {
      clues[j] = 2;
      guess[j] = 0;
      dummyanswer[j] = 7;
    }
  }
  for (j=1; j<=4; j++) {
    if ( guess[1] == dummyanswer[j] ) {
      clues[j] = 1;
      guess[1] = 0;
      dummyanswer[j] = 7;
    } else if ( guess[2] == dummyanswer[j] ) {
      clues[j] = 1;
      guess[2] = 0;
      dummyanswer[j] = 7;
    } else if ( guess[3] == dummyanswer[j] ) {
      clues[j] = 1;
      guess[3] = 0;
      dummyanswer[j] = 7;
    } else if ( guess[4] == dummyanswer[j] ) {
      clues[j] = 1;
      guess[4] = 0;
      dummyanswer[j] = 7;
    }
  }
  mySort(clues,4);
  for (j=1; j<=4; j++) {
    document.images[ (i-1)*10 + j + 4 ].src = cluepegs[ clues[j] ];
  }
};

var mySort = function (myArray, n) {
  var i, j, temp;
  for (i=1; i<n; i++) {
    for (j=(i+1); j<=n; j++) {
      if ( myArray[j] > myArray[i]) {
        temp = myArray[i];
        myArray[i] = myArray[j];
        myArray[j] = temp;
      }
    }
  }
};

var reloadGame = function () {
  var i;
  for (i=0; i<109; i++) document.images[i].src = "blank.gif";
  initializeBoard();
};

var revealAnswer = function () {
  var i;
  for (i=1; i<=10; i++) {
    turn[i][5] = 0;
  }
  for (i=1; i<=4; i++) {
    document.images[109+i].src = colours[answer[i]];
  }

};

initializeBoard();
