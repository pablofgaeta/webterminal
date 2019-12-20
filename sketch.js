function setup() {
  noCanvas();

  inputString = '';
  addLine();
}

function draw() {
  inputElement.innerHTML = user + ': ' + currentPath + '$ ' + inputString;
}