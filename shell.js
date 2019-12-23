// Stats on history of commands / num commands
let lineHistory = [];
let lineCount = 0;
let currentPath = '~';
let commandDict;
let commands;

// Always stores most recent div/string to write to
let inputElement;
let inputString;
let inlineCursor = 0;
let multiLineCursor = 0;
let drawCount = 0;
let scrollDown = false;


// Style settings
let txtstyle = {
    class: 'input',
    color: '#ffffff',
    'padding-left': '10px',
    'padding-bottom': '10px',
};

let user;

let voiceObj = {
    voiceAvailable: false,
    voiceOption: null,
    voices: null
};
let synth = window.speechSynthesis;