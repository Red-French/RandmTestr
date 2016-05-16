(function () {
'use strict';

  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var today = (month + '/' + day + '/' + year);

	var tst = CreateTest();
	tst = RandomizeTest(tst);

  var questions;  // for 'questions' array
  var choices;  // for 'choices' array
  var answers;  // for 'answers' array
  var questionsLength;
  var randomQuestionNum;
  var randomChoiceNum;
  var tempQuestion;  // for question swap/shuffle
  var tempChoice;  // for multiple choice swap/shuffle
  var tempAnswer;  // for answers swap


  //  test object
  function Test(arrayQuestions, arrayChoices, arrayAnswers){
    this.questions = arrayQuestions;
    this.choices = arrayChoices;
    this.answers = arrayAnswers;
  }


  // LOAD TEST ON ENTER KEY (KEYUP)
  var studentName = document.getElementById('studentName');
  studentName.addEventListener('keyup', function () {
    if (event.keyCode === 13) {
      var name = $('#studentName').val();  // grab student name from input field
      loadTest();
      writeName(name, today);  // function prints student name to DOM
    }
  });

  function writeName (name, today) {
    $('#student').html(name);  // print student name to DOM
    studentName.value = '';
    $('#date').html(today);
  }

  function checkTest () {
    console.log('checkTest');
  }

  // DIV TO HOLD QUESTIONS AND MULTIPLE CHOICE
  var test = document.getElementById('test');


  function RandomizeTest(tstObject){

  	questions = tstObject.questions;
  	questionsLength = questions.length;
  	choices = tstObject.choices;
  	answers = tstObject.answers;

  		for (var i = 0; i < questionsLength; i++) {
  			randomQuestionNum = Math.floor(Math.random() * (questions.length));  // random question number

  			// swap/shuffle questions for new question order
  			tempQuestion = questions[i];
  			questions[i] = questions[randomQuestionNum];
  			questions[randomQuestionNum] = tempQuestion;

  			// swap choices to match new question order
  			tempChoice = choices[i];
  			choices[i] = choices[randomQuestionNum];
  			choices[randomQuestionNum] = tempChoice;

  			// swap answers to match new question order
  			tempAnswer = answers[i];
  			answers[i] = answers[randomQuestionNum];
  			answers[randomQuestionNum] = tempAnswer;


  		  for (var j = 0; j < choices[i].length; j++) {
  				randomChoiceNum = Math.floor(Math.random() * (choices[i].length) + 0);  // random choice number

  				// swap/shuffle choices for new choice order
  				tempChoice = choices[i][j];
  				choices[i][j] = choices[i][randomChoiceNum];
  				choices[i][randomChoiceNum] = tempChoice;

  				// swap answers to match new choice order
  				tempAnswer = answers[i][j];
  				answers[i][j] = answers[i][randomChoiceNum];
  				answers[i][randomChoiceNum] = tempAnswer;
  		  }
  		}
  	return tstObject;

  }  // end RandomizeTest()


  function loadTest() {
    document.write("<div id='student'></div>");  // student name
    document.write("<button id='button'>Submit Test</button>");
    document.write("<div id='date'></div>");  // date

    for (var i=0; i < tst.questions.length; i++) {
  		document.write('<p>' + (i+1) + '.&nbsp;' + tst.questions[i]);

  		for (var j=0; j < tst.choices[i].length; j++) {
  				document.write('<br><input type=checkbox name=check'+i+' value='+j+" onclick='return true;'>");
  				document.write('<span>'+tst.choices[i][j]+'</span>');
  		}
  		document.write('<br>');
  	}
  }


  function CreateTest (){
  	var questions = [
  		'The favorite pastime at NSS involves what?',
  		'What are the minimum number of hours learning per week while at NSS?',
  		'How many developers have gone through NSS?',
  		'What has NSS not taught so far?',
  		'Steve loves to wear what?'
  	];

  	var choices = [
  		[
  			'Pulling John\'s ponytail then pointing at Steve',
  			'Ping Pong Table',
  			'Looking for aspirin for your spinning head',
  			'Dart Board',
  			'Pool Table'
  		],
  		[
  			'1',
  			'2',
  			'30',
  			'Any hour your eyes are open'
  		],
  		[
  			'Tens',
  			'Hundreds',
  			'Thousands',
  			'Millions',
  			'Billions'
  		],
  		[
  			'MEAN stack',
  			'Ruby',
  			'AngularJS',
        'INTERCAL'
  		],
  		[
  			'Capri pants',
  			'Goth attire',
  			'T-shirt and shorts',
  			'Cowboy boots'
  		]
  	];

  	var answers = [
  		[0,1,0,0,0],
  		[0,0,0,1],
  		[0,1,0,0,0],
  		[0,0,0,1],
  		[0,0,1,0]
  	];

  	return new Test(questions, choices, answers);
  }
})();
