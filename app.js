function checkCashRegister(price, cash, cid) {
  var diff = cash - price;
  var roundedDown = Math.floor(diff);
  // To prevent answers like "0.733333339", multiply by 100, then round to nearest integer
  var change = diff - roundedDown;
  change = Math.round(change * 100);
  var changeSmall = change / 100;
  var valueChange = [0.25, 0.10, 0.05, 0.01];
  var valueDollar = [100, 20, 10, 5, 1];
  var objChange = [];
  var objStatus = "OPEN";
  var cidArr = cid.slice();
  var cidDollarArr = [];
  var cidChangeArr = [];
  var reverseCidArr = cidArr.reverse();
  var testArr = [];
  var tempArr = [];
  var multiplier;
  var expArr = [];

  for (let i = 0; i < 5; i++) {
    cidDollarArr.push(reverseCidArr[i]);
  }

  for (let i = 5; i < 9; i++) {
    cidChangeArr.push(reverseCidArr[i]);
  }

  // Dollar
  for (let i = 0; i < valueDollar.length; i++) {
    if (roundedDown / valueDollar[i] >= 1 && cidDollarArr[i][1] !== 0) {
      multiplier = (Math.floor(roundedDown / valueDollar[i]));
      while (multiplier > (cidDollarArr[i][1] / valueDollar[i])) {
        multiplier -= 1;
      }
      testArr.push(multiplier * valueDollar[i]);
      tempArr.push(valueDollar[i]);
      roundedDown = (roundedDown - (multiplier * valueDollar[i]));
      roundedDown *= 100;
      roundedDown = Math.round(roundedDown);
      roundedDown = roundedDown / 100;

    }
  }

  var tempAddDollar = 0;
  for (let i = 0; i < testArr.length; i++) {
    tempAddDollar += testArr[i];
  }

  for (let i = 0; i < valueDollar.length; i++) {
    for (let j = 0; j < valueDollar.length; j++) {
      if (tempArr[j] == valueDollar[i]) {
        switch (valueDollar[i]) {
          case 100:
            expArr.push(["ONE HUNDRED", testArr[j]]);
            break;
          case 20:
            expArr.push(["TWENTY", testArr[j]]);
            break;
          case 10:
            expArr.push(["TEN", testArr[j]]);
            break;
          case 5:
            expArr.push(["FIVE", testArr[j]]);
            break;
          case 1:
            expArr.push(["ONE", testArr[j]]);
            break;
        }
      }
    }
  }

  testArr = [];
  tempArr = [];

  // Change
  for (let i = 0; i < valueChange.length; i++) {
    if (changeSmall / valueChange[i] >= 1 && cidChangeArr[i][1] !== 0) {
      multiplier = (Math.floor(changeSmall / valueChange[i]));
      while (multiplier > (cidChangeArr[i][1] / valueChange[i])) {
        multiplier -= 1;
      }
      testArr.push(multiplier * valueChange[i]);
      tempArr.push(valueChange[i]);
      changeSmall = (changeSmall - testArr[i]);
      changeSmall *= 100;
      changeSmall = Math.round(changeSmall);
      changeSmall = changeSmall / 100;
    }
  }

  var tempAddChange = 0;
  for (let i = 0; i < testArr.length; i++) {
    tempAddChange += testArr[i];
  }

  for (let i = 0; i < valueChange.length; i++) {
    for (let j = 0; j < valueChange.length; j++) {
      if (tempArr[j] == valueChange[i]) {
        switch (valueChange[i]) {
          case 0.25:
            expArr.push(["QUARTER", testArr[j]]);
            break;
          case 0.10:
            expArr.push(["DIME", testArr[j]]);
            break;
          case 0.05:
            expArr.push(["NICKEL", testArr[j]]);
            break;
          case 0.01:
            expArr.push(["PENNY", testArr[j]]);
            break;
        }
      }
    }
  }


  var tempReverseCidArr = 0;
  var tempExpArr = 0;
  for (let i = 0; i < reverseCidArr.length; i++) {
    tempReverseCidArr += reverseCidArr[i][1];
  }

  for (let i = 0; i < expArr.length; i++) {
    tempExpArr += expArr[i][1];
  }

  if (tempReverseCidArr == tempExpArr) {
    objStatus = "CLOSED";
    objChange = expArr;
  } else if (tempAddChange !== changeSmall) {
    objStatus = "INSUFFICIENT_FUNDS";
    objChange = [];
  }

  var ansObj = { status: "", change: "" };
  ansObj["status"] = objStatus;
  ansObj["change"] = objChange;

  console.log(ansObj);

  return ansObj;
}

checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);