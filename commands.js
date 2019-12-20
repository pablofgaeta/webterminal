let commands =
[
    {
        name: 'chusr',
        exec: function(tokens) {
            user = tokens.join("_") + ' $ ';
        }
    },
    {
        name: 'echo',
        exec: function(tokens) {
            addLine();
            inputElement.innerHTML = tokens.join(" ");
        }
    }
]