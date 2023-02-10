function main() {
    
}

let gameboard = (function() {

    //cache DOM
    let $boxes = document.querySelectorAll(".box");

    //bind events
    $boxes.forEach(addBoxListener);

    //When a box is clicked, its number will be stored in this value.
    let _currentBox = null;

    function addBoxListener(box) {
        box.addEventListener("click", _setClickedBoxNum);
    }

    //Sets _currentBox to the latest box to be clicked.
    function _setClickedBoxNum() {
        let num = this.dataset.num;
        _currentBox = num
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

    //Assigns the number of the latest box to be clicked to chosenBox.
    chosenBox = gameboard.getClickedBoxNum();
})()

main();