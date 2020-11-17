document.addEventListener("DOMContentLoaded", () => {
    const YDM_Input = document.getElementsByClassName("AGE")
    for (var x = 0; x < YDM_Input.length; x++) {
        YDM_Input[x].addEventListener('input', UpdateAge);
        YDM_Input[x].addEventListener('propertychange', UpdateAge);
    }
})


function UpdateAge() {
    const outputElement = document.getElementById("YMOUTPUT")

    var day = Number(document.getElementById("DAG").value)
    var month = Number(document.getElementById("MAAND").value)
    var year = Number(document.getElementById("JAAR").value)

    var curD = new Date()

    if(!((day >= 1 && day<= 31) && (month >= 1 && month <= 12) && (year < curD.getFullYear() && year >= 1900))){
        outputElement.innerHTML = `<p style="color:red;">Please enter a valid date!</p>`
        return
    }

    var TotalMonths = (((curD.getFullYear() * 12) + (curD.getMonth() +1)) - ((year * 12) + month));
    var dayDif = (curD.getDate() - day)


    if(dayDif > 0){
        TotalMonths -= 1
    }

    var Years = Math.floor(TotalMonths / 12)
    var Months = Math.floor(TotalMonths % 12)

    outputElement.innerHTML = `<p id="JAAR"><b>${Years}</b> jaar en <b>${Months}</b> maanden.</p>
    <p id="MAANDEN"><b>${TotalMonths}</b> Maanden</p>`
}