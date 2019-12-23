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

  if (scrollDown)
  {
    window.scrollTo(0, document.body.scrollHeight);
    scrollDown = false;
  }
}