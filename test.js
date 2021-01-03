var day = 15
var month = 7
var year = 2004

var startYearNums = (year.toString().slice(0, 2))
var YearCList = [6, 0, 2, 4]

for (var x = 0; x < 20 - startYearNums; x++) {
    YearCList.push(YearCList.shift())
}

var YearC = YearCList[0]

var MonthCList = [1, 4, 4, 0, 2, 5, 0, 3, 6, 1, 4, 6]
var MonthC = MonthCList[month - 1]


var DayOfTheWeek = (day + MonthC + YearC + Math.floor(Number(year.toString().slice(2))) + Math.floor(Math.floor(Number(year.toString().slice(2))) / 4)) % 7
var Days = ["zaterdag", "zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag"]
var DayString = Days[DayOfTheWeek]