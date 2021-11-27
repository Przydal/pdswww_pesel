const firstBtn = document.getElementById("firstBtn"),
    secondBtn = document.getElementById("secondBtn"),
    thirdBtn = document.getElementById("thirdBtn"),
    clearBtn = document.getElementById("clearBtn"),
    yearInput = document.getElementById("year-input"),
    monthInput = document.getElementById("month-input"),
    dayInput = document.getElementById("day-input"),
    lastDigitsInput = document.getElementById("last-digits-input"),
    peselResults = document.createElement('div');


const inputs = [yearInput, monthInput, dayInput, lastDigitsInput];

let firstWorker = new Worker('validate_one_pesel.js'),
    secondWorker = new Worker('show_all_pesels.js'),
    thirdWorker = new Worker('find_valid_pesels.js');

firstWorker.addEventListener('message', (e) => {
    let message = e.data.valid ? `Pesel ${e.data.pesel} jest poprawny` : `Pesel ${e.data.pesel} jest niepoprawny`;
    alert(message);
});

secondWorker.addEventListener('message', (e) => {
    showAllPesels(e.data);
});

thirdWorker.addEventListener('message', (e) => {
    showAllPesels(e.data, false);
})


inputs.forEach((input) => {
    input.addEventListener("input", (event) => {
        const maxLength = event.target.maxLength;
        if (event.target.value.length > maxLength) {
            event.target.value = event.target.value.slice(0, maxLength);
        }
    });
});

firstBtn.addEventListener('click', () => {
    if (isInputFull()) {
        firstWorker.postMessage(getPeselValue());
    } else {
        alert('Nie podano pełnych danych');
    }
});

secondBtn.addEventListener('click', () => {
    if (isDatePartFull()) {
        secondWorker.postMessage(getDatePart());
    } else {
        alert('Nie podano pełnych danych');
    }
});

thirdBtn.addEventListener('click', () => {
    if (isLastDigitsPartFull()) {
        thirdWorker.postMessage(getLastDigitsPart());
    } else {
        alert('Nie podano pełnych danych');
    }
});

clearBtn.addEventListener('click', () => clearData());

function getYearInputModifier(yearInputValue) {
    let modifier = 0;
    switch (true) {
        case (yearInputValue >= 1800 && yearInputValue < 1900):
            modifier = 80;
            break;
        case (yearInputValue >= 1900 && yearInputValue < 2000):
            modifier = 0;
            break;
        case (yearInputValue >= 2000 && yearInputValue < 2100):
            modifier = 20;
            break;
        case (yearInputValue >= 2100 && yearInputValue < 2200):
            modifier = 40;
            break;
        case (yearInputValue >= 2200 && yearInputValue < 2300):
            modifier = 60;
            break;
    }
    return modifier;
}

function getMonthValue(monthInputValue, yearModifer) {
    let monthValue = '';

    if (monthInputValue.length === 1) {
        monthValue = ('0').concat((parseInt(monthInputValue) + yearModifer).toString());
    } else if (monthInputValue.length === 2) {
        monthValue = (parseInt(monthInputValue) + yearModifer).toString().length === 1 ?
            ('0').concat(parseInt(monthInputValue) + yearModifer).toString() :
            (parseInt(monthInputValue) + yearModifer).toString();
    }

    return monthValue;
}


function clearData() {
    yearInput.value = '';
    monthInput.value = '';
    dayInput.value = '';
    lastDigitsInput.value = '';
    peselResults.innerHTML = '';
}

function getPeselValue() {
    const yearValue = yearInput.value.slice(2, 4),
        yearModifer = getYearInputModifier(yearInput.value),
        monthValue = getMonthValue(monthInput.value, yearModifer),
        dayValue = dayInput.value.length === 1 ? ('0').concat(dayInput.value) : dayInput.value,
        lastDigits = lastDigitsInput.value,
        pesel = yearValue.concat(monthValue, dayValue, lastDigits);

    return { pesel };
}

function getMonthValue(monthInputValue, yearModifer) {
    let monthValue = '';

    if (monthInputValue.length === 1) {
        monthValue = ('0').concat((parseInt(monthInputValue) + yearModifer).toString());
    } else if (monthInputValue.length === 2) {
        monthValue = (parseInt(monthInputValue) + yearModifer).toString().length === 1 ?
            ('0').concat(parseInt(monthInputValue) + yearModifer).toString() :
            (parseInt(monthInputValue) + yearModifer).toString();
    }

    return monthValue;
}

function getDatePart() {
    const yearValue = yearInput.value.slice(2, 4),
        yearModifer = getYearInputModifier(yearInput.value),
        monthValue = getMonthValue(monthInput.value, yearModifer),
        dayValue = dayInput.value.length === 1 ? ('0').concat(dayInput.value) : dayInput.value;

    return yearValue.concat(monthValue, dayValue);
}

function showAllPesels(validPesels, fromDate = true) {
    peselResults.innerHTML = '';

    const validPeselsContainer = document.createElement('div'),
        numberOfPeselsContainer = document.createElement('div');
    validPeselsContainer.id = 'validPeselsContainer';
    numberOfPeselsContainer.innerText = `Jest ${validPesels.length} poprawnych numerów PESEL ${fromDate ? 'dla podanej daty:' : 'dla 5 ostatnich cyfr'}`;

    peselResults.append(numberOfPeselsContainer);
    validPesels.forEach((pesel) => {
        let peselDiv = document.createElement('div');
        peselDiv.innerText = pesel;

        validPeselsContainer.append(peselDiv);
    });
    peselResults.append(validPeselsContainer);
    document.body.append(peselResults);
}

function getLastDigitsPart() {
    return lastDigitsInput.value;
}

function isInputFull() {
    return yearInput.value.length === 4 && monthInput.value.length === 2 && dayInput.value.length === 2 && lastDigitsInput.value.length === 5;
}

function isDatePartFull() {
    return yearInput.value.length === 4 && monthInput.value.length === 2 && dayInput.value.length === 2
}

function isLastDigitsPartFull() {
    return lastDigitsInput.value.length === 5;
}