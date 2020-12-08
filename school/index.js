//GLOBAL VARS
var Nums = [];
var Access = false;

var DevMode = false;

//switch dev mode
function SwitchDevMode(){
    DevMode = !DevMode
    document.getElementById('DevMode').innerText = `Dev mode: ${DevMode}`
}

document.addEventListener("DOMContentLoaded", () => {

    //Call Function That will generate a random math problem
    genMathProblem();

    //add eventlisteners for every age inputfield.
    const YDM_Input = document.getElementsByClassName("AGE")
    for (var x = 0; x < YDM_Input.length; x++) {
        YDM_Input[x].addEventListener('input', UpdateAge);
        YDM_Input[x].addEventListener('propertychange', UpdateAge);
    }

    //get all inputfields
    const inputs = document.getElementsByTagName('input');

    //assign eventlistener for every inputfield
    //make "Doorgaan" button interactible when all inputfields are valid
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('input', CheckValid);
        inputs[i].addEventListener('propertychange', CheckValid);
    }

    //disable button on DOM loaded
    document.getElementById('SUBMIT').disabled = true
    document.getElementById('SUBMIT').style.marginTop = "25px"
})


//This is the function that will update the age-output text
function UpdateAge() {

    //define the output html div
    const outputElement = document.getElementById("YMOUTPUT");

    //declare main variables
    var day = Number(document.getElementById("DAG").value);
    var month = Number(document.getElementById("MAAND").value);
    var year = Number(document.getElementById("JAAR").value);

    //get today
    var curD = new Date();
    var TotalMonths = 0;

    //check if given values are valid. if not return Error
    if (!((day >= 1 && day <= 31) && (month >= 1 && month <= 12) && (year < curD.getFullYear() && year >= 1900))) {
        outputElement.innerHTML = `<p style="color:red;">Please enter a valid date!</p>`
        return;
    }

    //Add total months
    TotalMonths += ((curD.getFullYear() - year) * 12);
    TotalMonths += ((curD.getMonth() + 1) - month);

    //correction
    if (curD.getDate() < day) {
        TotalMonths--;
    }

    //calculate years and months for output
    var Years = Math.floor(TotalMonths / 12);
    var Months = Math.floor(TotalMonths % 12);

    //if statements to check if user is jaarig, maandig or none
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

//this is the function to calculate the string of the user birthday
function CheckDayOfBirth() {

    //declare vars
    var DayInp = Number(document.getElementById("DAG").value);
    var MonthInp = Number(document.getElementById("MAAND").value);
    var YearInp = Number(document.getElementById("JAAR").value);
    var curD = new Date();

    //check if input is valid
    if (!((DayInp >= 1 && DayInp <= 31) && (MonthInp >= 1 && MonthInp <= 12) && (YearInp < curD.getFullYear() && YearInp >= 1900))) {
        return;
    }

    //vars for date format
    var DayString = "";
    var DateString = `${MonthInp}/${DayInp}/${YearInp}`;
    var date1 = new Date(DateString);
    var date2 = new Date();
    var difference = date2.getTime() - date1.getTime();

    //calculate total days between given date and current date
    var days = Math.round(difference / (1000 * 3600 * 24));
    var DAYS = ["maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag", "zondag"];
    var curDay = new Date().getDay() - 1;

    //modulus 7 to get the days that are left
    var DayDif = ((days % 7));

    //shift array till current daystring is in position 0
    for (var x = 0; x < DAYS.length; x++) {
        if (DAYS[x] == DAYS[curDay]) {
            for (var i = 0; i < x; i++) {
                DAYS.push(DAYS.shift());
            }
        }
    }
    //Get the dateString

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

    //check if the user input was correct and return "klopt" if true and "klopt niet" if false
    var UserInp = document.getElementById('GD').value;

    //return output
    if (UserInp.toLowerCase() == (DayString.substring(0, 2).toLowerCase())) {
        document.getElementById('PUSHLOG').innerHTML = `<p style="color:green">Klopt</p>`;
        Access = true
    } else {
        document.getElementById('PUSHLOG').innerHTML = `<p style="color:red">Klopt Niet</p>`;
        Access = false
    }
}

function genMathProblem() {

    for (var x = 0; x < 3; x++) {
        var randNum = Math.floor(Math.random() * 89) + 10;
        Nums.push(randNum)

        //corrections to make the ui look good
        switch (x) {
            case (1):
                randNum += " x";
                break;

            case (2):
                randNum += " +";
                break;

            case (0):
                document.getElementById(x).style.marginRight = "12px";
                break;
        }
        document.getElementById(x).innerHTML = randNum;
    }
}

function CheckMathAnswers() {

    var FirstInp = document.getElementById('KEER')
    var SecInp = document.getElementById('PLUS')
    //calculate answers
    var keer = (Nums[0] * Nums[1])
    var som = (keer + Nums[2])

    //check if the giver value is equal to the answer or is equal to answer -+ (answer * 0.1%)
    if (FirstInp.value == keer || (FirstInp.value > (keer - (keer * 0.1)) && FirstInp.value < (keer + (keer * 0.1)))) {
        if (SecInp.value == som || (SecInp.value > (som - (som * 0.1)) && SecInp.value < (som + (som * 0.1)))) {
            document.getElementById('PUSHMATHLOG').innerHTML = `<p style="color:green">Klopt</p>`;
            Access = true
            return
        }
    }

    document.getElementById('PUSHMATHLOG').innerHTML = `<p style="color:red">Klopt Niet</p>`;
    Access = false
}

function CheckValid() {

    //Call MaxInput function
    MaxInput()
    //get all input objects
    const inputs = document.getElementsByTagName('input');
    var Enable = true;
    for (var i = 0; i < inputs.length; i++) {
        if (!inputs[i].value) {
            Enable = false
        }
    }

    //enable or disable button on state
    if (Enable) {
        document.getElementById('SubmitDiv').className = 'Submit SUB'
        document.getElementById('SUBMIT').disabled = false
    } else {
        document.getElementById('SubmitDiv').className = 'Submit'
        document.getElementById('SUBMIT').disabled = true
    }
}

function MaxInput() {

    //get all inputs and check if they are not over their limit
    const inputs = document.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
        var InputObject = inputs[i]
        if (InputObject.maxLength) {
            if (InputObject.value.length > InputObject.maxLength) {
                InputObject.value = InputObject.value.slice(0, InputObject.maxLength)
            }
        }
    }
}


function Submit() {
    //Check if all the inputs are valid
    CheckDayOfBirth();
    CheckMathAnswers();

    //find the main content div
    var MainDiv = document.getElementById('content')

    if (!DevMode) {
        if (Access) {
            MainDiv.innerHTML = `
        <div class="school">
            <div style="color:green" class="CenterT">WELKOM</div>
            </div>
        </div>`
        } else {
            MainDiv.innerHTML = `
        <div class="school">
            <div style="color:red" class="CenterT">GEEN TOEGANG</div>
            </div>
        </div>`
        }
    }
}