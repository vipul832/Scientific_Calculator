const inputElement = document.querySelector("input");

const allBtn = document.querySelectorAll(".btn");

const ARITHOPRATION = ["+", "-", "*", "/"];
const FACTORIAL = "FACTORIAL(";

let cal_data = {
  operation: [],
  formula: [],
};

const obj = { deg: "true", rad: "false", grad: "false" };

let ans = 0;

let cal_buttons = [
  {
    name: "1",
    symbol: "1",
    formula: "1",
    type: "number",
  },
  {
    name: "2",
    symbol: "2",
    formula: "2",
    type: "number",
  },
  {
    name: "3",
    symbol: "3",
    formula: "3",
    type: "number",
  },
  {
    name: "4",
    symbol: "4",
    formula: "4",
    type: "number",
  },
  {
    name: "5",
    symbol: "5",
    formula: "5",
    type: "number",
  },
  {
    name: "6",
    symbol: "6",
    formula: "6",
    type: "number",
  },
  {
    name: "7",
    symbol: "7",
    formula: "7",
    type: "number",
  },
  {
    name: "8",
    symbol: "8",
    formula: "8",
    type: "number",
  },
  {
    name: "9",
    symbol: "9",
    formula: "9",
    type: "number",
  },
  {
    name: "0",
    symbol: "0",
    formula: "0",
    type: "number",
  },
  {
    name: "addition",
    symbol: "+",
    formula: "+",
    type: "operator",
  },
  {
    name: "subtraction",
    symbol: "-",
    formula: "-",
    type: "operator",
  },
  {
    name: "multiplication",
    symbol: "x",
    formula: "*",
    type: "operator",
  },
  {
    name: "division",
    symbol: "÷",
    formula: "/",
    type: "operator",
  },
  {
    name: "clear",
    symbol: "C",
    formula: false,
    type: "key",
  },
  {
    name: "calculate",
    symbol: "=",
    formula: "=",
    type: "calculate",
  },
];

function check_unit() {
  if (obj.deg == "true") {
    obj.deg = "false";
    unit_text.innerHTML = "RAD";
    obj.rad = "true";
    obj.grad = "false";
  } else if (obj.rad == "true") {
    obj.rad = "false";
    unit_text.innerHTML = "GRAD";
    obj.deg = "false";
    obj.grad = "true";
  } else if (obj.grad == "true") {
    obj.grad = "false";
    unit_text.innerHTML = "DEG";
    obj.deg = "true";
    obj.grad = "false";
  }
}

for (item of allBtn) {
  item.addEventListener("click", (e) => {
    const targetbtn = e.target;
    cal_buttons.forEach((btn) => {
      if (btn.name == targetbtn.id) {
        calculator(btn);
      }
    });
  });
}

function calculator(btn) {
  if (btn.type == "operator") {
    cal_data.operation.push(btn.symbol);
    cal_data.formula.push(btn.formula);
    inputElement.value += btn.symbol;
  } else if (btn.type == "number") {
    cal_data.operation.push(parseInt(btn.symbol));
    cal_data.formula.push(btn.formula);
    inputElement.value += btn.symbol;
  } else if (btn.type == "trigo_function") {
    console.log("trigono function");
  } else if (btn.type == "math_function") {
    console.log("math function");
  } else if (btn.type == "key") {
    if (btn.symbol == "C") {
      inputElement.value = "";
      cal_data.operation = [];
      cal_data.formula = [];
    }
  } else if (btn.type == "calculate") {
    evalution(cal_data.operation);
  }
}

