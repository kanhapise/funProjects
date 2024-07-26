const passwordLengthEl = document.getElementById("passwordLength");
const sliderEl = document.getElementById("slider");
const upperEl = document.getElementById("upper");
const lowerEl = document.getElementById("lower");
const symbolEl = document.getElementById("symbol");
const generatePasswordBtn = document.getElementById("generatePassword");
const copyBtn = document.getElementById("copybtn");
const passwordViewEl = document.getElementById("passwordView");

sliderEl.addEventListener("input", changeLength);
generatePasswordBtn.addEventListener("click", generatePassword);
copyBtn.addEventListener("click", copyPassword);

let passwordLength = null;

function changeLength() {
  const value = +sliderEl.value;
  passwordLength = value;
  passwordLengthEl.innerHTML = value;
}
changeLength();

function generatePassword() {
  const requiredField = [];
  const isUpperCaseChecked = upperEl.checked;
  const isLowerCaseChecked = lowerEl.checked;
  const isSymbolChecked = symbolEl.checked;

  if (isUpperCaseChecked) requiredField.push(generateRandomUpperCase);
  if (isLowerCaseChecked) requiredField.push(generateRandomLowerCase);
  if (isSymbolChecked) requiredField.push(generateRandomSymbol);

  passwordViewEl.innerHTML = getPassword(requiredField);
}
