var date1 = new Date('7/15/2004'); // month day year
var date2 = new Date();
var difference = (date2.getTime() - date1.getTime());
var days = Math.ceil(difference / (1000 * 3600 * 24)) - 1;
var DAYS = ["maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag", "zondag"]
var DayOfTheWeek = [1, 2, 3, 4, 5, 6, 7]
var DayDif = (days % 7)

for(var x = 0 ;x < DayOfTheWeek.length;x++){
    if((date2.getDay()) != DayOfTheWeek[0]){
        DayOfTheWeek.push(DayOfTheWeek.shift())
    }
}

for(var i = 0; i < DayDif; i++){
    DayOfTheWeek.unshift(DayOfTheWeek.pop())
}

console.log(DAYS[DayOfTheWeek[0]])