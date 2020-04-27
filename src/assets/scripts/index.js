import "@scss/style.scss"
import info from "@images/info-01.svg"
import map from "@images/map-01.svg"
import active from "@images/active-01.svg"
import noactive from "@images/noactive-01.svg"


let infoImg = document.getElementById("info__icon");
infoImg.src = info;

let mapImgs = document.getElementsByClassName("map__icon");

for (var i = mapImgs.length - 1; i >= 0; i--) {
    var mapImg = mapImgs[i];
    mapImg.src = map;
  };


let statusImg1 = document.getElementById("status__icon-1");
let statusImg2 = document.getElementById("status__icon-2");
let statusImg3 = document.getElementById("status__icon-3");
let statusImg4 = document.getElementById("status__icon-4");
statusImg1.src = active;
statusImg2.src = noactive;
statusImg3.src = noactive;
statusImg4.src = noactive;
