//===================================================================================
////////////////////////////////// GLOBAL VARIABLES /////////////////////////////////
//===================================================================================

	var startScreen;
	var gameHTML;
	var counter = 20;

	var questionArray = ["1. Which Super Hero Team Does Johnny Storm Belong To?", "2. Peter Parker works as a photographer for?", "3. Thor has two war goats to pull his chariot. They are named:?", "4. S.H.I.E.L.D.'s highest ranking agent is:?", "5. Captain America was frozen in which war?", "6. The vampire hunter Blade is a:", "7. What is commonly believed to be The Black Widow's previous occupation before becoming a Russian spy?", "8. Deadpool joined the Weapon X program because?"];

	var answerArray = [["Ultimate Avengers", "The Justice League", "The X-Men", "The Fantastic 4"], ["The Daily Planet","The Daily Bugle","The New York Times","The Rolling Stone"], ["Balder and Hermod", "Thunder and Lightning", "Ask and Embla", "Toothgrinder and Toothgnasher"], ["Nick Fury","Steven Rogers","Peter Parker","Natalia Romanova"], ["World War I", "World War II", "Cold War", "American Civil War"], ["Mutant","Human","Vampire","Half vampire"], ["A ballerina", "A military pilot", "A thief", "An athlete"], ["He had incurable cancer","He was forced to","He thought it would be fun","He wanted to fight for justice"]];

	var imageArray =["<img class='center-block img-right' src='assets/images/storm1.gif'>", "<img class='center-block img-right' src='assets/images/sm1.gif'>", "<img class='center-block img-right' src='assets/images/thor1.gif'>", "<img class='center-block img-right' src='assets/images/nick1.gif'>", "<img class='center-block img-right' src='assets/images/ca1.gif'>", "<img class='center-block img-right' src='assets/images/blade1.gif'>", "<img class='center-block img-right' src='assets/images/bw1.gif'>", "<img class='center-block img-right' src='assets/images/dpool1.gif'>"];

	var correctAnswers = ["D. The Fantastic 4", "B. The Daily Bugle", "D. Toothgrinder and Toothgnasher", "A. Nick Fury", "B. World War II", "D. Half vampire", "A. A ballerina", "A. He had incurable cancer"];

	var questionCounter = 0;
	var selecterAnswer;
	var theClock;
	var correctTally = 0;
	var incorrectTally = 0;
	var unansweredTally = 0;

//===================================================================================
///////////////////////////////// GLOBAL FUNCTIONS //////////////////////////////////
//===================================================================================

// Create response if time runs out before answer is selected. Increment unsanswered and update html.

	function generateLossDueToTimeOut() 
		{
		unansweredTally++;
		
		gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p id=question class='text-center'> How much time do you need?!?  The answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/timeout1.gif'>";
		
		$("#rightContent").html(gameHTML);
		
		setTimeout(wait, 1000 * 4 );
		}
		
//----   ----    ----    ----    ----    ----    ----    ----    ----    ----    ----
// Create response if the right answer is selected. Increment correct and update html.

	function generateWin() 
		{
		correctTally++;
		
		gameHTML = "<p id=question class='text-center'> Nice!!! The answer was: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
		$("#rightContent").html(gameHTML);
		
		setTimeout(wait, 1000 * 4 );  	
		}

//----   ----    ----    ----    ----    ----    ----    ----    ----    ----    ----
// Create response if the wrong answer is selected. Increment Incorrect and update html.

	function generateLoss() 
		{
		incorrectTally++;
		
		gameHTML = "<p id=question class='text-center'> Terrible! The correct answer was: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/wrong1.gif'>";
		
		$("#rightContent").html(gameHTML);
		
		setTimeout(wait, 1000 * 4); 
		}

//----   ----    ----    ----    ----    ----    ----    ----    ----    ----    ----
// Create response if the wrong answer is selected. Increment Incorrect and update html.

	function generateHTML() 
		{
		gameHTML = "<p class='text-center timer-p'> Time Remaining: <span class='timer'> 20 </span></p>  <p id=question class='text-center'>" + questionArray[questionCounter] + "</p>  <p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. " + answerArray[questionCounter][1] + "</p><p class='answer'>C. " + answerArray[questionCounter][2] + "</p><p class='answer'>D. "+answerArray[questionCounter][3] + "</p>";
		
		$("#rightContent").html(gameHTML);
		}

//----   ----    ----    ----    ----    ----    ----    ----    ----    ----    ----
// If there are questions remaining:

	function wait() 
		{
		if (questionCounter < 7)	// increase question counter and move on to next question, 
			{
			questionCounter++;
			generateHTML();
			counter = 20;
			timerWrapper();
			}
		else 	// if not, show summary screen.
			{
			finalScreen();
			}
		}

//----   ----    ----    ----    ----    ----    ----    ----    ----    ----    ----
// Create timer for each question

function timerWrapper() 
	{
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() 
		{
		if (counter === 0)		// If out of time, reset clock and trigger loss due to timout
			{
			clearInterval(theClock); 
			generateLossDueToTimeOut();
			}
		else if (counter > 0) 		// If there is time remaining, decrease timer by one every second. 
			{
			counter--;
			}
		$(".timer").html(counter);		// display current time
		}
	}

//----   ----    ----    ----    ----    ----    ----    ----    ----    ----    ----
//Create final summary page to display Correct, Incorrect, and Unanswered

function finalScreen() 
	{
		
	gameHTML = "<p id=summary class='text-center'> Meh... Its over, here are your results!" + "</p>" + "<p class='summary-correct'> Correct Answers: " + correctTally + "</p>" + "<p class='summary-wrong'> Wrong Answers: " + incorrectTally + "</p>" + "<p class='summary-unanswered'> Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'> Try Again </a></p>";
	
	$("#rightContent").html(gameHTML);
	
	if(correctTally > 5)
		{
		$("#summary").css("background-color", "rgba(70, 193, 52, 0.50)");
		$("#summary").html("Nice Job!!! You're definitely a nerd!!!");
		$("#instructions").html("<img class='center-block img-wrong' src='assets/images/hooray1.gif'>");
		}
	}

//----   ----    ----    ----    ----    ----    ----    ----    ----    ----    ----
//Function to reset game

function resetGame() 
	{
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 20;
	generateHTML();
	timerWrapper();
	$("#instructions").empty();
	}
	
//Function to remove game description after game start	
function moveTitle()
	{
	$("#instructions").empty();
	$("#content").css("margin-top", "75px");
	}

//===================================================================================
////////////////////////////////////  ON CLICKS  ////////////////////////////////////
//===================================================================================

$(document).ready(function() 
	{
	
//----   ----    ----    ----    ----    ----    ----    ----    ----    ----    ----	
// Trigger the creation of the start button

	function initialScreen() 
		{
		startScreen = "<p class='text-center main-button-container'><a id=start class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start</a></p>";
		
		$("#rightContent").html(startScreen);
		}

	initialScreen();

//----   ----    ----    ----    ----    ----    ----    ----    ----    ----    ----
//When clicking on the start button, add questions to page with a timer.

	$("body").on("click", ".start-button", function(event)
		{
		setTimeout(function() //added click delay to smooth out transitions
			{
			moveTitle();
			$("#instructions").empty();
			generateHTML();
			timerWrapper();
			
			restartButton = "<p class='text-center main-button-container'><a id=restart class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'> RESTART </a></p>";
		
		$("#instructions").html(restartButton);
			
			}, 1000 * 0.2); //Click delay seconds
			
		}); 

//----   ----    ----    ----    ----    ----    ----    ----    ----    ----    ----
//When clicking on an answer option, add questions to page with a timer.

	$("body").on("click", ".answer", function(event)
		{
		
			//Set the selected text as the selected answer
			selectedAnswer = $(this).text();
			
			//if the selected answer is correct:
			if(selectedAnswer === correctAnswers[questionCounter]) 
				{
				setTimeout(function() //added click delay to smooth out transitions
					{
				//reset clock and add a win
					clearInterval(theClock);
					generateWin();
					
					}, 1000 * 0.2); //Click delay seconds
				}
			
			else 
				{
				setTimeout(function() //added click delay to smooth out transitions
					{
					//reset clock and add a loss
					clearInterval(theClock);
					generateLoss();
					
					}, 1000 * 0.2); //Click delay seconds
				}
		
		});
		
//----   ----    ----    ----    ----    ----    ----    ----    ----    ----    ----
//Create game reset button

	$("body").on("click", ".reset-button", function(event)
		{
		setTimeout(function() //added click delay to smooth out transitions	
			
			{
			resetGame();
			}, 1000 * 0.2);	//Click delay seconds

		});
		
//===================================================================================
/////////////////////////////////////////////////////////////////////////////////////
//===================================================================================
	});





