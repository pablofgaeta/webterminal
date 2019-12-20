function setup() {
  noCanvas();

  inputString = '';
  addLine();
}

function draw() {
  inputElement.innerHTML = user + inputString;
}

function execCommand(tokens)
{
    var rootcmd = tokens.shift();
    for (var i = 0; i < commands.length; i++)
    {
        if (rootcmd === commands[i].name)
        {
            commands[i].exec(tokens);
        }
    }
}