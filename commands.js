function execCommand(tokens)
{
    if (tokens.length > 0)
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
}

let commands =
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
            localStorage.user = user;
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
        name: 'ls',
        description: '<mark>ls</mark>: Lists all files/subdirectories in current directory',
        exec: function(tokens) {

        }
    }
]