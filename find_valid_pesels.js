let singlePeselWorker = new Worker('validate_one_pesel.js'),
    validPesels = [];

singlePeselWorker.addEventListener('message', function(e) {
    if (e.data.valid) {
        validPesels.push(e.data.pesel);
    }
});



this.addEventListener('message', function(e) {
    const numericPart = e.data,
        startDate = '1930-01-01',
        endDate = '2050-12-31';

    handlePesels(new Date(startDate), new Date(endDate), numericPart);
});



function handlePesels(startDate, endDate, numericPart) {
    let newPesel = '',
        monthModifier = '';
    for (let dt = new Date(startDate); dt <= endDate; dt.setDate(dt.getDate() + 1)) {
        newDate = new Date(dt).toISOString().split('T')[0].split('-');
        monthModifier = getYearInputModifier(parseInt(newDate[0]));
        if (monthModifier) {
            newDate[1] = parseInt(newDate[1]) + monthModifier;
        }
        newPesel = newDate.join('').concat(numericPart).substring(2);
        singlePeselWorker.postMessage({ pesel: newPesel });
    }
    setTimeout(() => {
        this.postMessage(validPesels);
    }, 1000);
    validPesels = [];
};

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