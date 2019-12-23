// Used for state of a line. Execute and create new line
function keyPressed()
{
  // Enter control for execution and new command
  if (keyCode === ENTER)
  {
    // Remove underline cursor from html string
    inputElement.innerHTML = inputElement.innerHTML.replace('<u>', '').replace('</u>', '');
    
    // Record command to history
    lineHistory.push(inputString);
    
    // Pass command to executor
    execCommand(inputString.split(" "));

    // Add new lines for command
    addLine();
    inputString = '';
    // Update history cursor for new line
    multiLineCursor = lineHistory.length;
    inlineCursor = 0;
  }

  // delete character control
  else if (keyCode === BACKSPACE || keyCode === DELETE)
  {
    if (inputString.length > 0 && inlineCursor > 0)
    {
      // Case if cursor at start
      if (inlineCursor === 1)
      {
        inputString = inputString.substring(inlineCursor, inputString.length);
        if (inputString.length === 0) --inlineCursor; 
      }
      // Case if cursor at end
      else if (inlineCursor === inputString.length)
      {
        inputString = inputString.substring(0, --inlineCursor);
      }
      // Case if cursor in middle
      else
      {
        var str1 = inputString.slice(0, inlineCursor - 1);
        var str2 = inputString.slice(inlineCursor, inputString.length);
        inputString = str1 + str2;
        --inlineCursor;
      }
    }
  }

  // Move cursor inline
  else if (keyCode === LEFT_ARROW && inlineCursor > 1)
  { --inlineCursor; }
  else if (keyCode === RIGHT_ARROW && inlineCursor < inputString.length)
  { ++inlineCursor; }

  // Recall earlier terminal history
  else if (keyCode === DOWN_ARROW && multiLineCursor < lineHistory.length && lineHistory.length > 0)
  {
    ++multiLineCursor; 
    if (multiLineCursor === lineHistory.length)
    {
      inputString = '';
      inlineCursor = 0;
    }
    else 
    {
      inputString = lineHistory[multiLineCursor];
      inlineCursor = inputString.length;
    }
  }
  // Recall more recent terminal history
  else if (keyCode === UP_ARROW && multiLineCursor > 0 && lineHistory.length > 0)
  {
    --multiLineCursor;

    while (multiLineCursor >= lineHistory.length) { --multiLineCursor; } 
    inputString = lineHistory[multiLineCursor];
    inlineCursor = inputString.length;
  }

  // Prep draw fxn to scroll to bottom
  scrollDown = true;
}

// Creates new HTML div element to write on a new line
function addLine()
{
  inputElement = document.createElement('div');
  inputElement.style.padding = '5px';
  inputElement.value = ++lineCount;
  inputElement.className = classStyle;

  document.getElementById('terminal').append(inputElement);

  // Prep draw fxn to scroll to bottom
  scrollDown = true;
}

// Updates current input line
function keyTyped()
{
  if (validWriteKey(key)){
    inputString = inputString.slice(0, inlineCursor) + key + inputString.slice(inlineCursor, inputString.length);
    ++inlineCursor;
  }

  // Prep draw fxn to scroll to bottom
  scrollDown = true;
}

function validWriteKey(char)
{
  // return (key >= 'a' && key <= 'z') ||
  //        (key >= 'A' && key <= 'Z') ||
  //        (key >= '0' && key <= '9') ||
  //         key === ' ';
  return key >= ' ' && key <= '~' && key != "<" && key != ">";
}