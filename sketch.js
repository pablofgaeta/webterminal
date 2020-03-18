function preload()
{
  retrieveLocalStorage();
}

function setup() {
  noCanvas();

  createCommands();

  addLine();
  inputString = 'help';
  var prefix = (abstract) ? '' : (user + ': ' + currentPath + '$ ');
  inputElement.innerHTML = prefix + inputString;
  execCommand(inputString.split(" "));
  addLine();
  inputString = '';
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
