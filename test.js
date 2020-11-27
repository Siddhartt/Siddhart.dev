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

//CALC NAME OF DAY OF BIRTHDAY
var date1 = new Date('11/9/2020');
var date2 = new Date();
var difference = date2.getTime() - date1.getTime();
var days = Math.ceil(difference/(1000 * 3600 * 24));
var DAYS = ["maandag","dinsdag","woensdag","donderdag","vrijdag","zaterdag","zondag"]
var curDay = new Date().getDay() - 1
var DayDif = ((days % 7) - 1) // good

for (var x = 0; x < DAYS.length; x++){
    if(DAYS[x] == DAYS[curDay]){
        for(var i = 0; i < x; i++){
            DAYS.push(DAYS.shift())
        }
    }
}

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