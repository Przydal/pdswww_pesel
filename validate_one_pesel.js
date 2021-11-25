this.addEventListener('message', function(e) {
    switch (e.data) {
        case 'validate':
            console.log(e);
            break;
        case 'stop':
            this.postMessage('watek zatrzymany!');
            this.close(); // zatrzymanie skryptu wewnatrz watku roboczego
            break;
        default:
            this.postMessage('nieznane polecenie!');
    }
}, false);