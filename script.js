function main() {
    
}

//events - a super-basic Javascript (publish subscribe) pattern

var events = {
  events: {},
  on: function (eventName, fn) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  },
  off: function(eventName, fn) {
    if (this.events[eventName]) {
      for (var i = 0; i < this.events[eventName].length; i++) {
        if (this.events[eventName][i] === fn) {
          this.events[eventName].splice(i, 1);
          break;
        }
      };
    }
  },
  emit: function (eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(function(fn) {
        fn(data);
      });
    }
  }
};

let player1 = createPlayer("player1", "X");
let player2 = createPlayer("player2", "O");

let gameboard = (function() {

    //cache DOM
    let $boxes = document.querySelectorAll(".box");

    //bind events
    $boxes.forEach(addBoxListener);

    //When a box is clicked, its number will be stored in this value.
    let _currentBox = null;

    function _render() {
        events.emit('boxSelected', _currentBox);
        currentGameArray = game.getGameArray();
        counter = 0
        $boxes.forEach(function (box) {
            box.textContent = currentGameArray[counter];
            counter += 1;
        })
    }

    function addBoxListener(box) {
        box.addEventListener("click", _setClickedBoxNum);
    }

    //Sets _currentBox to the latest box to be clicked.
    function _setClickedBoxNum() {
        let num = this.dataset.num;
        _currentBox = num;
        _render();
    }

    function getClickedBoxNum() {
        return _currentBox;
    }

    return {
        getClickedBoxNum: getClickedBoxNum,
    }
})();

let game = (function () {
    
    //Array to hold the value of each box on the gameboard.
    let _gameArray = [null, null, null, null, null, null, null, null, null]

    let _currentPlayer = player1;

    //bind events
    events.on('boxSelected', _updateGameArray);

    function _updateGameArray(chosenBox) {
        //Check if the current box is already filled
        if (_gameArray[chosenBox] === null) {
            _gameArray[chosenBox] = _currentPlayer.getSymbol();

            //switches players
            if (_currentPlayer === player1) {
                _currentPlayer = player2;
            } else if (_currentPlayer === player2) {
                _currentPlayer = player1;
            } else {
                console.log("error");
            }
        } else {
            return
        }

        _checkWinners();
    }

    function _checkWinners() {
        //The following variables are used to simplify the look of the actual code.
        let row1Match = (_gameArray[0] === player1.getSymbol() && _gameArray[1] === player1.getSymbol() && _gameArray[2] === player1.getSymbol()) || (_gameArray[0] === player2.getSymbol() && _gameArray[1] === player2.getSymbol() && _gameArray[2] === player2.getSymbol())

        let row2Match = (_gameArray[3] === player1.getSymbol() && _gameArray[4] === player1.getSymbol() && _gameArray[5] === player1.getSymbol()) || (_gameArray[3] === player2.getSymbol() && _gameArray[4] === player2.getSymbol() && _gameArray[5] === player2.getSymbol())

        let row3Match = (_gameArray[6] === player1.getSymbol() && _gameArray[7] === player1.getSymbol() && _gameArray[8] === player1.getSymbol()) || (_gameArray[6] === player2.getSymbol() && _gameArray[7] === player2.getSymbol() && _gameArray[8] === player2.getSymbol())

        let col1Match = (_gameArray[0] === player1.getSymbol() && _gameArray[3] === player1.getSymbol() && _gameArray[6] === player1.getSymbol()) || (_gameArray[0] === player2.getSymbol() && _gameArray[3] === player2.getSymbol() && _gameArray[6] === player2.getSymbol())

        let col2Match = (_gameArray[1] === player1.getSymbol() && _gameArray[4] === player1.getSymbol() && _gameArray[7] === player1.getSymbol()) || (_gameArray[4] === player2.getSymbol() && _gameArray[1] === player2.getSymbol() && _gameArray[7] === player2.getSymbol())

        let col3Match = (_gameArray[2] === player1.getSymbol() && _gameArray[5] === player1.getSymbol() && _gameArray[8] === player1.getSymbol()) || (_gameArray[8] === player2.getSymbol() && _gameArray[5] === player2.getSymbol() && _gameArray[2] === player2.getSymbol())

        let diag1Match = (_gameArray[0] === player1.getSymbol() && _gameArray[4] === player1.getSymbol() && _gameArray[8] === player1.getSymbol()) || (_gameArray[0] === player2.getSymbol() && _gameArray[4] === player2.getSymbol() && _gameArray[8] === player2.getSymbol())

        let diag2Match = (_gameArray[2] === player1.getSymbol() && _gameArray[4] === player1.getSymbol() && _gameArray[6] === player1.getSymbol()) || (_gameArray[6] === player2.getSymbol() && _gameArray[4] === player2.getSymbol() && _gameArray[2] === player2.getSymbol())


        //Checks for any of the winning matches. If any are found
        //it congratulates the winner.
        if (row1Match || row2Match || row3Match || col1Match || col2Match || col3Match || diag1Match || diag2Match) {
            console.log("winner")
        }
    }

    function getGameArray() {
        return _gameArray;
    }

    return {
        getGameArray: getGameArray,
    }
})();

function createPlayer(name, symbol) {
    return {
        name: name,
        symbol: symbol,
        getSymbol() {
            return symbol;
        }
    }
}

main();