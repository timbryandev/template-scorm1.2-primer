function initialisePage() {
  // We want to ensure we're using SCORM 1.2
  // Define this before initialising SCORM object
  pipwerks.SCORM.version = "1.2";

  // Tell the LMS we're ready
  initializeScorm();

  // TEST CODE
  // When user clicks button:
  // * Set the (first) interaction as a correct answer
  // * Set the scorm score to 100%
  // * Set the scorm to COMEPLETE
  document.querySelector("button").addEventListener("click", function () {
    var questions = document.querySelectorAll(".question");

    questions.forEach(function (divQuestion, index) {
      var label = divQuestion.querySelector("label");

      var answer = divQuestion.querySelector(".answer");

      var response = label.innerHTML + "<hr />" + answer.value;

      sendResponse(
        index,
        "Question " + (index + 1),
        response,
        true,
        1,
        "correct"
      );
    });

    setCourseScore(1, 0, 1); // give them 100%
    setCourseCompleted();

    // TODO - some kind of testing to make sure it submitted successfully
    // do something to tell them it was saved
    // Tell them it's safe to close this window.
  });
}
