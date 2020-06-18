//declared variables
var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");

//Event listener to clear scores
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
    console.log(clear);
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

//var with array and object for questions
var questions = [
    {
        title: "Q-1: Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "Q-2: What is the correct way to call method on the math global object?",
        choices: ["random.math()", "Random.math()", "Random.Math()", "Math.random()"],
        answer: "Math.random()"
    },
    {
        title: "Q-3: What functionn is used to print in to the console?",
        choices: ["console.log()", "console", "function()", "console.Log"],
        answer: "console.log()"
    },
    {
        title: "Q-4: The condition in an if/else ststement is enclosed within -----.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Q-5: String values must be enclosed within _____ when being assigned to variables",
        choices: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes"
    },
];

//Decleared variables
var score = 0;
var questionIndex = 0;

// Decleared variables from index.html page Start working code 
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");

//Seconds left is 20 seconds per question
var secondsLeft = 51;
//holds interval time
var holdInterval = 0;
// holds penalty time
var penalty = 10;
//creates new element
var ulCreate = document.createElement("ul");

//triggers timer on the button to shows a display on the screen
timer.addEventListener("click", function () {
    //Since timer originally set to zero, we check zero
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Remaining Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time is over!";
            }
        }, 1000);
    }
    render(questionIndex);
});

//Render questions and choices to page
function render(questionIndex) {
    //clear existing data
    questionsDiv.innerHTML = " ";
    ulCreate.innerHTML = "";
    // for loops to loop through all information of array
    for (var i = 0; i < questions.length; i++) {
        //appends question title only
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    //change new list for each of question choices
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    });
}
//Event to compare choices with answer 
function compare(event) {
    var element = event.target;
    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        //Correct condition 
        if (element.textContent === questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is: " + questions[questionIndex].answer;
        } else {
            //will deduct -10 seconds off from secondsLeft for wrong answers
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is: " + questions[questionIndex].answer;
        }
    }
    //question index determines number question user on
    questionIndex++;
    if (questionIndex >= questions.length) {
        // All done will append last page with user starts
        allDone();
        createDiv.textContent = "End of Quiz!" + " " + "You got: " + score + "/" + questions.length + " -Correct Answers";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);
}
// All done will append last page 
function allDone() {
    questionsDiv.innerHTML = " ";
    currentTime.innerHTML = " ";

    // Heading 
    var createH1 = document.createElement("H1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!";

    questionsDiv.appendChild(createH1);

    //Paragraph 
    // var createP = document.createElement("p");
    // createP.setAttribute("id", "createP");

    // questionsDiv.appendChild(createP);

    //Calculate time remaining to replaces it with score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP2.textContent = "Your Final Score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }

    //Label 
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);

    // Input 
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = " ";

    questionsDiv.appendChild(createInput);

    //submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "submit");
    createSubmit.textContent = "submit";

    questionsDiv.appendChild(createSubmit);

    //Event listener to capture initials and local storage for initials and scores
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {
            console.log("No Initials")
            alert("No Initials Entered");
        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];

            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);

            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);

            //Final stage
            window.location.replace("./scores.html");

        }
    });
}