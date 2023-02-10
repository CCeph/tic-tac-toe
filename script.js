function main() {
    
}

let gameboard = (function() {

    //cache DOM
    let $boxes = document.querySelectorAll(".box");

    //bind events
    $boxes.forEach(addBoxListener);

    //When a box is clicked, its number will be stored in this value.
    let currentBox = null;

    function addBoxListener(box) {
        box.addEventListener("click", getClickedBoxNum);
    }

    function getClickedBoxNum() {
        let num = this.dataset.num;
        currentBox = num
    }

    //Add event listener to every box of the gameboard and get its number.

    return {
        
    }
})();

let game = (function () {
    
    //Array to hold the value of each box on the gameboard.
    let gameArray = []
})()

main();