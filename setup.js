/*
--------------------------------
\\\\\\\\\\\\\\\/////////////////
 \ \ \ \ \ \ \ \/ / / / / / / /
  \ \ \ \ \ \ \/ / / / / / / /
   \ \ \ \ \ WELCOME, / / / /
    \ \ \ \ \/ / / / / / / /
     \ \ FAITHFUL USER! / /
      \ \ \/ / / / / / / /
       \ \/ / / / / / / /
        \/ / / / / / / /
        / / / / / / / /
\\\\\\\\\\\\\\\////////////////
-------------------------------
*/

// Prevent default action of (LEFT, UP, RIGHT, DOWN)
window.addEventListener('keydown', function(e) {
  if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }
}, false);

function retrieveLocalStorage()
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

      // Assign voice option
      var voCache = localStorage.getItem('voiceOption');
      voiceObj.voiceOption = (voCache !== null) ? voCache : voiceObj.voices[0].name;
      localStorage.setItem('voiceOption', voiceObj.voiceOption);
    }
  }
}