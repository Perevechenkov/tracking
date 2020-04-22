import "../css/style.css"

(() => {
    let hamburger = document.querySelector(".hamburger");

    changeStatus(hamburger);

    function changeStatus(node) {
        node.addEventListener("click",
            function (event) {
                event.preventDefault();
                this.classList.contains("is-active") === true ?
                    this.classList.remove("is-active") :
                    this.classList.add("is-active");
            });
    }
})();
