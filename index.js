const firstBtn = document.getElementById("firstBtn"),
    secondBtn = document.getElementById("secondBtn"),
    thirdBtn = document.getElementById("thirdBtn"),
    yearInput = document.getElementById("year-input"),
    monthInput = document.getElementById("month-input"),
    dayInput = document.getElementById("day-input"),
    lastDigitsInput = document.getElementById("last-digits-input"),
    peselResults = document.createElement('div');


const inputs = [yearInput, monthInput, dayInput, lastDigitsInput];

let firstWorker = new Worker('validate_one_pesel.js'),
    secondWorker = new Worker('show_all_pesels.js'),
    thirdWorker = new Worker('find_valid_pesels.js');

firstWorker.addEventListener('message', function(e) {
    alert(e.data);
});

secondWorker.addEventListener('message', (e) => {
    showAllPesels(e.data);
});


inputs.forEach((input) => {
    input.addEventListener("input", (event) => {
        const maxLength = event.target.maxLength;
        if (event.target.value.length > maxLength) {
            event.target.value = event.target.value.slice(0, maxLength);
        }
    });
});

firstBtn.addEventListener('click', () => {
    firstWorker.postMessage(getPeselValue());
});

secondBtn.addEventListener('click', () => {
    secondWorker.postMessage(getDatePart());
})

function getPeselValue() {
    const yearValue = yearInput.value.slice(2, 4),
        yearModifer = getYearInputModifier(yearInput.value),
        monthValue = getMonthValue(monthInput.value, yearModifer),
        dayValue = dayInput.value.length === 1 ? ('0').concat(dayInput.value) : dayInput.value,
        lastDigits = lastDigitsInput.value;
    return yearValue.concat(monthValue, dayValue, lastDigits);
}

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
        monthValue = ('0').concat((parseInt(monthInput.value) + yearModifer).toString());
    } else if (monthInputValue.length === 2) {
        monthValue = monthInputValue[0] === '0' ?
            ('0').concat(parseInt(monthInput.value) + yearModifer).toString() :
            (parseInt(monthInput.value) + yearModifer).toString()
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

function showAllPesels(validPesels) {
    peselResults.innerHTML = '';

    const validPeselsContainer = document.createElement('div'),
        numberOfPeselsContainer = document.createElement('div');
    validPeselsContainer.id = 'validPeselsContainer';
    numberOfPeselsContainer.innerText = `Jest ${validPesels.length} poprawnych numerów PESEL dla podanej daty:`;

    peselResults.append(numberOfPeselsContainer);
    validPesels.forEach((pesel) => {
        let peselDiv = document.createElement('div');
        peselDiv.innerText = pesel;

        validPeselsContainer.append(peselDiv);
    });
    peselResults.append(validPeselsContainer);
    document.body.append(peselResults);
}