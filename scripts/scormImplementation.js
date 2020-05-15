// scorm alias
var scorm = pipwerks.SCORM;
var lmsConnected = false;

function initialiseLMS() {
  lmsConnected = scorm.init();

  //Check for connection to the LMS
  if (lmsConnected) {
    console.log("--Connected to LMS");
  } else {
    console.log("--Not connected to LMS");
  }
  return lmsConnected;
}

function initializeScorm() {
  var result = initialiseLMS();
  logLmsMsg("Initialize Results: " + result);
  setCourseStarted();
  return result;
}

function unloadPage() {
  //alert("GOING DOWN");
}

function getUserName() {
  var result = scorm.get("cmi.core.student_name");
  if (result) {
    logLmsMsg("Retrieving Student Name:\\n\nValue: " + result);
    return result;
  } else return "";
}

function getBookmark() {
  var result = scorm.get("cmi.suspend_data");
  logLmsMsg("Retrieving Bookmark:\\n\nValue: " + result);
  return result;
}

function setBookmark(data) {
  scorm.set("cmi.suspend_data", data);
  scorm.save();
  logLmsMsg("Set Bookmark:\n\nValue: " + data);
}
/**
 * @desc Save SCORM data for an interaction
 * @param {number} i Unique label for the interaction
 * @param {string} qId  Label for objectives associated with the interaction
 * @param {string} answer (format depends on interaction type, WO) Data generated when a student responds to an interaction
 * @param {bool} correctAnswer (format depends on interaction type, WO) One correct response pattern for the interaction
 * @param {number} score Weight given to the interaction relative to other interactions
 * @param {number} result (“correct”, “wrong”, “unanticipated”, “neutral”, “x.x [CMIDecimal]”, WO) Judgment of the correctness of the learner response
 * @tutorial https://scorm.com/scorm-explained/technical-scorm/run-time/run-time-reference/#section-2
 */
//Add and remove cmi interactions as see fit, this all shows up in the Attempt window.
function sendResponse(i, qId, answer, correctAnswer, score, result) {
  scorm.set("cmi.interactions." + i + ".id", qId);
  scorm.set("cmi.interactions." + i + ".type", "fill-in");
  scorm.set("cmi.interactions." + i + ".student_response", answer);
  //   scorm.set(
  //     "cmi.interactions." + i + ".correct_responses.0.pattern",
  //     correctAnswer
  //   );
  scorm.set("cmi.interactions." + i + ".result", result);
  scorm.set("cmi.interactions." + i + ".weighting", score);
  scorm.save();
  logLmsMsg("Set Question Response.\n\n" + qId + "\n\nAnswer:" + answer);
}

/**
 * @desc Set the overall score for the whole package
 * @param {number} raw (CMIDecimal, RW) Number that reflects the performance of the learner relative to the range bounded by the values of min and max
 * @param {number} min (CMIDecimal, RW) Maximum value in the range for the raw score
 * @param {number} max (CMIDecimal, RW) Minimum value in the range for the raw score
 */
function setCourseScore(raw, min, max) {
  scorm.set("cmi.core.score.raw", raw);
  scorm.set("cmi.core.score.min", min);
  scorm.set("cmi.core.score.max", max);
}

function setCourseStarted() {
  scorm.set("cmi.core.lesson_status", "incomplete");
  scorm.save();
  logLmsMsg("Set Course Incompleted");
}

function setCourseCompleted() {
  scorm.set("cmi.core.lesson_status", "completed");
  scorm.save();
  logLmsMsg("Set Course Completed.");
}

function logLmsMsg(msg) {
  try {
    console.log(msg);
  } catch (e) {
    alert(msg);
  }
}
