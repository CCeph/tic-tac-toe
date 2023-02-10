function main() {
    
}

let gameboard = (function() {

    //cache DOM
    let $boxes = document.querySelectorAll(".box");

    //bind events
    $boxes.forEach(addBoxListener);

    function addBoxListener(box) {
        box.addEventListener("click", getClickedBoxNum);
    }

    function getClickedBoxNum() {
        let num = this.dataset.num;
    }

    //Add event listener to every box of the gameboard and get its number.

    return {
        
    }
})();

main();