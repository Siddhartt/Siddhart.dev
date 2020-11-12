document.addEventListener("DOMContentLoaded", () => {

    const YDM_Input = document.getElementsByClassName("AGE")
    for (var x = 0; x < YDM_Input.length; x++) {
        YDM_Input[x].addEventListener('input', UpdateAge);
        YDM_Input[x].addEventListener('propertychange', UpdateAge);
    }
})


function UpdateAge() {
    const outputElement = document.getElementById("YMOUTPUT")

    const DagInput = document.getElementById("DAG").value
    const MaandInput = document.getElementById("MAAND").value
    const JaarInput = document.getElementById("JAAR").value

    const Day = new Date()

    const ThisYear = Day.getFullYear();
    const ThisMonth = Day.getMonth() + 1;
    const ThisDay = Day.getDate()
        

    if ( (DagInput == ThisDay && MaandInput == ThisMonth && JaarInput == ThisYear) || !((DagInput >= 1 && DagInput <= 31) && (MaandInput >= 1 && MaandInput <= 12) && (JaarInput >= 1900 && JaarInput < ThisYear)) ) {
        outputElement.innerHTML = `<p style="color:red">Please enter a valid date</p>`
        return
    }

    var yearOut = (ThisYear - JaarInput);
    var monthOut = (ThisMonth - MaandInput);
    
    if((monthOut == -1) || (ThisDay <= DagInput)){
        monthOut = 11;
        yearOut -= 1;
    }
    var totalmonthOut = (monthOut + (yearOut * 12));

    if(monthOut == 1) {
        outputElement.innerHTML = `<p id="JAAR"><b>${yearOut}</b> jaar en <b>${monthOut}</b> maand.</p>
    <p id="MAANDEN"><b>${totalmonthOut}</b> Maanden</p>`
    return
    }
    outputElement.innerHTML = `<p id="JAAR"><b>${yearOut}</b> jaar en <b>${monthOut}</b> maanden.</p>
    <p id="MAANDEN"><b>${totalmonthOut}</b> Maanden</p>`
}