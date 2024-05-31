export function generate(
  length,
  includeLower,
  includeUpper,
  includeSymbol,
  includeNumber
) {
  let ans = "";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+-=";
  const req = [];

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function addLower() {
    ans += lowercaseChars[getRandomInt(0, lowercaseChars.length - 1)];
  }

  function addUpper() {
    ans += uppercaseChars[getRandomInt(0, uppercaseChars.length - 1)];
  }

  function addNumber() {
    ans += numberChars[getRandomInt(0, numberChars.length - 1)];
  }

  function addSymbol() {
    ans += symbolChars[getRandomInt(0, symbolChars.length - 1)];
  }
  req.push(addNumber);
  req.push(addLower);
  req.push(addSymbol);
  req.push(addUpper);

  let l1 = 0;
  if (includeLower) {
    addLower();
    l1 += 1;
  }
  if (includeNumber) {
    addNumber();
    l1 += 1;
  }
  if (includeSymbol) {
    addSymbol();
    l1 += 1;
  }
  if (includeUpper) {
    addUpper();
    l1 += 1;
  }

  // Calculate remaining length after adding required characters
  let remainingLength = length - l1;

  // Ensure remaining length is not negative
  if (remainingLength < 0) {
    remainingLength = 0;
  }

  // Add characters to fill remaining length
  while (remainingLength > 0) {
    let idx = getRandomInt(0, req.length - 1);
    req[idx](); // Call the function at req[idx]
    remainingLength--;
  }

  // Shuffle the generated password
  ans = shuffleString(ans);
  return ans;
}

function shuffleString(str) {
  let arr = str.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join("");
}
