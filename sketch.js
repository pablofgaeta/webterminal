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

function idToVoice(index)
{
  var index = parseInt(index);
  if (index >= 0 && index < voiceObj.voices.length)
  {
    voiceObj.voiceOption = voiceObj.voices[index];
  }

}

function setup() {
  noCanvas();

  createCommands();

  inputString = '';
  addLine();
}

function draw() {
  inputElement.innerHTML = user + ': ' + currentPath + '$ ' + inputString;
}
