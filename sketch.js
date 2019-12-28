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
  var prefix = (abstract) ? '' : (user + ': ' + currentPath + '$ ');

  inputElement.innerHTML = prefix + commandStr;

  if (scrollDown)
  {
    window.scrollTo(0, document.body.scrollHeight);
    scrollDown = false;
  }
}