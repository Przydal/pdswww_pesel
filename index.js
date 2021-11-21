var firstBtn = document.getElementById("firstBtn"),
    secondBtn = document.getElementById("secondBtn"),
    thirdBtn = document.getElementById("thirdBtn");


const firstWorker = new Worker('find_valid_pesels.js');

firstBtn.addEventListener('click', () => {
    alert("test1");
    // firstWorker.addEventListener('message', function(e) {
    //     alert('otrzymano odpowiedź: ' + e.data);
    // }, false);
})