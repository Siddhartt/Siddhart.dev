document.addEventListener("DOMContentLoaded", () => {
    const YDM_Input = document.getElementsByClassName("AGE")
    for (var x = 0; x < YDM_Input.length; x++) {
        YDM_Input[x].addEventListener('input', UpdateAge);
        YDM_Input[x].addEventListener('propertychange', UpdateAge);
    }
})

function Submit() {
    CheckDayOfBirth();
}


function UpdateAge() {
    const outputElement = document.getElementById("YMOUTPUT")

    var day = Number(document.getElementById("DAG").value)
    var month = Number(document.getElementById("MAAND").value)
    var year = Number(document.getElementById("JAAR").value)

    var curD = new Date()

    if (!((day >= 1 && day <= 31) && (month >= 1 && month <= 12) && (year < curD.getFullYear() && year >= 1900))) {
        outputElement.innerHTML = `<p style="color:red;">Please enter a valid date!</p>`
        return
    }

    var TotalMonths = (((curD.getFullYear() * 12) + (curD.getMonth() + 1)) - ((year * 12) + month));
    var dayDif = (curD.getDate() - day)

    console.log(dayDif)

    // if (dayDif > 0) {
    //     TotalMonths -= 1
    // }

    if(day < curD.getDate()){
        TotalMonths--;
    }

    if(day > curD.getDate()){
        TotalMonths++;
    }

    console.log(TotalMonths)



    var Years = Math.floor(TotalMonths / 12)
    var Months = Math.floor(TotalMonths % 12)

    if ((curD.getDate() == day) && ((curD.getMonth() + 1) == month)) {
        outputElement.innerHTML = `
        <p class="Celebrate">🎉 Gefeliciteerd! 🎉</p>
        <p id="JAAR"><b>${Years}</b> jaar en <b>${Months}</b> maanden.</p>
        <p id="MAANDEN"><b>${TotalMonths}</b> Maanden</p>`
    } else if ((curD.getMonth() + 1) == month) {
        outputElement.innerHTML = `
        <p class="Celebrate">🎉 Gefeliciteerd Maandige! 🎉</p>
        <p id="JAAR"><b>${Years}</b> jaar en <b>${Months}</b> maanden.</p>
        <p id="MAANDEN"><b>${TotalMonths}</b> Maanden</p>`
    } else {
        outputElement.innerHTML = `
        <p id="JAAR"><b>${Years}</b> jaar en <b>${Months}</b> maanden.</p>
        <p id="MAANDEN"><b>${TotalMonths}</b> Maanden</p>`
    }
}

function CheckDayOfBirth() {
    //daclare vars
    var DayInp = Number(document.getElementById("DAG").value)
    var MonthInp = Number(document.getElementById("MAAND").value)
    var YearInp = Number(document.getElementById("JAAR").value)
    var curD = new Date()

    //check if input is valid
    if (!((DayInp >= 1 && DayInp <= 31) && (MonthInp >= 1 && MonthInp <= 12) && (YearInp < curD.getFullYear() && YearInp >= 1900))) {
        return
    }

    //if (!(DayInp || MonthInp || YearInp)) return;

    //Declare vars
    var DayString = ""
    var DateString = `${MonthInp}/${DayInp}/${YearInp}`
    var date1 = new Date(DateString);
    var date2 = new Date();
    var difference = date2.getTime() - date1.getTime();

    //Calculate days between today and input
    var days = Math.ceil(difference / (1000 * 3600 * 24));
    var DAYS = ["maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag", "zondag"]
    var curDay = new Date().getDay() - 1
    
    //Modulus of 7 to get rest of days
    var DayDif = ((days % 7) - 1)

    for (var x = 0; x < DAYS.length; x++) {
        if (DAYS[x] == DAYS[curDay]) {
            for (var i = 0; i < x; i++) {
                DAYS.push(DAYS.shift())
            }
        }
    }
    if (DayDif < 0) {
        var a = DayDif * -1
        DayString = (DAYS[a])
    } else if (DayDif == 0) {
        DayString = (DAYS[0])
    }
    else {
        var a = DayDif
        DayString = (DAYS[DAYS.length - a])
    }

    console.log(DayString)

    //Check if user is correct
    var UserInp = document.getElementById('GD').value

    if(UserInp.toLowerCase() == (DayString.substring(0,2).toLowerCase())){
        document.getElementById('PUSHLOG').innerHTML = `<p style="color:green">Klopt</p>`
    }else{
        document.getElementById('PUSHLOG').innerHTML = `<p style="color:red">Klopt Niet</p>`
    }
}