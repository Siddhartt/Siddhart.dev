/*
Naam: Siddhart
Klas: 5H2
Docent: S.A. Ghiraw

Main: https://siddhart.dev/
Project: https://siddhart.dev/school
*/
//GLOBAL VARS
var Nums = [];
var Access = false;
var BirthTrue = false;

//Als dit aan staat wordt je niet gelijk naar een andere pagina gestuurd | Scroll naar beneden op pagina om aan te zetten.
var DevMode = false;

//switch dev mode
function SwitchDevMode() {
    DevMode = !DevMode
    document.getElementById('DevMode').innerText = `Dev mode: ${DevMode}`
}

function genMathProblem() {
    for (var x = 0; x < 3; x++) {
        //generate a random number between 10 and 99
        var randNum = Math.floor(Math.random() * 89) + 10;

        //save the numbers in an [] so we can use it later to check the users answer
        Nums.push(randNum)

        //corrections to make the ui look good
        switch (x) {
            //the second number should always have a 'x' next to it
            case (1):
                randNum += " x";
                break;
            //the third number should always have a 'x' next to it
            case (2):
                randNum += " +";
                break;
            //move the first number a bit to the left
            case (0):
                document.getElementById(x).style.marginRight = "12px";
                break;
        }
        //assign the random number to the element
        document.getElementById(x).innerHTML = randNum;
    }
}

//eventlistener die code uitvoert als de pagina geladen is
document.addEventListener("DOMContentLoaded", () => {

    //call Function That will generate a random math problem
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

    //declare main variables and convert to Number
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
    if ((curD.getDate() == day) && ((curD.getMonth() + 1) == month)) {//user is jarig
        outputElement.innerHTML = `
        <p class="Celebrate">🎉 Gefeliciteerd! 🎉</p>
        <p id="JAAR"><b>${Years}</b> jaar en <b>${Months}</b> maanden.</p>
        <p id="MAANDEN"><b>${TotalMonths}</b> Maanden</p>`
    } else if ((curD.getMonth() + 1) == month) {//user is maandig
        outputElement.innerHTML = `
        <p class="Celebrate">🎉 Gefeliciteerd Maandige! 🎉</p>
        <p id="JAAR"><b>${Years}</b> jaar en <b>${Months}</b> maanden.</p>
        <p id="MAANDEN"><b>${TotalMonths}</b> Maanden</p>`
    } else {//user is none
        outputElement.innerHTML = `
        <p id="JAAR"><b>${Years}</b> jaar en <b>${Months}</b> maanden.</p>
        <p id="MAANDEN"><b>${TotalMonths}</b> Maanden</p>`
    }
}

//this is the function to calculate the string of the user birthday
function CheckDayOfBirth() {
    //convert given string input to an int and assign to the correct value
    var day = Number(document.getElementById("DAG").value);
    var month = Number(document.getElementById("MAAND").value);
    var year = Number(document.getElementById("JAAR").value);

    //Get the first 2 numbers from the year input
    var startYearNums = (year.toString().slice(0, 2))

    //array with the yearCodes we need to use these in our calculation later
    var YearC;
    switch (Number(startYearNums)) {
        case (20):
            YearC = 6
            break;
        case (19):
            YearC = 0
            break;
    }

    //array with the monthCodes we need to use these in our calculation later
    var MonthCList = [1, 4, 4, 0, 2, 5, 0, 3, 6, 1, 4, 6]
    //define the MonthCode variable
    var MonthC = MonthCList[month - 1]

    /*calculate the DayOfTheWeek
        calculation = (day + MonthCode + yearCode + last_2_numbers_from_year + (last_2_numbers_from_year / 4) % 7).
        This will result in a number between 0 - 6
    */
    var DayOfTheWeek = (day + MonthC + YearC + Math.floor(Number(year.toString().slice(2))) + Math.floor(Math.floor(Number(year.toString().slice(2))) / 4)) % 7
    //define the days of the week in an array
    var Days = ["zaterdag", "zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag"]
    //define the day string of the given date
    var DayString = Days[DayOfTheWeek]

    //check if the user input was correct and return "klopt" if true and "klopt niet" if false
    var UserInp = document.getElementById('GD').value;
    //return output
    if (UserInp.toLowerCase() == (DayString.substring(0, 2).toLowerCase())) {
        document.getElementById('PUSHLOG').innerHTML = `<p style="color:green">Klopt</p>`;
        BirthTrue = true
    } else {
        document.getElementById('PUSHLOG').innerHTML = `<p style="color:red">Klopt Niet</p>`;
        BirthTrue = false
    }
}

//function to check if the given values are correct 
function CheckMathAnswers() {
    //assign the given inputs to variables
    var FirstInp = document.getElementById('KEER')
    var SecInp = document.getElementById('PLUS')

    //calculate answers
    var keer = (Nums[0] * Nums[1])
    var som = (keer + Nums[2])

    //check if the given value is equal to the answer or is equal to answer -+ (answer * 0.1%)
    if (FirstInp.value == keer || (FirstInp.value > (keer - (keer * 0.1)) && FirstInp.value < (keer + (keer * 0.1)))) {
        if (SecInp.value == som || (SecInp.value > (som - (som * 0.1)) && SecInp.value < (som + (som * 0.1)))) {
            document.getElementById('PUSHMATHLOG').innerHTML = `<p style="color:green">Klopt</p>`;
            MathTrue = true
            return
        }
    }

    document.getElementById('PUSHMATHLOG').innerHTML = `<p style="color:red">Klopt Niet</p>`;
    MathTrue = false
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

    if (BirthTrue == true && MathTrue == true) {
        Access = true
    }

    //find the main content div
    var MainDiv = document.getElementById('content')

    if (!DevMode) {
        if (Access) {
            MainDiv.innerHTML = `
        <div class="school">
            <div class="CenterT GREEN">
            <p>WELKOM</p>
            <a href="/school"><button class="EndB">Terug</button></a>
            </div>
        </div>`
        } else {
            MainDiv.innerHTML = `
        <div class="school">
            <div class="CenterT RED">
            <p>GEEN TOEGANG</p>
            <a href="/school"><button class="EndB" >Terug</button></a>
            </div>       
        </div>`
        }
    }
}