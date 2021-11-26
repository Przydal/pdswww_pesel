this.addEventListener('message', function(e) {
    const datePart = e.data;
    let validPeselsFromDate = findAllPesels(datePart, weightDatePart(datePart));

    this.postMessage(validPeselsFromDate);
});


function findAllPesels(datePart, weighedDate) {
    let foundPesels = []
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            for (let k = 0; k < 10; k++) {
                for (let l = 0; l < 10; l++) {
                    for (let n = 0; n < 10; n++) {
                        weighedDate[6] = i * 7;
                        weighedDate[7] = j * 9;
                        weighedDate[8] = k;
                        weighedDate[9] = l * 3;
                        if (handleSum(sumVals(weighedDate)) === n) {
                            foundPesels.push(datePart.concat(i, j, k, l, n));
                        };
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

function sumVals(peselVals) {
    return peselVals.reduce((a, b) => a + b);
}

function handleSum(peselSum) {
    const reminder = 10 - peselSum % 10;

    return reminder === 10 ? 0 : reminder;
}