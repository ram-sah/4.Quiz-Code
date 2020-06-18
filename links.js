//declared variables
var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");

//Event listener to clear scores
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
    
});

//Retrives local storage
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {
    for (var i = 0; i < allScores.length; i++) {
        var creatEl = document.createElement("li");
        creatEl.textContent = allScores[i].initials + " " + allScores[i].score;
        highScore.appendChild(creatEl);
    }
}
//Event listener to move to the index.html page
goBack.addEventListener("click", function () {
    window.location.replace("./index.html");
});

