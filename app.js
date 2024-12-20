const display = document.querySelector(".display");
const buttons = document.querySelectorAll('button');
const specialChars = ["%", "*", "÷", "-", "+", "="];
const replaceChars = {
    '%': '/100',
    '×': '*',
    '÷': '/'
};
display.setAttribute('tabindex', '-1');
const excludeSpclChars = ["Shift", "Alt", "Control", "Meta", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "Tab", "CapsLock", "NumLock", "ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft", "PageDown", "End", "PageUp", "Home", "Insert", "Clear"]
const excludeChars = [... 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$^&()~`:;\\"\'\"\"\?><,|\_{[]} ']
let output = "";
//console.log(display,buttons);

//Define function to calculate based on button clicked.
const calculate = (btnValue) => {
    var chr = output.toString();
    //console.log(btnValue);
    if (btnValue === "=" & output != "" || btnValue === "Enter") {
        var tempValue = output.toString().slice(-1);
        if (tempValue == "*" || tempValue == "/" || tempValue == "-" || tempValue == "+") return;
        //if output has '%, replace with '/100' before evaluating.
        if (output != "") {
            output = eval(output.replace(/[%×÷]/g, chars => replaceChars[chars]));
        }

    } else if (btnValue === "C" || btnValue === "Escape") {
        output = ""
    } else if (btnValue === undefined || excludeSpclChars.includes(btnValue) || excludeChars.includes(btnValue)) {
        return
    } else if (btnValue === "DEL" || btnValue === "Backspace" || btnValue === "Delete") {
        //If DEL btn is clicked, remove the last character from the output.
        output = output.toString().slice(0, -1);
    } else {
        //if output is empty and button is specialChars then return
        if (output === "" && specialChars.includes(btnValue)) return;
        output += btnValue;
    }

    display.value = output;
}
//Add event listener to buttons, call calculat() on click.
buttons.forEach(button => {
    button.setAttribute('tabindex', '-1')
    //Button click listener calls calculate() with dataset value as argument.
    button.addEventListener("click", e => calculate(e.target.dataset.value))
});
//Calculator work using keys press
document.addEventListener('keydown', e => calculate(e.key));

//dark mode toogle
let darkmode = localStorage.getItem('darkmode');
const themeSwitch = document.getElementById('theme-switch');

const enableDarkmode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'active');
}

const disableDarkmode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkmode', null);
}
if (darkmode === "active") enableDarkmode();
themeSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem('darkmode');
    darkmode != "active" ? enableDarkmode() : disableDarkmode();
});
