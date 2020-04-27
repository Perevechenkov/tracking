import "@scss/style.scss"

let mapImgs = document.getElementsByClassName("map__icon");

for (var i = mapImgs.length - 1; i >= 0; i--) {
  var mapImg = mapImgs[i];
  mapImg.src = map;
};

function make() {

  let statImgs = document.querySelectorAll("stat__icon");

  for (var i = statImgs.length - 1; i >= 0; i--) {
    var statImg = statImgs[i];
    changeStatus(statImg);
  };

  function changeStatus(node) {
    node.classList.contains("is-active") === true ?
      node.classList.remove("is-active") :
      node.classList.add("is-active");
  };
}