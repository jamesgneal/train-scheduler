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
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainTime = moment($("#train-time-input").val().trim(), "HH:mm").format("X");
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