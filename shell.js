// Stats on history of commands / num commands
let lineHistory = [];
let lineCount = 0;
let currentPath = '~';

// Always stores most recent div/string to write to
let inputElement;
let inputString;
let inlineCursor = 0;
let multiLineCursor = 0;

// Style settings
let txtstyle = 'b1';
let classStyle = 'input';
let user;

if (typeof(Storage) !== "undefined")
{
    if (localStorage.getItem('user') === null)
    {
        localStorage.setItem('user', 'root_user');
    }
    user = localStorage.getItem('user');
}