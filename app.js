// all btn selector
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

// all global variable

let result = 0,
  msarr = [],
  flag_trig = false,
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

//memery button setter

function enableMemoryBtn() {
  let mnum = parseInt(localStorage.getItem("storenum"));
  let msnum = localStorage.getItem("numberStore");
  let mcbtn = document.getElementById("mc");
  let mrbtn = document.getElementById("mr");

  if (mnum == 0 && msnum == "") {
    mcbtn.disabled = true;
    mrbtn.disabled = true;
  } else {
    mcbtn.disabled = false;
    mrbtn.disabled = false;
  }
}

enableMemoryBtn();

// main loop

for (item of btn) {
  item.addEventListener("click", (e) => {
    let btnId = e.target.id;
    switch (btnId) {
      //DEG
      case "unit":
        check_unit();
        break;
      // F-E
      case "fe":
        let ex = intext.value;
        intext.value = parseFloat(ex).toExponential();
        break;
      //MC
      case "mc":
        localStorage.setItem("numberStore", []);
        localStorage.setItem("storenum", 0);
        msarr = [];
        enableMemoryBtn();
        break;
      //MR
      case "mr":
        let mr = parseFloat(localStorage.getItem("storenum"));
        intext.value = mr;
        break;
      //M+
      case "m+":
        let cur = parseInt(localStorage.getItem("storenum"));
        let add = parseInt(intext.value);
        localStorage.setItem("storenum", cur + add);
        enableMemoryBtn();
        break;
      //M-
      case "m-":
        let curnum = parseInt(intext.value);
        let sup = parseInt(localStorage.getItem("storenum")) - curnum;
        localStorage.setItem("storenum", sup);
        break;
      //MS
      case "ms":
        msarr.push(intext.value);
        localStorage.setItem("numberStore", msarr);
        enableMemoryBtn();
        break;
      // Trigonometry 2nd btn
      case "second-fn-Trigono":
        if (flag_hyp1 != true) {
          btnColorHandler(e.target);

          secondStatus(flag_trig);
        }
        break;
      // Trigonometry hyp btn
      case "hyp":
        btnColorHandler(e.target);
        hypstatus(flag_hyp);
        break;
      // Function |x|
      case "fmodx":
        let neg2 = parseFloat(intext.value);
        if (neg2 < 0) {
          intext.value = 0 - neg2;
        }
        break;
      // Function ⎣x⎦
      case "fmodxl":
        let f = parseFloat(intext.value);
        intext.value = Math.floor(f);
        break;
      // Function ⎡x⎤
      case "fmodxu":
        let c = parseFloat(intext.value);
        intext.value = Math.ceil(c);
        break;
      // Function rand
      case "frand":
        if (intext.value.length == 0) {
          intext.value = Math.random();
        } else {
          let range = parseInt(intext.value);
          intext.value = Math.floor(Math.random() * range);
        }
        break;
      // Function dms
      case "fdms":
        if (obj.deg == "true") {
          let dd = parseFloat(intext.value);
          let d = parseInt(dd);
          let m = Math.round((dd - d) * 60);
          let s = Math.round((dd - d - m / 60) * 3600);
          intext.value = d + ":" + m + ":" + s;
        }
        break;
      // Function deg
      case "fdeg":
        if (obj.deg == "true") {
          return;
        } else if (obj.rad == "true") {
          let rvalue = parseFloat(intext.value);
          let ans = rvalue * (180 / Math.PI);
          intext.value = ans.toFixed(4);
        }
        break;
      //2nd btn
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
      // pi btn
      case "pi":
        intext.value += "π";
        if (intext.value.length == 1) {
          result = Math.PI;
        }
        break;
      // e btn
      case "e":
        intext.value += "e";
        if (intext.value.length == 1) {
          result = 2.7182;
        }
        break;
      // C
      case "clear":
        intext.value = "";
        break;
      // delete
      case "del":
        let l = intext.value.length;
        intext.value = intext.value.slice(0, l - 1);
        break;
      // x^2
      case "x2":
        let temp = intext.value;
        intext.value += "^2";
        result = expower(temp, 2);
        break;
      // x^3
      case "x3":
        let temp1 = intext.value;
        intext.value += "^3";
        result = expower(temp1, 3);
        break;
      // 1/x
      case "1/x":
        intext.value += "1/";
        break;
      // |x|
      case "modx":
        let neg = parseFloat(intext.value);
        if (neg < 0) {
          intext.value = 0 - neg;
        }
        break;
      // exp
      case "exp":
        intext.value += "e+";
        break;
      // mod
      case "mod":
        intext.value += "%";
        break;
      // 2sqrt x
      case "2sqrt":
        let sq = intext.value;
        result = Math.sqrt(sq);
        break;
      // 3sqrt x
      case "3sqrt":
        let sq1 = intext.value;
        result = Math.cbrt(sq1);
        break;
      // factorial
      case "fact":
        let newinput = intext.value;
        intext.value += "!";
        result = factorial(newinput);
        break;
      // x^y
      case "xry":
        intext.value += "^";
        break;
      // ysqrt x
      case "ysqrtx":
        intext.value += "rt";
        break;
      // 10^x
      case "10rx":
        intext.value += "10^";
        break;
      // 2^x
      case "2rx":
        intext.value += "2^";
        break;
      //log
      case "log":
        intext.value += "log";
        break;
      //log base y (x)
      case "logbyx":
        intext.value += "logb";
        break;
      //ln
      case "ln":
        intext.value += "ln";
        break;
      //e^x
      case "erx":
        intext.value += "e^";
        break;
      // +/-
      case "postoneg":
        let neg1 = parseFloat(intext.value);
        if (neg1 < 0) {
          intext.value = 0 - neg1;
        } else {
          intext.value = 0 - neg1;
        }
        break;
      // .
      // case "dot":
      //   intext.value += ".";
      //   break;
      // =
      case "=":
        if (intext.value.length == 0) {
          return;
        } else if (intext.value.includes("!")) {
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
        } else if (intext.value.includes("logb")) {
          console.log("3");
          let logarr = intext.value.split("logb");
          let logb = logarr[0];
          let logx = logarr[1];
          intext.value = Math.log(logx) / Math.log(logb);
        } else if (intext.value.includes("log")) {
          console.log("4");
          let str = intext.value;
          let num = str.match(/(\d+)/);
          intext.value = Math.log10(num[0]);
        } else if (intext.value.includes("rt")) {
          console.log("5");
          let rt = intext.value.split("rt");
          let base = parseInt(rt[1]);
          let root = parseInt(rt[0]);
          intext.value = Math.pow(base, 1 / root);
        } else if (intext.value.includes("ln")) {
          console.log("6");
          let str = intext.value;
          let num = str.match(/(\d+)/);
          let logvalue = Math.log10(num[0]);
          intext.value = logvalue * 2.303;
        } else if (
          trigoprator.includes(intext.value.replace(/[^A-Za-z]/g, ""))
        ) {
          console.log("7");
          trigohandle(intext.value);
        } else if (intext.value.match(/^(\d+)e+/)) {
          console.log("8");
          let expf = intext.value;
          let exparr = expf.split("e+");
          intext.value = exparr[0] * Math.pow(10, exparr[1]);
        } else if (
          intext.value.includes("+") ||
          intext.value.includes("-") ||
          intext.value.includes("*") ||
          intext.value.includes("/") ||
          intext.value.includes("^")
        ) {
          //solution;
          console.log("9");
          let newstr = intext.value;

          //index of bracket
          if (intext.value.includes("(")) {
            let teststr = intext.value;
            let numofb = countNumberOfBacket(intext.value);

            if (teststr.includes("π") || teststr.includes("e")) {
              let tempstr = teststr.replaceAll("π", Math.PI);
              teststr = tempstr.replaceAll("e", 2.7182);
            }

            let valueofb = cal_bracket(teststr);
            let pretext,
              j = 0;
            for (i = 0; i < numofb; i++) {
              pretext = teststr.replace(/\(.*?\)/, valueofb[j]);
              teststr = pretext;
              j++;
            }
            newstr = pretext;
          }

          if (newstr.includes("π") || newstr.includes("e")) {
            let tempstr = newstr.replaceAll("π", Math.PI);
            newstr = tempstr.replaceAll("e", 2.7182);
          }

          console.log("newstr:", newstr);
          result = calculate(tokenize(newstr));
          intext.value = result;
        } else {
          console.log("10");

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
    if ("^*/+-()".includes(character)) {
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
      intext.value = 1 / Math.tanh(value);
      break;
    case "cothin":
      console.log("cot h in");
      intext.value = 1 / Math.atanh(value);
      break;
  }
}

//function power
function expower(num, pow) {
  return num ** pow;
}

//let newtext=text.replace(/\(.*?\)/,5);

//function of no of bracket
function countNumberOfBacket(text) {
  let coun = 0;
  for (let i = 0; i < text.length; i++) {
    if (text[i] == "(") {
      coun++;
    }
  }
  return coun;
}

//function calculate bracket

function cal_bracket(text) {
  let index,
    solutionofB = [];
  let out = calculate(tokenize(text));
  console.log("out:", out);
  for (let i in out) {
    if (out[i] == "(") {
      index = i;
      while (out[index] != ")") {
        if (out[index] != "(") {
          solutionofB.push(out[index]);
        }
        index++;
      }
    }
  }
  return solutionofB;
}
