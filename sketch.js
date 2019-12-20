function setup() {
  noCanvas();

  inputString = '';
  addLine();

  // remove empty command side effect added
  lineHistory.shift();
}

function draw() {
  inputElement.innerHTML = user + ' $ ' + inputString;
}