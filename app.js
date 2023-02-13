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

//arithmatic operator

for (arith of arithBtn) {
  arith.addEventListener("click", (e) => {
    intext.value += e.target.id;
  });
}

let flag_trig = false;

for (item of btn) {
  item.addEventListener("click", (e) => {
    let btnId = e.target.id;
    switch (btnId) {
      case "clear":
        intext.value = "";
        break;
      case "2nd":
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
        let setbtn1 = "trigo-btn-1";
        let setbtn2 = "d-none";
        console.log(flag_trig);
        Array.from(secondTrigo).map((btn) => {
          if (btn.classList.contains(setbtn1)) {
            btn.classList.toggle(setbtn2);
          } else {
            btn.classList.toggle(setbtn2);
          }
        });
        console.log(flag_trig);
        break;
      case "hyp":
        let shbtn1 = "trigono-h-btn";
        let shbtn2 = "d-none";

        if (flag_trig == true) {
          console.log("2nd is one");
        } else {
          Array.from(secondTrigoH).map((btn) => {
            if (btn.classList.contains(shbtn1)) {
              btn.classList.toggle(shbtn2);
            } else {
              btn.classList.toggle(shbtn2);
            }
          });
        }
        break;
      case "pi":
        intext.value += "π";
        break;
      case "mod":
        var m = intext.value;
        intext.value += "%";
        break;
      case "x2":
        let temp = intext.value;
        intext.value += "^2";
        result = temp ** 2;
        break;
      case "2sqrt":
        let sq = intext.value;
        intext.value += "sqrt";
        result = Math.sqrt(sq);
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
      case "=":
        if (intext.value.includes("!")) {
          intext.value = result;
        } else if (intext.value.includes("π")) {
          intext.value = intext.value.replaceAll("π", "3.14");
        } else if (
          intext.value.includes("^") &&
          !(intext.value.includes("+") && intext.value.includes("-"))
        ) {
          if (intext.value.includes("10^")) {
            let pow = parseInt(intext.value.slice(-1));
            intext.value = 10 ** pow;
          } else intext.value = result;
        } else if (intext.value.includes("log")) {
          let str = intext.value;
          let num = str.match(/(\d+)/);
          intext.value = Math.log10(num[0]);
        } else if (intext.value.includes("ln")) {
          let str = intext.value;
          let num = str.match(/(\d+)/);
          let logvalue = Math.log10(num[0]);
          intext.value = logvalue * 2.303;
        } else if (intext.value.includes("%")) {
          let n = parseInt(intext.value.slice(-1));
          console.log(m, n);
        } else if (
          intext.value.includes("+") ||
          intext.value.includes("-") ||
          intext.value.includes("*") ||
          intext.value.includes("/") ||
          intext.value.includes("^")
        ) {
          //solution;
          result = calculate(tokenize(intext.value));
          intext.value = result;
        } else if (trigoprator.includes(intext.value.slice(0, 3))) {
          trigohandle(intext.value);
        } else {
          intext.value = result;
        }
        break;
    }
  });
}

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
  console.log("r", r);
  return r;
}

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
  "sin-in",
  "sin-h",
  "sin-h-in",
  "cos",
  "cos-in",
  "cos-h",
  "cos-h-in",
  "tan",
  "tan-in",
  "tan-h",
  "tan-h-in",
  "sec",
  "sec-in",
  "sec-h",
  "sec-h-in",
  "cosec",
  "cosec-in",
  "cosec-h",
  "cosec-h-in",
  "cot",
  "cot-in",
  "cot-h",
  "cot-h-in",
];

function trigohandle(inputText) {
  let str = intext.value;
  let num = str.match(/(\d+)/);
  let value = num[0];
  if (obj["deg"] == "true") {
    value = value * 0.0174533;
    console.log(value);
  }
}
