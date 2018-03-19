// Initialize Firebase
var config = {
    apiKey: "AIzaSyCyvqSCuRRwOFZwLB-Z3xGdAh4rCyC65c0",
    authDomain: "train-scheduler-a5cbc.firebaseapp.com",
    databaseURL: "https://train-scheduler-a5cbc.firebaseio.com",
    projectId: "train-scheduler-a5cbc",
    storageBucket: "train-scheduler-a5cbc.appspot.com",
    messagingSenderId: "473483014009"
};

firebase.initializeApp(config);

var database = firebase.database();

// Button for adding trains
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainTime = $("#train-time-input").val().trim();
    var trainFreq = $("#frequency-input").val().trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
        name: trainName,
        destination: trainDest,
        time: trainTime,
        freq: trainFreq
    };

    // Uploads train data to the database
    database.ref().push(newTrain);

    // Logs new train data to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.freq);

    // Alert
    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#train-time-input").val("");
    $("#frequency-input").val("");
});

// 3. Firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    // Store everything into variables.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFreq = childSnapshot.val().freq;

    // console log the train info
    console.log(trainName);
    console.log(trainDest);
    console.log(trainTime);
    console.log(trainFreq);

    // Get current time
    // ======== unnecessary =========
    //var currentTime = moment().format("HH:mm");

    // Roll train start time back 24 hours to ensure currentTime is ahead of trainTime
    var amendStart = moment(trainTime, "HH:mm").subtract(1, "days");

    // Find diff between amendStart and currentTime
    var totalMinutes = moment().diff(moment(amendStart), "minutes");

    // find the leftover minutes...
    var remainderTrainMin = totalMinutes % trainFreq;

    // ... and subtract them from the frequency, and the difference will be the number of minutes until the next train from the current time
    var minNextTrain = trainFreq - remainderTrainMin;

    // Add nextTrain minutes to current time
    var nextTrain = moment().add(minNextTrain, "minutes").format("hh:mm A");

    // // Is currentTime before the train's first departure?
    // var beforeFirstTrain = moment().format("HH:mm").isBefore(trainTime, 'minutes');
    // if ( beforeFirstTrain ) {
    //     var timeToTrain = moment().format("HH:mm").diff(trainTime, 'minutes');
    // }

    // Prettify the employee start
    // var empStartPretty = moment.unix(empStart).format("MM/DD/YY");

    // Calculate the months worked using hardcore math
    // To calculate the months worked
    // var nextTrain = moment().diff(moment.unix(empStart, "X"), "months");
    // console.log(empMonths);

    // Calculate the total billed rate
    // var empBilled = empMonths * empRate;
    // console.log(empBilled);

    // Add each train's data into the table
    $("#train-table > tbody").append(`<tr><td>${trainName}</td><td>${trainDest}</td><td>${trainFreq}</td><td>${nextTrain}</td><td>${minNextTrain}</td>`);
});