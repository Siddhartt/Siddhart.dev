//CALC LEAP YEAR
// var now = new Date();
// var thisYear = 2019

// var isLeap = false;
// if(!((thisYear % 4) == 0)){
//     isLeap = false
// }else if(!((thisYear % 100) == 0)){
//     isLeap = true
// }else if(!((thisYear % 400) == 0)){
//     isLeap = false
// }else{
//     isLeap = true
// }

// if(isLeap){
//     console.log("Leap")
// }else{
//     console.log("NO Leap")
// }

//CALCULATE TOTAL YEARS AND MONTHS
// var day = 31;
// var month = 10;
// var year = 2015;
// var date = new Date();
// var TotalMonths = 0;

// TotalMonths += ((date.getFullYear() - year) * 12)
// TotalMonths += ((date.getMonth() + 1) - month)

// if(date.getDate() < day){
//     TotalMonths--
// }

// console.log(TotalMonths)

//CALC NAME OF DAY OF BIRTHDAY
var date1 = new Date('8/15/2004');
var date2 = new Date();
var difference = (date2.getTime() - date1.getTime());
var days = Math.round(difference/(1000 * 60 * 60 * 24));
var DAYS = ["maandag","dinsdag","woensdag","donderdag","vrijdag","zaterdag","zondag"]
var curDay = new Date().getDay() - 1
var DayDif = ((days % 7))

console.log(DayDif)
for (var x = 0; x < DAYS.length; x++){
    if(DAYS[x] == DAYS[curDay]){
        for(var i = 0; i < x; i++){
            DAYS.push(DAYS.shift())
        }
    }
}

console.log(DAYS)

if(DayDif < 0){
    var a = DayDif * -1
    console.log(DAYS[a])
}else if(DayDif == 0){
    console.log(DAYS[0])
}
else{
    var a = DayDif
    console.log(DAYS[DAYS.length - a])
}