const billInput = document.getElementById('bill');
const tipButtons = document.querySelectorAll('.tip-btn');
const peopleInput = document.getElementById('people');
const tipAmountDisplay = document.getElementById('tip-amount');
const totalPerPersonDisplay = document.getElementById('total-per-person');
const resetBtn = document.getElementById('reset-btn');

let billAmount = 0;
let tipPercentage = 0;
let numberOfPeople = 1;

function calculateTip() {
    if (numberOfPeople < 1) {
        return;
    }

    const tipTotal = billAmount * (tipPercentage / 100);
    const totalAmount = billAmount + tipTotal;
    const totalPerPerson = totalAmount / numberOfPeople;

    tipAmountDisplay.textContent = `$${tipTotal.toFixed(2)}`;
    totalPerPersonDisplay.textContent = `$${totalPerPerson.toFixed(2)}`;
}

function handleBillInput() {
    billAmount = parseFloat(billInput.value) || 0;
    calculateTip();
}

function handleTipButtonClick(event) {
    tipButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    tipPercentage = parseInt(event.target.dataset.tip);
    calculateTip();
}

function handlePeopleInput() {
    numberOfPeople = parseInt(peopleInput.value) || 1;
    if (numberOfPeople < 1) {
        peopleInput.value = 1;
        numberOfPeople = 1;
    }
    calculateTip();
}

function resetCalculator() {
    billInput.value = '';
    peopleInput.value = '1';
    tipButtons.forEach(btn => btn.classList.remove('active'));
    billAmount = 0;
    tipPercentage = 0;
    numberOfPeople = 1;
    calculateTip();
    tipAmountDisplay.textContent = `$0.00`;
    totalPerPersonDisplay.textContent = `$0.00`;
}

billInput.addEventListener('input', handleBillInput);
tipButtons.forEach(btn => btn.addEventListener('click', handleTipButtonClick));
peopleInput.addEventListener('input', handlePeopleInput);
resetBtn.addEventListener('click', resetCalculator);

// Initial calculation
calculateTip();