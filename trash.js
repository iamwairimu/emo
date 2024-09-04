var bin = document.querySelector(".bin");
var dirt = document.querySelector(".dirt");
var binLeft = parseInt(window.getComputedStyle(bin).getPropertyValue("left"));
var binBottom = parseInt(
  window.getComputedStyle(bin).getPropertyValue("bottom")
);
var score = 0;

function moveBinLeft() {
  if (binLeft > 139) {
    binLeft -= 15;
    bin.style.left = binLeft + "px";
  }
}

function moveBinRight() {
  if (binLeft < 740) {
    binLeft += 15;
    bin.style.left = binLeft + "px";
  }
}

function control(e) {
  if (e.key == "ArrowLeft") {
    moveBinLeft();
  }
  if (e.key == "ArrowRight") {
    moveBinRight();
  }
}

document.addEventListener("keydown", control);

function generateDirt() {
  var dirtBottom = 600;
  var dirtLeft = Math.floor(Math.random() * 620);
  var dirt = document.createElement("div");
  dirt.setAttribute("class", "dirt");
  dirt.body.appendChild(dirt);
  function fallDownDirt() {
    if (
      dirtBottom < binBottom + 50 &&
      dirtBottom > binBottom &&
      dirtLeft > binLeft - 30 &&
      dirtLeft < binLeft + 80
    ) {
      dirt.remove();
      clearInterval(fallInterval);
      score++;
    }
    if (dirtBottom < binBottom) {
      alert("Game over!! THe score is: " + score);
      clearInterval(fallInterval);
      clearTimeout(dirtTimeout);
      location.reload();
    }
    dirtBottom -= 5;
    dirt.style.position = "absolute";
    dirt.style.left = dirtLeft + "px";
    dirt.style.bottom = dirtBottom + "px";
  }
  var fallInterval = setInterval(fallDownDirt, 20);
  var dirtTimeout = setTimeout(generateDirt, 2000);
}
generateDirt();
