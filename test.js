var bday = "17 6 1995"

var day = Number(bday.split(" ")[0])
var month = Number(bday.split(" ")[1])
var year = Number(bday.split(" ")[2])

var curD = new Date()

var TotalMonths = (((curD.getFullYear() * 12) + (curD.getMonth() +1)) - ((year * 12) + month));
var dayDif = (curD.getDate() - day)


if(dayDif > 0){
    TotalMonths -= 1
}

console.log("TotalMonths = " + TotalMonths)

var Years = Math.floor(TotalMonths / 12)
var Months = Math.floor(TotalMonths % 12)
console.log("Years: " + Years + " Months : " + Months)