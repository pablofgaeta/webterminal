function preload()
{
  if (typeof(Storage) !== "undefined")
  {
    // Get user info
    if (localStorage.getItem('user') === null)
    {
        localStorage.setItem('user', 'root_user');
    }
    user = localStorage.getItem('user');


    // Get voice preferences
    if (typeof speechSynthesis === 'undefined')
    {
      voiceObj.voiceAvailable = false;
      voiceObj.voiceOption = null;
      voiceObj.voices = null;
    }
    else
    {
      // voice avail
      voiceObj.voiceAvailable = true;

      // Wait until all voices attained
      while (voiceObj.voices === null || voiceObj.voices.length === 0)
      {
        voiceObj.voices = synth.getVoices();
      }

      // If previously stored, retrieve
      if (localStorage.getItem('voiceOption') !== null)
      {
        voiceObj.voiceOption = localStorage.getItem('voiceOption');
      }
      // If not stored, set 
      else {
        voiceObj.voiceOption = voiceObj.voices[0].name;
        localStorage.setItem('voiceOption', voiceObj.voiceOption);
      }
    }
  }
}

function setup() {
  noCanvas();

  createCommands();

  inputString = '';
  addLine();
}

function draw() {
  var cursorOffset = inlineCursor > 0 ? 1 : 0;
  drawCount = (drawCount + 1) % 50;

  var cursor = inputString.charAt(inlineCursor - 1) + ((drawCount % 50 < 25) ? '𝖨' : '');


  var str1 = inputString.substring(0, inlineCursor - 1);
  var str2 = inputString.substring(inlineCursor, inputString.length);

  inputElement.innerHTML = user + ': ' + currentPath + '$ ' + str1 + cursor + str2;
}
