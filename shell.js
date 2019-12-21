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

// Style settings
let txtstyle = 'b1';
let classStyle = 'input';
let user;

let voiceObj = {
    voiceAvailable: true,
    voiceOption: null,
    voices: null
};
let synth = window.speechSynthesis;