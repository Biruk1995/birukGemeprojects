let calculation = JSON.parse( localStorage.getItem('operation')) || '';
function evaluateOperation(value) {
  let text = document.querySelector('.js-display');
  if(value === '=') {
    calculation = eval(calculation);
    text.innerHTML = calculation;
  }else if(value === 'clear') {
    calculation = '';
    text.innerHTML = calculation;
  } else {
    calculation += value;
    text.innerHTML = calculation;
  }
  localStorage.setItem('operation',JSON.stringify(calculation));
}