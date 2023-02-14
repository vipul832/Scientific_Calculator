const intext = document.querySelector("input");

const btn = document.querySelectorAll(".btn");

const numBtn = document.querySelectorAll(".num-btn");

const secondBtn = document.getElementsByClassName("2nd-btn-toggle");

const secondTrigo = document.getElementsByClassName("trigono-btn");

const secondTrigoH = document.getElementsByClassName("trigono-h-btn");

const secondTrigoHinv = document.getElementsByClassName("trigono-h-inv");

const arithBtn = document.getElementsByClassName("arith-btn");

const unit_text = document.getElementById("unit");

const tbtn = document.getElementsByClassName("t-btn");

let result = 0;

let flag_trig = false,
  flag_hyp = false,
  flag_hyp1 = false;

const obj = { deg: "true", rad: "false", grad: "false" };

//trigonometry

for (t of tbtn) {
  t.addEventListener("click", (e) => {
    intext.value += e.target.id;
  });
}

//add number in input text
for (num of numBtn) {
  num.addEventListener("click", (e) => {
    intext.value += e.target.id;
  });
}

//btn color change handler

function btnColorHandler(e) {
  e.classList.toggle("bg-primary");
}

//arithmatic operator

for (arith of arithBtn) {
  arith.addEventListener("click", (e) => {
    intext.value += e.target.id;
  });
}

//second btn status
function secondStatus(statue) {
  if (statue == false) {
    flag_trig = true;
  } else {
    flag_trig = false;
  }

  if (flag_hyp == true) {
    return;
  }

  if (flag_hyp1 == true) {
    return;
  }

  let setbtn1 = "trigo-btn-1";
  let setbtn2 = "d-none";
  Array.from(secondTrigo).map((btn) => {
    if (btn.classList.contains(setbtn1)) {
      btn.classList.toggle(setbtn2);
    } else {
      btn.classList.toggle(setbtn2);
    }
  });
}

//hyp status
function hypstatus(statue) {
  if (flag_hyp1 == false) {
    flag_hyp1 = true;
  } else {
    flag_hyp1 = false;
  }

  if (flag_trig == true) {
    if (flag_hyp == false) {
      flag_hyp = true;
    } else {
      flag_hyp = false;
    }
    let shbtn1 = "trigono-h-inv";
    let shbtn2 = "d-none";
    Array.from(secondTrigoHinv).map((btn) => {
      if (btn.classList.contains(shbtn1)) {
        btn.classList.toggle(shbtn2);
      } else {
        btn.classList.toggle(shbtn2);
      }
    });
  } else {
    flag_hyp = false;
    let shbtn1 = "trigono-h-btn";
    let shbtn2 = "d-none";
    Array.from(secondTrigoH).map((btn) => {
      if (btn.classList.contains(shbtn1)) {
        btn.classList.toggle(shbtn2);
      } else {
        btn.classList.toggle(shbtn2);
      }
    });
  }
}

// main loop

for (item of btn) {
  item.addEventListener("click", (e) => {
    let btnId = e.target.id;
    switch (btnId) {
      case "clear":
        intext.value = "";
        break;
      case "2nd":
        btnColorHandler(e.target);
        let secBtn1 = "2nd-btn-1";
        let secBtn2 = "d-none";
        Array.from(secondBtn).map((btn) => {
          if (btn.classList.contains(secBtn1)) {
            btn.classList.toggle(secBtn2);
          } else {
            btn.classList.toggle(secBtn2);
          }
        });
        break;
      case "second-fn-Trigono":
        if (flag_hyp1 != true) {
          btnColorHandler(e.target);

          secondStatus(flag_trig);
        }
        break;
      case "hyp":
        btnColorHandler(e.target);
        hypstatus(flag_hyp);
        break;
      case "pi":
        intext.value += "π";
        if (intext.value.length == 1) {
          result = Math.PI;
        }
        break;
      case "fe":
        let ex = intext.value;
        intext.value = parseFloat(ex).toExponential();
        break;
      case "e":
        intext.value += "e";
        if (intext.value.length == 1) {
          result = 2.7182;
        }
        break;
      case "erx":
        intext.value += "e^";
        break;
      case "mod":
        intext.value += "%";
        break;
      case "x2":
        let temp = intext.value;
        intext.value += "^2";
        result = expower(temp, 2);
        break;
      case "x3":
        let temp1 = intext.value;
        intext.value += "^3";
        result = expower(temp1, 3);
        break;
      case "2rx":
        intext.value += "2^";
        break;
      case "xry":
        intext.value += "^";
        break;
      case "2sqrt":
        let sq = intext.value;
        // intext.value += "sqrt";
        result = Math.sqrt(sq);
        break;
      case "3sqrt":
        let sq1 = intext.value;
        // intext.value += "cbrt";
        result = Math.cbrt(sq1);
        break;
      case "10rx":
        intext.value += "10^";
        break;
      case "unit":
        check_unit();
        break;
      case "log":
        intext.value += "log";
        break;
      case "ln":
        intext.value += "ln";
        break;
      case "fact":
        let newinput = intext.value;
        intext.value += "!";
        result = factorial(newinput);
        break;
      case "1/x":
        intext.value += "1/";
        break;
      case "rl":
        let l = intext.value.length;
        intext.value = intext.value.slice(0, l - 1);
        break;
      case ".":
        intext.value += ".";
        break;
      case "=":
        if (intext.value.includes("!")) {
          console.log("1");
          intext.value = result;
        } else if (intext.value.includes("^")) {
          console.log("2");
          if (intext.value.includes("10^")) {
            let pow = intext.value.split("^");
            intext.value = expower(10, parseInt(pow[1]));
          } else if (intext.value.includes("e^")) {
            let newtext = intext.value.replaceAll("e", 2.7182);
            let pow = newtext.split("^");
            console.log(pow);
            intext.value = expower(parseFloat(pow[0]), parseFloat(pow[1]));
          } else {
            let arr = intext.value.split("^");
            intext.value = expower(parseInt(arr[0]), parseInt(arr[1]));
          }
        } else if (intext.value.includes("log")) {
          console.log("3");
          let str = intext.value;
          let num = str.match(/(\d+)/);
          intext.value = Math.log10(num[0]);
        } else if (intext.value.includes("ln")) {
          console.log("4");
          let str = intext.value;
          let num = str.match(/(\d+)/);
          let logvalue = Math.log10(num[0]);
          intext.value = logvalue * 2.303;
        } else if (
          trigoprator.includes(intext.value.replace(/[^A-Za-z]/g, ""))
        ) {
          console.log("6");
          trigohandle(intext.value);
        } else if (
          intext.value.includes("+") ||
          intext.value.includes("-") ||
          intext.value.includes("*") ||
          intext.value.includes("/") ||
          intext.value.includes("^")
        ) {
          //solution;
          console.log("7");
          let newstr = intext.value;

          if (intext.value.includes("π") || intext.value.includes("e")) {
            let tempstr = intext.value.replaceAll("π", Math.PI);
            newstr = tempstr.replaceAll("e", 2.7182);
            console.log(newstr);
          }
          result = calculate(tokenize(newstr));
          intext.value = result;
        } else {
          console.log("8");

          if (intext.value.includes("%")) {
            let arr = intext.value.split("%");
            result = arr[0] % arr[1];
          }
          intext.value = result;
          result = 0;
        }
        break;
    }
  });
}

// tokenize the expression

function tokenize(s) {
  const r = [];
  let token = "";
  for (const character of s) {
    if ("^*/+-".includes(character)) {
      if (token === "" && character === "-") {
        token = "-";
      } else {
        r.push(parseFloat(token), character);
        token = "";
      }
    } else {
      token += character;
    }
  }
  if (token !== "") {
    r.push(parseFloat(token));
  }
  console.log(r);
  return r;
}

//arithmetic calculation area

function calculate(tokens) {
  // --- Perform a calculation expressed as an array of operators and numbers
  const operatorPrecedence = [
    { "^": (a, b) => Math.pow(a, b) },
    { "*": (a, b) => a * b, "/": (a, b) => a / b },
    { "+": (a, b) => a + b, "-": (a, b) => a - b },
  ];
  let operator;
  for (const operators of operatorPrecedence) {
    const newTokens = [];
    for (const token of tokens) {
      if (token in operators) {
        operator = operators[token];
      } else if (operator) {
        newTokens[newTokens.length - 1] = operator(
          newTokens[newTokens.length - 1],
          token
        );
        operator = null;
      } else {
        newTokens.push(token);
      }
    }
    tokens = newTokens;
  }
  if (tokens.length > 1) {
    console.log("Error: unable to resolve calculation");
    return tokens;
  } else {
    return tokens[0];
  }
}

// function solution(expression) {
//   let stackarr = [];

//   // Variable topp initialized with -1
//   let topp = -1;

//   // Push function for pushing
//   // elements inside stack
//   function push(e) {
//     topp++;
//     stackarr[topp] = e;
//   }

//   // Pop function for returning top element
//   function pop() {
//     if (topp == -1) return 0;
//     else {
//       var popped_ele = stackarr[topp];
//       topp--;
//       return popped_ele;
//     }
//   }
//   InfixtoPostfix();

//   function InfixtoPostfix() {
//     // Postfix array created
//     let postfix = [];
//     let temp = 0;
//     push("@");
//     let infixval = expression;
//     console.log(infixval);
//     // Iterate on infix string
//     for (let i = 0; i < infixval.length; i++) {
//       let el = infixval[i];

//       // Checking whether operator or not
//       if (operator(el)) {
//         if (el == ")") {
//           while (stackarr[topp] != "(") {
//             postfix[temp++] = pop();
//           }
//           pop();
//         }

//         // Checking whether el is (  or not
//         else if (el == "(") {
//           push(el);
//         }

//         // Comparing precedency of el and
//         // stackarr[topp]
//         else if (precedency(el) > precedency(stackarr[topp])) {
//           push(el);
//         } else {
//           while (precedency(el) <= precedency(stackarr[topp]) && topp > -1) {
//             postfix[temp++] = pop();
//           }
//           push(el);
//         }
//       } else {
//         postfix[temp++] = el;
//       }
//     }

//     // Adding character until stackarr[topp] is @
//     while (stackarr[topp] != "@") {
//       postfix[temp++] = pop();
//     }

//     let fpostfix = "";
//     let l = postfix.length - 1;
//     for (i = 0; i <= l; i++) {
//       fpostfix += postfix[i];
//     }
//     console.log("postfix expression:", fpostfix);
//     result = postfixEval(fpostfix);
//   }

//   //postfix to evalution

//   function postfixEval(exp) {
//     let stack1 = [];

//     // Scan all characters one by one
//     for (let i = 0; i < exp.length; i++) {
//       let c = exp[i];

//       // If the scanned character is an operand (number here),
//       // push it to the stack.
//       if (!isNaN(parseInt(c))) stack1.push(c.charCodeAt(0) - "0".charCodeAt(0));
//       //  If the scanned character is an operator, pop two
//       // elements from stack apply the operator
//       else {
//         let val1 = stack1.pop();
//         let val2 = stack1.pop();

//         switch (c) {
//           case "+":
//             stack1.push(val2 + val1);
//             break;

//           case "-":
//             stack1.push(val2 - val1);
//             break;

//           case "/":
//             stack1.push(val2 / val1);
//             break;

//           case "*":
//             stack1.push(val2 * val1);
//             break;
//           case "^":
//             stack1.push(val2 ** val1);
//             break;
//         }
//       }
//     }
//     return stack1.pop();
//   }
//   // operator
//   function operator(op) {
//     if (
//       op == "+" ||
//       op == "-" ||
//       op == "^" ||
//       op == "*" ||
//       op == "/" ||
//       op == "(" ||
//       op == ")"
//     ) {
//       return true;
//     } else return false;
//   }
//   //precedency
//   function precedency(pre) {
//     if (pre == "@" || pre == "(" || pre == ")") {
//       return 1;
//     } else if (pre == "+" || pre == "-") {
//       return 2;
//     } else if (pre == "/" || pre == "*") {
//       return 3;
//     } else if (pre == "^") {
//       return 4;
//     } else return 0;
//   }
// }

//Factorial function
function factorial(newinput) {
  let f = parseInt(newinput),
    ans = 1;
  while (f > 0) {
    ans *= f;
    f--;
  }
  return ans;
}

//check unit

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

const trigoprator = [
  "sin",
  "sinin",
  "sinh",
  "sinhin",
  "cos",
  "cosin",
  "cosh",
  "coshin",
  "tan",
  "tanin",
  "tanh",
  "tanhin",
  "sec",
  "secin",
  "sech",
  "sechin",
  "csc",
  "cscin",
  "csch",
  "cschin",
  "cot",
  "cotin",
  "coth",
  "cothin",
];

//Check the unit and covert

function trigohandle(inputText) {
  let str = inputText;
  let trigof = inputText.replace(/[^A-Za-z]/g, "");
  let num = str.match(/(\d+)/);
  let value = num[0];
  value = covertUnit(value);
  console.log("value:", value);
  handleTrigoFunction(str, value);
}

function covertUnit(value) {
  if (obj["deg"] == "true") {
    value = (value * Math.PI) / 180;
    console.log("Deg to radian", value);
    return value;
  } else if (obj["grad"] == "true") {
    value = value * 0.015708;
    console.log("grad to radian", value);
    return value;
  } else {
    return value;
  }
}

function handleTrigoFunction(text, value) {
  let x = text.replace(/[^A-Za-z]/g, "");
  if (text.match(/^sin/i)) {
    handleSin(x, value);
  } else if (text.match(/^cos/i)) {
    handleCos(x, value);
  } else if (text.match(/^tan/i)) {
    handleTan(x, value);
  } else if (text.match(/^sec/i)) {
    handleSec(x, value);
  } else if (text.match(/^csc/i)) {
    handleCosec(x, value);
  } else if (text.match(/^cot/i)) {
    handleCot(x, value);
  }
}

// Sin Handler

function handleSin(text, value) {
  switch (text) {
    case "sin":
      console.log("sin");
      intext.value = Math.sin(value);
      break;
    case "sinin":
      console.log("sin in");
      intext.value = Math.asin(value);
      break;
    case "sinh":
      console.log("sin h");
      intext.value = Math.sinh(value);
      break;
    case "sinhin":
      console.log("sin h in");
      intext.value = Math.asinh(value);
      break;
  }
}
//Cos Handler
function handleCos(text, value) {
  switch (text) {
    case "cos":
      console.log("cos");
      intext.value = Math.cos(value);
      break;
    case "cosin":
      console.log("cos in");
      intext.value = Math.acos(value);
      break;
    case "cosh":
      console.log("cos h");
      intext.value = Math.cosh(value);
      break;
    case "coshin":
      console.log("cos h in");
      intext.value = Math.acosh(value);
      break;
  }
}
//Tan handler
function handleTan(text, value) {
  switch (text) {
    case "tan":
      console.log("tan");
      intext.value = Math.round(Math.tan(value));
      break;
    case "tanin":
      console.log("tan in");
      intext.value = Math.atan(value);
      break;
    case "tanh":
      console.log("tan h");
      intext.value = Math.tanh(value);
      break;
    case "tanhin":
      console.log("tan h in");
      intext.value = Math.atanh(value);
      break;
  }
}
//Sec handler
function handleSec(text, value) {
  switch (text) {
    case "sec":
      console.log("sec");
      intext.value = 1 / Math.cos(value);
      break;
    case "secin":
      console.log("sec in");
      intext.value = 1 / Math.acos(value);
      break;
    case "sech":
      console.log("sec h");
      intext.value = 1 / Math.cosh(value);
      break;
    case "sechin":
      console.log("sec h in");
      intext.value = 1 / Math.acosh(value);
      break;
  }
}
//Cosec handler
function handleCosec(text, value) {
  switch (text) {
    case "csc":
      console.log("cosec");
      intext.value = 1 / Math.sin(value);
      break;
    case "cscin":
      console.log("cosec in");
      intext.value = 1 / Math.asin(value);
      break;
    case "csch":
      console.log("cosec h");
      intext.value = 1 / Math.sinh(value);
      break;
    case "cschin":
      console.log("cosec h in");
      intext.value = 1 / Math.asinh(value);
      break;
  }
}
//Cot handler
function handleCot(text, value) {
  switch (text) {
    case "cot":
      console.log("cot");
      intext.value = 1 / Math.tan(value);
      break;
    case "cotin":
      console.log("cot in");
      intext.value = 1 / Math.atan(value);
      break;
    case "coth":
      console.log("cot h");
      intext.value = 1 / Math.coth(value);
      break;
    case "cothin":
      console.log("cot h in");
      intext.value = 1 / Math.acoth(value);
      break;
  }
}

//function

function expower(num, pow) {
  return num ** pow;
}
