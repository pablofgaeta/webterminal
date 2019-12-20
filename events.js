// Used for state of a line. Execute and create new line
function keyPressed()
{
  if (keyCode === ENTER)
  {
    // Record command to history
    lineHistory.push(inputString);
    
    // Pass command to executor
    execCommand(inputString.split(" "));

    // Add new lines for command
    addLine();
    inputString = '';
  }

  // delete character control
  else if (keyCode === BACKSPACE || keyCode === DELETE)
  {
    if (inputString.length > 0)
      inputString = inputString.substring(0, inputString.length - 1);
  }

  // else if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW)

  else if (keyCode === DOWN_ARROW && multiLineCursor < lineHistory.length && lineHistory.length > 0)
  {
    ++multiLineCursor;
    if (multiLineCursor === lineHistory.length)
    {
      inputString = '';
    }
    else 
    { inputString = lineHistory[multiLineCursor]; }

  }
  else if (keyCode === UP_ARROW && multiLineCursor > 0 && lineHistory.length > 0)
  {
    --multiLineCursor;

    while (multiLineCursor >= lineHistory.length) { --multiLineCursor; } 
    inputString = lineHistory[multiLineCursor];
  }
}

// Creates new HTML div element to write on a new line
function addLine()
{
  inputElement = document.createElement('div');
  inputElement.style.padding = '5px';
  inputElement.value = ++lineCount;
  inputElement.className = classStyle;

  document.getElementById('terminal').append(inputElement);
  multiLineCursor = lineCount;
}

// Updates current input line
function keyTyped()
{
  if (validWriteKey(key)){
    inputString += key;
  }
}

function validWriteKey(char)
{
  // return (key >= 'a' && key <= 'z') ||
  //        (key >= 'A' && key <= 'Z') ||
  //        (key >= '0' && key <= '9') ||
  //         key === ' ';
  return key >= ' ' && key <= '~' && key != "<" && key != ">";
}