function checkCashRegister(price, cash, cid) {
  var diff = cash - price;
  var roundedDown = Math.floor(diff);
  // To prevent answers like "0.733333339", multiply by 100, then round to nearest integer
  var change = diff - roundedDown;
  change = Math.round(change * 100);

  // var valueChange = { "PENNY": 1, "NICKEL": 5, "DIME": 10, "QUARTER": 25 };

  // var valueDollar = { "HUNDRED": 100, "TWENTY": 20, "TEN": 10, "FIVE": 5, "ONE": 1 };

  var numOfBills = 0;
  var numOfCoins = 0;
  var dollarDenomArr = [100, 20, 10, 5, 1];
  var changeDenomArr = [25, 10, 5, 1];
  var dollarBreakDown = {};
  var changeBreakDown = {};
  var dollarBill;
  var changeVar;

  // Loop to determine breakdown of dollar denomination 
  for (let i = 0; i <= dollarDenomArr.length; i++) {
    if (roundedDown >= dollarDenomArr[i]) {
      numOfBills = Math.floor(roundedDown / dollarDenomArr[i]);
      dollarBreakDown[dollarDenomArr[i]] = numOfBills;
      dollarBill = parseInt(dollarDenomArr[i]);
      roundedDown = (roundedDown - (numOfBills * dollarBill));
    }
  }

  // Loop to determine breakdown of change denomination 
  for (let i = 0; i <= changeDenomArr.length; i++) {
    if (change >= changeDenomArr[i]) {
      numOfCoins = Math.floor(change / changeDenomArr[i]);
      changeBreakDown[changeDenomArr[i]] = numOfCoins;
      changeVar = parseInt(changeDenomArr[i]);
      change = (change - (numOfCoins * changeVar));
    }
  }

  console.log(dollarBreakDown);
  console.log(changeBreakDown);

  var ansArr = [];
  var tempVar = 0;

  for (let i in changeBreakDown) {
    switch (i) {
      case '25':
        tempVar = (changeBreakDown[i] * 25) / 100;
        ansArr.unshift(["QUARTER", tempVar]);
        break;
      case '10':
        tempVar = (changeBreakDown[i] * 10) / 100;
        ansArr.unshift(["DIME", tempVar]);
        break;
      case '5':
        tempVar = (changeBreakDown[i] * 5) / 100;
        ansArr.unshift(["NICKEL", tempVar]);
        break;
      case '1':
        tempVar = (changeBreakDown[i] * 1) / 100;
        ansArr.unshift(["PENNY", tempVar]);
        break;
      default:
        console.log("Error");
    }
  }

  for (let i in dollarBreakDown) {
    switch (i) {
      case '100':
        tempVar = (dollarBreakDown[i] * 100);
        ansArr.unshift(["ONE HUNDRED", tempVar]);
        break;
      case '20':
        tempVar = (dollarBreakDown[i] * 20);
        ansArr.unshift(["TWENTY", tempVar]);
        break;
      case '10':
        tempVar = (dollarBreakDown[i] * 10);
        ansArr.unshift(["TEN", tempVar]);
        break;
      case '5':
        tempVar = (dollarBreakDown[i] * 5);
        ansArr.unshift(["FIVE", tempVar]);
        break;
      case '1':
        tempVar = (dollarBreakDown[i] * 1);
        ansArr.unshift(["ONE", tempVar]);
        break;
      default:
        console.log("Error");
    }
  }
  var objChange;
  objChange = ansArr;

  var objStatus = "OPEN";

  var cidArr = cid.slice();
  console.log(cidArr);

  for (let i = 0; i < ansArr.length; i++) {
    for (let j = 0; j < cidArr.length; j++) {
      if (cidArr[j][0] == ansArr[i][0]) {
        if (cidArr[j][1] < ansArr[i][1]) {
          objStatus = "INSUFFICIENT_FUNDS";
          objChange = [];
          console.log("INSUFFICIENT_FUNDS");
        }
      }
    }
  }

  var ansObj = { status: "", change: "" };
  ansObj["status"] = objStatus;
  ansObj["change"] = objChange;

  console.log(ansObj);

  return ansObj;
}

checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);