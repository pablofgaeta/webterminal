function execCommand(tokens)
{
    if (tokens.length > 0)
    {
        var rootcmd = tokens.shift();
        if (commandDict.hasKey(rootcmd))
        {
            // Get index of hashed command and execute its function
            commands[parseInt(commandDict.get(rootcmd))].exec(tokens);
        }
    }
}

// Print string to new line on terminal
function tPrint(str)
{
    if (typeof str === 'string' || str instanceof String)
        execCommand(['echo', str]);
}

// Return str with underlined at index (based 1)
function underlineCursor(str, index)
{
  var finalstr = str;
  if (index > 0 && index <= str.length)
  {
    var str1 = str.substring(0, index - 1);
    var str2 = str.substring(index, str.length);
    finalstr = str1 + '<u>' + str.charAt(index - 1) + '</u>' + str2;
  }
  return finalstr;
}

function createCommands()
{
    // Command objects
    commands =
    [
        {
            name: 'help',
            description: '<mark>help</mark>: list all available commands.',
            exec: function(tokens) {
                for (var i = 0; i < commands.length; i++)
                {
                    addLine();
                    inputElement.innerHTML = commands[i].description;
                }
            }
        },
        {
            name: 'chusr',
            description: '<mark>chusr</mark>: change username of current instance. Usage - chusr < usr_name > (spaces converted to \'_\').',
            exec: function(tokens) {
                user = tokens.join("_");
                localStorage.setItem('user', user);
            }
        },
        {
            name: 'echo',
            description: '<mark>echo</mark>: print out arguments to terminal output.',
            exec: function(tokens) {
                addLine();
                inputElement.innerHTML = tokens.join(" ");
            }
        }, 
        {
            name: 'clear',
            description: '<mark>clear</mark>: Removes all elements from page. History remains saved.',
            exec: function(tokens) {
                var terminal = document.getElementById('terminal');
                while (terminal.hasChildNodes())
                { 
                    terminal.removeChild(terminal.firstChild);
                }
                lineCount = 0;
                multiLineCursor = 0;
            }
        },
        {
            name: 'clearh',
            description: '<mark>clearh</mark>: Removes history of command strings saved.',
            exec: function(tokens) {
                lineHistory = [];
                
            }
        },
        {
            name: 'polybeat',
            description: '<mark>polybeat</mark>: Launches polybeat web app in new tab.',
            exec: function(tokens) {
                window.open('https://pablofgaeta.github.io/Polybeat/');
            }
        },
        {
            name: 'say',
            description: '<mark>say</mark>: System voice repeats back arguments. Use -lv to list voices. Use -sv to set voice by index.',
            exec: function(tokens) {
                if (tokens.length > 0 && voiceObj.voiceAvailable === true)
                {
                    if (tokens[0] === '-lv')
                    {
                        for (var i = 0; i < voiceObj.voices.length; i++)
                        {
                            execCommand(['echo', i.toString(), ': ', voiceObj.voices[i].name]);
                        }
                    }
                    else if (tokens[0] === '-sv')
                    {
                        if (tokens.length === 2)
                        {
                            var index = parseInt(tokens[1]);
                            if (index !== NaN && index >= 0 && index < voiceObj.voices.length)
                            {
                                voiceObj.voiceOption = index.toString();
                                localStorage.setItem('voiceOption', voiceObj.voiceOption);
                            }
                            else
                            {
                                tPrint('Index out of bounds!');
                            }
                        }
                        else {
                            tPrint('Wrong number of arguments');
                        }
                    }
                    else
                    {
                        var utterance = new SpeechSynthesisUtterance(tokens.join(" "));
                        utterance.voice = voiceObj.voices[parseInt(voiceObj.voiceOption)];
                        synth.speak(utterance);
                    }
                }
                else
                {
                    tPrint('Wrong num of args or no voice available on this browser. 😭');
                } 
            }
        },
        {
            name: 'txtcol',
            description: '<mark>txtcol</mark>: Allows user to customize text color with html5 color input.',
            exec: function(tokens) {
                // Create new line as wrapper 
                addLine();
                inputElement.style.position = 'relative';

                // div to give line height
                var msg = document.createElement('div');
                msg.style.display = 'inline-block';
                inputElement.append(msg);

                // Color picker
                var col = document.createElement('input');
                col.style.display = 'inline-block';
                col.style.position = 'absolute';
                col.style.height = '22px';
                col.style.width = '30px';
                col.style.bottom = '0 auto';
                col.style.top = '0 auto';
                col.type = 'color';
                col.value = "#ff00ff";
                inputElement.append(col);
                
                // Submit button
                var submit = document.createElement('button');
                submit.style.display = 'inline-block';
                submit.style.position = 'absolute';
                submit.innerHTML = 'submit :)';
                submit.style.bottom = 'auto';
                submit.style.top = 'auto';
                submit.style.left = '60px';
                submit.style.height = '26px';
                inputElement.append(submit);

                submit.onclick =  function() {
                    var inputs = document.getElementsByClassName(txtstyle.class);
                    for (var i = 0; i < inputs.length; i++)
                    {
                        inputs[i].style.color = col.value;
                    }
                    txtstyle.color = col.value;
                    localStorage.setItem('text-color', col.value);
                }
            }
        }
    ]

    // Create dictionary for fast look up
    commandDict = createStringDict('DEFAULT', '0');
    for (var index = 0; index < commands.length; index++)
    {
        commandDict.create(commands[index].name, index.toString());
    }
}

function createInlineText(str)
{
    var txt = document.createElement('div');
    txt.style.display = 'inline-block'
    txt.className = txtstyle.class;
    txt.style.color = txtstyle.color;
    txt.innerHTML = str;

    return txt;
}