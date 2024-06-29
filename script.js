const numberInput = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const outputEl = document.getElementById("output");

const romanRulesObj = [
  {
    name: "unidades",
    a: "I",
    b: "V",
    c: "X",
  },
  {
    name: "decenas",
    a: "X",
    b: "L",
    c: "C",
  },
  {
    name: "centenas",
    a: "C",
    b: "D",
    c: "M",
  },
  {
    name: "miles",
    a: "M",
  },
];

function validateInput() {
  if (
    !numberInput.value ||
    numberInput.value % 1 !== 0 ||
    numberInput.value.includes("e")
  ) {
    outputEl.textContent = "Please enter a valid number";
    return false;
  } else if (numberInput.value < 1) {
    outputEl.textContent = "Please enter a number greater than or equal to 1";
    return false;
  } else if (numberInput.value >= 4000) {
    outputEl.textContent = "Please enter a number less than or equal to 3999";
    return false;
  }
  return true;
}

function convertNumeralToRoman(num) {
  const formatedNum = formatNum(num);
  const digits = formatedNum.length;
  let convertedNum = [];

  for (let i = digits - 1; i >= 0; i--) {
    convertedNum.push(convertDigit(i, Number(formatedNum[i])));
  }

  return convertedNum.join("");
}

function formatNum(num) {
  let formatedNum = num;
  while (Number(formatedNum[0]) === 0) {
    formatedNum = formatedNum.slice(1);
  }
  return formatedNum.split("").reverse().join("");
}

function convertDigit(i, num) {
  let romanDigit = "";

  if (num === 9) {
    romanDigit = romanRulesObj[i].a + romanRulesObj[i].c;
  } else if (num >= 5) {
    romanDigit = romanRulesObj[i].b;
    for (let j = 5; j < num; j++) {
      romanDigit += romanRulesObj[i].a;
    }
  } else if (num === 4) {
    romanDigit = romanRulesObj[i].a + romanRulesObj[i].b;
  } else if (num > 0) {
    for (let j = 0; j < num; j++) {
      romanDigit += romanRulesObj[i].a;
    }
  }

  return romanDigit;
}

convertBtn.addEventListener("click", () => {
  const inputIsValid = validateInput();
  if (!inputIsValid) return;
  outputEl.textContent = convertNumeralToRoman(numberInput.value);
});
