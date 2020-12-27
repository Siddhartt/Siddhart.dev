var date1 = new Date('7/15/2004');
var date2 = new Date();
var difference = (date2.getTime() - date1.getTime());
var days = Math.round(difference / (1000 * 60 * 60 * 24));
var DAYS = ["maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag", "zondag"]
var curDay = date2.getDay()
var DayDif = ((days % 7))

for (var x = 0; x < (curDay - 1); x++) {
    if(DAYS[x] != DAYS[curDay]){
        DAYS.push(DAYS.shift())
    }
}

if (DayDif < 0) {
    var a = DayDif * -1
    DayString = (DAYS[a]);
} else if (DayDif == 0) {
    DayString = (DAYS[0]);
}
else {
    var a = DayDif
    DayString = (DAYS[DAYS.length - a]);
}

console.log(DayString)