// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCifscOKOnmyoesVGO0RJnc9lZWcHTCE4s",
    authDomain: "project-green-998dd.firebaseapp.com",
    databaseURL: "https://project-green-998dd.firebaseio.com",
    projectId: "project-green-998dd",
    storageBucket: "project-green-998dd.appspot.com",
    messagingSenderId: "425870274974",
    appId: "1:425870274974:web:c51d9b5889642299a4268f",
    measurementId: "G-4JLLPXD8YY",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let database = firebase.database();

//toggle btn part(automatic or manual mode button event controler)
console.log("hlo frm green");

flag = false;
flag2 = false;
automaticFlag = false;
document.querySelector("#btn1").addEventListener("click", function() {
    if (flag) {
        document.querySelector("#btnText").textContent = "manual mode";
        document.querySelector(".helth-meter h2").style.display = "none";
        let heltFlag = document.querySelector("#helthMeter").textContent;
        if (heltFlag == "Good") {
            document.querySelector(".helth-meter h1").style.marginTop = "95px";
            document.querySelector(".helth-meter h1").style.fontSize = "40px";
            document.querySelector(".helth-meter h1").style.marginLeft = "62px";
        } else {
            document.querySelector(".helth-meter h1").style.marginTop = "105px";
            document.querySelector(".helth-meter h1").style.fontSize = "30px";
            document.querySelector(".helth-meter h1").style.marginLeft = "62px";
        }

        flag = false;
        automaticFlag = false;
        automaticMode();
    } else {
        document.querySelector("#btnText").textContent = "automatic mode";
        let heltFlag2 = document.querySelector("#helthMeter").textContent;
        if (heltFlag2 == "Good") {
            document.querySelector(".helth-meter h1").style.marginTop = "150px";
            document.querySelector(".helth-meter h1").style.fontSize = "30px";
            document.querySelector(".helth-meter h1").style.marginLeft = "77px";
        } else {
            document.querySelector(".helth-meter h1").style.marginTop = "150px";
            document.querySelector(".helth-meter h1").style.fontSize = "25px";
            document.querySelector(".helth-meter h1").style.marginLeft = "66px";
        }

        document.querySelector(".helth-meter h2").style.display = "block";
        document.querySelector(".helth-meter h2").style.marginTop = "-120px";
        document.querySelector("#helthBox").addEventListener("click", function() {
            if (flag2) {
                document.querySelector("#togleText").textContent = "OFF";
                //write off value to the databse
                firebase.database().ref("motorTogle").set({
                    togleValue: 0,
                });
                flag2 = false;
            } else {
                document.querySelector("#togleText").textContent = "ON";
                document.querySelector(".helth-meter h2").style.marginLeft = "74px";
                //write on value to databse
                firebase.database().ref("motorTogle").set({
                    togleValue: 1,
                });
                flag2 = true;
            }
        });
        flag = true;
        automaticFlag = true;
        firebase.database().ref("motorTogle").set({
            togleValue: 0,
        });
    }
});

//reading temperature data from firebase data base
let tempData = 0;
firebase
    .database()
    .ref("tempMeter")
    .on("value", function(snapshot) {
        tempData = snapshot.val().tempValue;
        lifeMeter();
        tempMeter();
        automaticMode();
    });

//value updating function for temperature value
const tempMeter = () => {
    document.getElementById("tempMeter").textContent = tempData;
};

//reading humidity data from firebase databse
let humidityData = 0;
firebase
    .database()
    .ref("humidityMeter")
    .on("value", function(snapshot) {
        humidityData = snapshot.val().humidityValue;
        humidityMeter();
        automaticMode();
    });

//value updating function for humidity
const humidityMeter = () => {
    document.getElementById("humidityMeter").textContent = humidityData;
};

//reading mosisture data from firebase databse
let moistureData = 0;
firebase
    .database()
    .ref("moistureMeter")
    .on("value", function(snapshot) {
        moistureData = snapshot.val().moistureValue;
        moistureMeter();
        automaticMode();
    });

//value updating functio  for moisture content
const moistureMeter = () => {
    document.getElementById("moistureMeer").textContent = moistureData;
};

//function call for all updating functions
tempMeter();
humidityMeter();
moistureMeter();

//life-meter function for predicting the condition of plant

const lifeMeter = () => {
    if (tempData > 18 && tempData < 24) {
        document.getElementById("helthMeter").textContent = "Good";
        if (flag) {
            document.querySelector(".helth-meter h1").style.marginTop = "150px";
            document.querySelector(".helth-meter h1").style.fontSize = "30px";
            document.querySelector(".helth-meter h1").style.marginLeft = "77px";
        } else {
            document.querySelector(".helth-meter h1").style.marginTop = "95px";
            document.querySelector(".helth-meter h1").style.fontSize = "40px";
            document.querySelector(".helth-meter h1").style.marginLeft = "62px";
        }
    } else {
        document.getElementById("helthMeter").textContent = "Not good";
        if (flag) {
            document.querySelector(".helth-meter h1").style.marginTop = "150px";
            document.querySelector(".helth-meter h1").style.fontSize = "25px";
            document.querySelector(".helth-meter h1").style.marginLeft = "66px";
        } else {
            document.querySelector(".helth-meter h1").style.fontSize = "30px";
            document.querySelector(".helth-meter h1").style.marginTop = "105px";
            document.querySelector(".helth-meter h1").style.marginLeft = "60px";
        }
    }
};
lifeMeter();

//automatic function controller
const automaticMode = () => {
    if (automaticFlag) {
        console.log("manual-mode is on")
    } else {

        if (tempData > 24 || humidityData < 50 || moistureData < 50) {
            firebase.database().ref("motorTogle").set({
                togleValue: 1,
            });
        } else if (tempData < 18 || humidityData > 70 || moistureData > 70) {
            firebase.database().ref("motorTogle").set({
                togleValue: 0,
            });
        }
        console.log("automatic-mode is on")
    }


}