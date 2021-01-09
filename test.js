var day = 15
var month = 7
var year = 2004

var startYearNums = (year.toString().slice(0, 2))

var YearC;
switch (Number(startYearNums)){
    case(20):
        YearC = 6
        break;
    case(19):
        YearC = 0
        break;
}

var MonthCList = [1, 4, 4, 0, 2, 5, 0, 3, 6, 1, 4, 6]
var MonthC = MonthCList[month - 1]


var DayOfTheWeek = (day + MonthC + YearC + Math.floor(Number(year.toString().slice(2))) + Math.floor(Math.floor(Number(year.toString().slice(2))) / 4)) % 7
var Days = ["zaterdag", "zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag"]
var DayString = Days[DayOfTheWeek]
console.log(DayString)