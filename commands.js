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

function createCommands()
{
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
        }
    ]

    // Create dictionary for fast look up
    var index = 0;
    commandDict = createStringDict('DEFAULT', index.toString());
    for (index = 0; index < commands.length; index++)
    {
        commandDict.create(commands[index].name, index.toString());
    }
}

function tPrint(str)
{
    if (typeof str === 'string' || str instanceof String)
        execCommand(['echo', str]);
}