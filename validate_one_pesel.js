this.addEventListener('message', function(e) {
    const pesel = e.data.pesel;

    validatePesel(pesel);
});

function validatePesel(pesel) {
    let peselVals = pesel.split('').map(Number);
    peselVals.splice(peselVals.length - 1, 1);

    peselVals[0] *= 1;
    peselVals[1] *= 3;
    peselVals[2] *= 7;
    peselVals[3] *= 9;
    peselVals[4] *= 1;
    peselVals[5] *= 3;
    peselVals[6] *= 7;
    peselVals[7] *= 9;
    peselVals[8] *= 1;
    peselVals[9] *= 3;

    const peselValSum = sumVals(peselVals);
    handleReminder(handleSum(peselValSum), pesel);
}

function sumVals(peselVals) {
    return peselVals.reduce((a, b) => { return a + b });
}

function handleSum(peselSum) {
    const reminder = 10 - peselSum % 10;

    return reminder === 10 ? 0 : reminder;
}

function handleReminder(reminder, pesel) {
    const result = reminder === parseInt(pesel.charAt(pesel.length - 1));

    this.postMessage({ pesel, valid: result });
}