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
                events.emit("gameStateUpdated", "player2 turn");
            } else if (_currentPlayer === player2) {
                _currentPlayer = player1;
                events.emit("gameStateUpdated", "player1 turn");
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
        let row1Match = (_gameArray[0] === _gameArray[1] && _gameArray[1] ===  _gameArray[2] && _gameArray[0] != null);

        let row2Match = (_gameArray[3] === _gameArray[4] && _gameArray[4] === _gameArray[5] && _gameArray[3] != null)

        let row3Match = (_gameArray[6] === _gameArray[7] && _gameArray[7] === _gameArray[8] && _gameArray[6] != null)

        let col1Match = (_gameArray[0] === _gameArray[3] && _gameArray[3] === _gameArray[6] && _gameArray[0] != null)

        let col2Match = (_gameArray[1] === _gameArray[4] && _gameArray[4] === _gameArray[7] && _gameArray[1] != null)

        let col3Match = (_gameArray[2] === _gameArray[5] && _gameArray[5] === _gameArray[8] && _gameArray[2] != null)

        let diag1Match = (_gameArray[0] === _gameArray[4] && _gameArray[4] === _gameArray[8] && _gameArray[0] != null)

        let diag2Match = (_gameArray[2] === _gameArray[4] && _gameArray[4] === _gameArray[6] && _gameArray[2] != null)


        //Checks for any of the winning matches. If any are found
        //it retrieves the winning symbol in order to figure out the winner.
        let winningSymbol = undefined;

        if (row1Match || col1Match) {
            winningSymbol = _gameArray[0];
        } else if (row3Match || col3Match) {
            winningSymbol = _gameArray[8];
        } else if (row2Match || col2Match || diag1Match || diag2Match) {
            winningSymbol = _gameArray[4];
        }

        //Checks if winningSymbol matches the symbol of either player. If it does,
        //that player is picked as the winner.
        if (winningSymbol === player1.getSymbol()) {
            events.emit("gameStateUpdated", "player1 won");
        } else if (winningSymbol === player2.getSymbol()) {
            events.emit("gameStateUpdated", "player2 won");
        }

    }

    function getGameArray() {
        return _gameArray;
    }

    return {
        getGameArray: getGameArray,
    }
})();

let displayController = (function () {
    
    //cache DOM
    $gameState = document.querySelector(".state-display");

    //bind events
    events.on("gameStateUpdated", renderGameState);

    function renderGameState(condition) {
        switch (condition) {
            case "player1 turn":
                $gameState.textContent = "Player 1's Turn";
                break;
            case "player2 turn":
                $gameState.textContent = "Player 2's Turn";
                break;
            case "player1 won":
                $gameState.textContent = "Player 1 Won";
                break;
            case "player2 won":
                $gameState.textContent = "Player 2 Won";
                break;
        }
    }

    return {
        
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