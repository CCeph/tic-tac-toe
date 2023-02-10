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

let gameboard = (function() {

    //cache DOM
    let $boxes = document.querySelectorAll(".box");

    //bind events
    $boxes.forEach(addBoxListener);

    //When a box is clicked, its number will be stored in this value.
    let _currentBox = null;

    function _render() {
        events.emit('boxSelected', _currentBox);
    }

    function addBoxListener(box) {
        box.addEventListener("click", _setClickedBoxNum);
    }

    //Sets _currentBox to the latest box to be clicked.
    function _setClickedBoxNum() {
        let num = this.dataset.num;
        _currentBox = num
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

    //bind events
    events.on('boxSelected', _updateGameArray);

    function _updateGameArray(chosenBox) {
        _gameArray[chosenBox] = "X";
        console.log(_gameArray);
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

let player1 = createPlayer("player1", "X");
let player2 = createPlayer("player2", "O");

main();