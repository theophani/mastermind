var game = new Mastermind();
game.initializeBoard();

if (document.getElementById('switcher')) {
  document.getElementById('switcher').onclick = function (event) {
    var element = this;
    var newType = game.gameType === 0 ? 1 : 0;
    var message = {
      unique: 'Using unique colour rules.<br /><button>Switch to repeated colour rules</button>',
      repeated: 'Using repeated colour rules.<br /><button>Switch to unqiue colour rules</button>'
    };

    element.innerHTML = game.gameType ? message.repeated : message.unique;

    for (var i=0; i<109; i++) document.images[i].src = "blank.gif";

    game.initializeBoard(newType);
  };
}

if (document.getElementById('reloader')) {
  document.getElementById('reloader').onclick = function (event) {
    for (var i=0; i<109; i++) document.images[i].src = "blank.gif";

    game.initializeBoard();
  };
}

if (document.getElementById('revealer')) {
  document.getElementById('revealer').onclick = game.revealAnswer;
}
