function main() {
    gameboard.getClickedBoxNum();
}

let gameboard = (function() {

    //cache DOM
    let _boxes = document.querySelectorAll(".box");

    //Add event listener to every box of the gameboard and get its number.
    let getClickedBoxNum = () => {
        _boxes.forEach(addBoxListener);

        function addBoxListener(box) {
            box.addEventListener("click", getBoxNum);
        }

        function getBoxNum() {
            let num = this.dataset.num;
        }
    };

    return {
        getClickedBoxNum: getClickedBoxNum,
    }
})();

main();