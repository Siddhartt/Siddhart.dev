document.addEventListener("DOMContentLoaded", () => {

    const YDM_Input = document.getElementsByClassName("AGE")
    for (var x = 0; x < YDM_Input.length; x++) {
        YDM_Input[x].addEventListener('input', UpdateAge);
        YDM_Input[x].addEventListener('propertychange', UpdateAge);
    }
})


function UpdateAge() {
    const output = document.getElementById("YMOUTPUT")

    const Dag = document.getElementById("DAG").value
    const Maand = document.getElementById("MAAND").value
    const Jaar = document.getElementById("JAAR").value

    if(!(Dag && Maand && Jaar)){
        output.innerHTML = `<p style="color:red">Please enter a valid date</p>`
        return;
    }
    else if(!((Dag > 0 && Dag <= 31 && !(Dag.startsWith(0))) && (Maand > 0 && Maand <= 12 && !(Maand.startsWith(0))) && (Jaar >= 1900 && Jaar <= (new Date().getFullYear())&& !(Jaar.startsWith(0))))){
        output.innerHTML = `<p style="color:red">Please enter a valid date</p>`
        return;
    }else{

        var yearOut = (new Date().getFullYear() - Jaar);
        var monthOut = (new Date().getMonth() - Maand);

        var TotalMonthOut = (yearOut * 12) + monthOut;

        output.innerHTML = `<p id="JAAR"><b>${yearOut}</b> jaar en <b>${monthOut}</b> maanden.</p>
        <p id="MAANDEN"><b>${TotalMonthOut}</b> Maanden</p>`
    }
}

//TODO
/**
 * TEST TEST TEST
 */