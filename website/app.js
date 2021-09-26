/*
    Author: Abdelrahman Hany
    Created on: 22-Sep-21
*/

// definitions
const zipInput = document.getElementById("zip");
const feelInput = document.getElementById("feelings");
const generationButton = document.getElementById("generate");
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "";



/*
    How it works:
        1- take user's input
        2- get the data from weather api
        3- send it to server
        4- get data from server
        5- show it to the user
*/


// display data on page
const viewData = (clear) => {
    let temp = document.getElementById("temp"); 
    let date = document.getElementById("date");
    let feeling = document.getElementById("content");
    if(clear == 1) {
        fetch("/weatherdata", {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept' : '*/*'
            },
          }    
        ).then((res) => {
            return res.json();
        }).then((data) => {
            temp.innerHTML = "The temperature in your city is " + data.temperature + " °C";
            date.innerHTML = "The date you requested the information is " + data.date;
            feeling.innerHTML = "Your feeling is : " + data.userResponse;
        }) 
        .catch ((err) => {
            console.log(e)
        });
    } else {
        let prevErr = document.getElementsByClassName("err")[0];
        if(prevErr){
            prevErr.remove();
        }
        let errorElement = document.createElement("span");
        errorElement.classList.add("err");
        let errMsg = document.createTextNode("Invalid ZIP code");
        errorElement.appendChild(errMsg); 
        zipInput.parentElement.insertBefore(errorElement, zipInput);
        temp.innerHTML = "Not Found!"; 
        date.innerHTML = ""; 
        feeling.innerHTML = "";
    }
}


// send data to our server
const sendDataToServer = async (feel, temp) => {
    // date format used dd-mm-yyyy
    let currentDate = new Date();
    let reqDate = currentDate.getDate() + '-' + (currentDate.getMonth()+1) + '-' + currentDate.getFullYear();

    const dataToBeSent = {
        temperature: temp,
        date: reqDate,
        userResponse: feel
    }; 

    let responseForPost = await fetch("/weatherdata", {
        method: 'POST', 
        mode: 'cors', 
        headers: {
            'Content-Type': 'application/json',
            'Accept' : '*/*'
        },
        body: JSON.stringify(dataToBeSent)
        }    
    );
}


// get data from weather api
const getDataFromAPI = async () => {
    let prevErr = document.getElementsByClassName("err")[0];
    if(prevErr){
        prevErr.remove();
    }
    const zip = zipInput.value;
    let link = apiUrl+zip+`&appid=${apiKey}&units=metric`;
    await fetch(link)
    .then((res) => {
        if (!res.ok) {
            throw new Error("Not Found!")
        } else {
            return res.json(); 
        }
    })
    .then((data) => {
        sendDataToServer(feelInput.value, data.main.temp);
        viewData(1);
        })
    .catch((err) => {
        viewData(0);
    });
}

// setting event listener
generationButton.addEventListener("click", getDataFromAPI); 