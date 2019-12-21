function preload()
{
  retrieveLocalStorage();
}

function setup() {
  noCanvas();

  createCommands();

  inputString = '';
  addLine();
}

function draw() {
  var commandStr = underlineCursor(inputString, inlineCursor);

  inputElement.innerHTML = user + ': ' + currentPath + '$ ' + commandStr;
}

