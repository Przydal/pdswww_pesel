const firstBtn = document.getElementById("firstBtn"),
    secondBtn = document.getElementById("secondBtn"),
    thirdBtn = document.getElementById("thirdBtn"),
    yearInput = document.getElementById("year-input"),
    monthInput = document.getElementById("month-input"),
    dayInput = document.getElementById("day-input"),
    lastDigitsInput = document.getElementById("last-digits-input");

const inputs = [yearInput, monthInput, dayInput, lastDigitsInput];

let pesel = '';

const firstWorker = new Worker('find_valid_pesels.js');


inputs.forEach((input) => {
    input.addEventListener("input", (event) => {
        const maxLength = event.target.maxLength;
        if (event.target.value.length > maxLength) {
            event.target.value = event.target.value.slice(0, maxLength);
        }
    });
});

firstBtn.addEventListener('click', () => {
    pesel = getPeselValue();
    weightPesel();
});

function getPeselValue() {
    const yearValue = yearInput.value.slice(2, 4),
        monthValue = monthInput.value.length === 1 ? ('0').concat(monthInput.value) : monthInput.value,
        dayValue = dayInput.value.length === 1 ? ('0').concat(dayInput.value) : dayInput.value,
        lastDigits = lastDigitsInput.value;
    return yearValue.concat(monthValue, dayValue, lastDigits);
}

function weightPesel() {
    let peselVals = pesel.split('').map(Number);
    peselVals.splice(peselVals.length - 1, 1);

    peselVals[0] = parseInt(peselVals[0]) * 1;
    peselVals[1] = parseInt(peselVals[1]) * 3;
    peselVals[2] = parseInt(peselVals[2]) * 7;
    peselVals[3] = parseInt(peselVals[3]) * 9;
    peselVals[4] = parseInt(peselVals[4]) * 1;
    peselVals[5] = parseInt(peselVals[5]) * 3;
    peselVals[6] = parseInt(peselVals[6]) * 7;
    peselVals[7] = parseInt(peselVals[7]) * 9;
    peselVals[8] = parseInt(peselVals[8]) * 1;
    peselVals[9] = parseInt(peselVals[9]) * 3;


    const peselValSum = sumVals(peselVals);

    handlePesel(handleSum(peselValSum));
}

function sumVals(peselVals) {
    return peselVals.reduce((a, b) => { return parseInt(a) + parseInt(b) });
}

function handleSum(peselSum) {
    const reminder = 10 - peselSum % 10;

    return reminder === 10 ? 0 : reminder;
}

function handlePesel(reminder) {
    const result = reminder === parseInt(pesel.charAt(pesel.length - 1));

    message = result ? 'Pesel poprawny' : 'Pesel niepoprawny';

    alert(message);
}