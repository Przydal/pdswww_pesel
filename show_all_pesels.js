this.addEventListener('message', function(e) {
    const datePart = e.data,
        weightDate = weightDatePart(datePart),
        validPeselsFromDate = findAllPesels(weightDate, datePart);

    this.postMessage(validPeselsFromDate);
});


function findAllPesels(weighedDate, modifiedDate) {
    let foundPesels = [],
        peselData = weighedDate;
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            for (let k = 0; k < 10; k++) {
                for (let l = 0; l < 10; l++) {
                    for (let n = 0; n < 10; n++) {
                        peselData[6] = i * 7;
                        peselData[7] = j * 9;
                        peselData[8] = k;
                        peselData[9] = l * 3;

                        if (handleSum(sumVals(peselData)) === n) {
                            foundPesels.push(modifiedDate.concat(i, j, k, l, n));
                        }
                    }
                }
            }
        }
    }
    return foundPesels;
}

function weightDatePart(datePart) {
    let dateValues = datePart.split('').map(Number);

    dateValues[1] *= 3;
    dateValues[2] *= 7;
    dateValues[3] *= 9;
    dateValues[5] *= 3;

    return dateValues;
}

function sumVals(weighedDate) {
    return weighedDate.reduce((a, b) => a + b);
}

function handleSum(peselSum) {
    const reminder = 10 - peselSum % 10;

    return reminder === 10 ? 0 : reminder;
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