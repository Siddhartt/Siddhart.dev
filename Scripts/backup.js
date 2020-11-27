var FA = 0;

var content = document.getElementById("content").innerHtML
document.addEventListener('DOMContentLoaded', () => {

  document.getElementById("content").innerHtML = `  <h1>Captcha</h1>
  <p class="Problem" id="Problem">X +- Y = </p>
  <input id="Input" class="Input"></input>
  <a class="Submit" id="Submit" onClick="Answer()">Submit</a>`
  
  
  var between = 5
  var X = Math.floor(Math.random() * between)
  
  var Y = Math.floor(Math.random() * between)
  
  FA = (X + Y)
  document.getElementById("Problem").innerHTML = `${X} + ${Y}`
  
  
})

document.getElementById("Submit").addEventListener('click', () => {
  
  var ans = document.getElementById("Input").value
  
  console.log(ans + " " + FA)
  if(ans == FA){
    document.getElementById("content").innerHtML = "<h1>BRUH</h1>"
  }
})
