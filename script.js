// Showing Date and time on screen
var today = moment().format("LLLL");
var currentTime = moment().format("H A");

$("#currentDay").text(today);

// input array for taking entries 
var Schedule = [
    { time: "9 AM", 
        event: "" },
    { time: "10 AM", 
        event: "" },
    { time: "11 AM", 
        event: "" },
    { time: "12 PM", 
        event: "" },
    { time: "1 PM", 
        event: "" },
    { time: "2 PM", 
        event: "" },
    { time: "3 PM", 
        event: "" },
    { time: "4 PM", 
        event: "" },
    { time: "5 PM", 
        event: "" },
  ];

// Checking Local Storage 
var scheduleEvents = JSON.parse(localStorage.getItem("daySchedule"));
if (scheduleEvents) {
  Schedule = scheduleEvents;
}
$("#currentDay").text(today);

// Creating rows
Schedule.forEach(function(timeBlock, index) {
	var timeLabel = timeBlock.time;
	var rowColor = changeRowColor(timeLabel);
	var row =
		'<div class="time-block" id="' +
		index +
		'"><div class="row  input-group"><div class="col-sm col-lg-1 input-group-prepend hour justify-content-sm-end pr-3 pt-3">' +
		timeLabel +
		'</div><textarea class="form-control ' +
		rowColor +
		'">' +
		timeBlock.event +
		'</textarea><div class="col-sm col-lg-1 input-group-append"><button class="saveBtn btn-block" type="submit"><i class="fas fa-save"></i></button></div></div></div>';

	$(".container").append(row);
});

// Changing the color of rows 
function changeRowColor(time) {
	var timeNow = moment(currentTime, "H A");
	var planEvent = moment(time, "H A");
	if (timeNow.isBefore(planEvent) === true) {
		return "future";
	} else if (timeNow.isAfter(planEvent) === true) {
		return "past";
	} else {
		return "present";
	}
}

// While saving the events 
$(".saveBtn").on("click", function() {
	var blockID = parseInt(
		$(this)
			.closest(".time-block")
			.attr("id")
	);
	var enterEvent = $.trim(
		$(this)
			.parent()
			.siblings("textarea")
			.val()
	);
	Schedule[blockID].event = enterEvent;

	// Saving events in local storage 
	localStorage.setItem("daySchedule", JSON.stringify(Schedule));
});
