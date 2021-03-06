/*
Naam: Siddhart
Klas: 5H2
Docent: S.A. Ghiraw

Main: https://siddhart.dev/
Project: https://siddhart.dev/school
Project Github Repo: https://github.com/Siddhartt/Siddhart.dev
*/

//GLOBAL VARS
var Nums = [];
var BirthTrue = false;
var MathTrue = false
var Access = false;
var Age = 0;
var Valid = false;

//Als dit aan staat wordt je niet gelijk naar een andere pagina gestuurd | Scroll naar beneden op pagina om aan te zetten.
var DevMode = false;

//switch dev mode
function SwitchDevMode() {
    DevMode = !DevMode
    document.getElementById('DevMode').innerText = `Dev mode: ${DevMode}`
}

//shuffle the given array
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

//Generate the Math Problem
function genMathProblem() {
    for (var x = 0; x < 3; x++) {
        //generate a random number between 10 and 99
        var randNum = Math.floor(Math.random() * 89) + 10;

        //save the numbers in an array so we can use it later to check the answers given by the user
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

//eventListenen that will run the code if the content of the page is loaded
document.addEventListener("DOMContentLoaded", () => {

    //call Function that will generate the random math problem
    genMathProblem();

    //add eventlisteners for every age inputfield.
    const YDM_Input = document.getElementsByClassName("AGE")
    for (var x = 0; x < YDM_Input.length; x++) {
        YDM_Input[x].addEventListener('input', UpdateAge);
        YDM_Input[x].addEventListener('propertychange', UpdateAge);
    }

    //get all inputfields objects
    const inputs = document.getElementsByTagName('input');

    //assign eventlistener for every inputfield
    //make "Doorgaan" button interactible when all inputfields are valid
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('input', CheckValid);
        inputs[i].addEventListener('propertychange', CheckValid);
    }

    //disable button when page is loaded
    document.getElementById('SUBMIT').disabled = true
    document.getElementById('SUBMIT').style.marginTop = "25px"
})


//This is the function that will update the age-output text
function UpdateAge() {

    //define the output html div
    const outputElement = document.getElementById("YMOUTPUT");

    //Get the inputfield fron the html file and convert the strings to an Number so we can use it in the calculations
    var day = Number(document.getElementById("DAG").value);
    var month = Number(document.getElementById("MAAND").value);
    var year = Number(document.getElementById("JAAR").value);

    //Get data of the current date
    var curD = new Date();
    var TotalMonths = 0;

    //check if given values are valid. if not return Error
    if (!((day >= 1 && day <= 31) && (month >= 1 && month <= 12) && (year < curD.getFullYear() && year >= 1900))) {
        outputElement.innerHTML = `<p style="color:red;">Please enter a valid date!</p>`
        return;
    }

    //check of de gebruiker niet jonger is dan 10 of ouder dan 100


    //Add result of calculations to the totalMonths var
    TotalMonths += ((curD.getFullYear() - year) * 12);//every year is + 12 years
    TotalMonths += ((curD.getMonth() + 1) - month);//add the differnece in months

    //If the current day is less than the day input that means that the month was not finished. 
    //If the condition is true we remove one month from the totalMonths
    if (curD.getDate() < day) {
        TotalMonths--;
    }

    //calculate years and months for output
    var Years = Math.floor(TotalMonths / 12);
    var Months = Math.floor(TotalMonths % 12);

    //check if the user is younger than 10 years old or older than 100
    if (Years < 10) {
        outputElement.innerHTML = `<p style="color:red;">Je bent te jong!</p>`
        Valid = false
        return;
    } else if (Years > 100) {
        outputElement.innerHTML = `<p style="color:red;">U bent te oud!</p>`
        Valid = false
        return;
    }

    Age = Years;

    //if statements to check if user is jaarig, maandig or none
    if ((curD.getDate() == day) && ((curD.getMonth() + 1) == month)) {//user is jarig
        outputElement.innerHTML = `
        <p class="Celebrate">🎉 Gefeliciteerd! 🎉</p>
        <p id="JAAR"><b>${Years}</b> jaar en <b>${Months}</b> maanden.</p>
        <p id="MAANDEN"><b>${TotalMonths}</b> Maanden</p>`
    } else if (curD.getDate() == day) {//user is maandig
        outputElement.innerHTML = `
        <p class="Celebrate">🎉 Gefeliciteerd Maandige! 🎉</p>
        <p id="JAAR"><b>${Years}</b> jaar en <b>${Months}</b> maanden.</p>
        <p id="MAANDEN"><b>${TotalMonths}</b> Maanden</p>`
    } else {//user is none
        outputElement.innerHTML = `
        <p id="JAAR"><b>${Years}</b> jaar en <b>${Months}</b> maanden.</p>
        <p id="MAANDEN"><b>${TotalMonths}</b> Maanden</p>`
    }

    Valid = true
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

    //Call MaxInput function to check if the input is not over its limit
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
    if (Enable && Valid) {
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

    if (BirthTrue == true && MathTrue == true) {
        Access = true
    }

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
            //question about art
            if (!BirthTrue) {
                notCorrect()
                return;
            }

            var MainDiv = document.getElementById('content')

            //array with questions
            var Question = [
                {
                    "image": "https://images1.persgroep.net/rcs/HhmNPvN1JAh2oyrnAY39Osq5dxU/diocontent/152197669/_fitwidth/1240?appId=93a17a8fd81db0de025c8abd1cca1279&quality=0.9",
                    "answers": [
                        '<a href="javascript:correct()" style="color:white;text-decoration:none;">De nachtwacht</a>',
                        '<a href="javascript:notCorrect()" class="answer" >De sterrennacht</a>',
                        '<a href="javascript:notCorrect()" class="answer" >Het vrolijke huisgezin</a>',
                    ]
                },
                {
                    "image": "https://cdn.britannica.com/78/43678-050-F4DC8D93/Starry-Night-canvas-Vincent-van-Gogh-New-1889.jpg",
                    "answers": [
                        '<a href="javascript:correct()" style="color:white;text-decoration:none">De sterrennacht</a>',
                        '<a href="javascript:notCorrect()" class="answer" >De nachtwacht</a>',
                        '<a href="javascript:notCorrect()" class="answer" >Het vrolijke huisgezin</a>',
                    ]
                },
                {
                    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Jan_Steen_Vrolijke_huisgezin.jpg/1200px-Jan_Steen_Vrolijke_huisgezin.jpg",
                    "answers": [
                        '<a href="javascript:correct()" style="color:white;text-decoration:none">Het vrolijke huisgezin</a>',
                        '<a href="javascript:notCorrect()" class="answer" >De sterrennacht</a>',
                        '<a href="javascript:notCorrect()" class="answer" >De nachtwacht</a>',
                    ]
                }
            ]

            //get a random question to ask to the users
            var ChosenQuestion = Question[Math.floor(Math.random() * Question.length)]
            //shuffle the ansers array
            var Answers = shuffle(ChosenQuestion.answers)
            //push the data to the html
            MainDiv.innerHTML = `
                    <div class="school">
                        <div class="TITLE">Toelating Studie</div>
                        
                        <div class="FORM">
                            <div class="LEEFTIJD">
                                <p class="TITLE">QUIZ</p>
                                <p style="margin-bottom:15px">Hoe heet dit schilderij?</p>
                                <img src="${ChosenQuestion.image}" style="width: 300px; margin-left:auto;margin-right:auto; border:2px solid white;">
                                <br><br>
                                ${Answers[0]}
                                <br><br>
                                ${Answers[1]}
                                <br><br>
                                ${Answers[2]}
                                </div>
                            </div>
                        </div>
                    </div>`
        }
    }
}

//redirect the user to the access page
function correct() {
    var MainDiv = document.getElementById('content')
    MainDiv.innerHTML = `
        <div class="school">
            <div class="CenterT GREEN">
            <p>WELKOM</p>
            <a href="/school"><button class="EndB">Terug</button></a>
            </div>
        </div>`
}

//redirect the user to the no-access page
function notCorrect() {
    var MainDiv = document.getElementById('content')
    MainDiv.innerHTML = `
        <div class="school">
            <div class="CenterT RED">
            <p>GEEN TOEGANG</p>
            <a href="/school"><button class="EndB">Terug</button></a>
            </div>
        </div>`
}