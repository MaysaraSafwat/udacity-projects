//api variables
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const ApiKey = ',&appid=85a2499e4d952e39390073d380223dfa';
const serverURL = "http://localhost:8080";

//ui variables 
const zipCodeEl = document.getElementById("zip");
const contentEl = document.getElementById("content");
const tempEl = document.getElementById("temp");
const date = document.getElementById("date");
const cityEl=document.getElementById("city");
const generateBtn = document.getElementById("generate");
const feeling = document.getElementById("feelings");
const entryEl = document.querySelector(".entry");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//getting the weather data obj
const getData = async (zipCode)=>{
    try{
       const res = await fetch(`${baseURL}${zipCode}${ApiKey}&units=metric`);
       const data = await res.json()
       console.log(data);
       return data
    }catch(error){
        console.log(`error : ${error}`)
    }
}

//Saving weather data 
const postData = async (url="", myData={})=>{
    const res = await fetch(url , {
        method: 'POST',
        headers :{
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(myData)
    })

    try {
        const myPostedData = await res.json();
        console.log(myPostedData);
        return myPostedData;
    }catch(error){
        console.log(`error : ${error}`)
    }
}

generateBtn.addEventListener("click" , ()=>{
    const zipCode = zipCodeEl.value ;
    const feelings = feeling.value;

    getData(zipCode).then(data=>{
        const myData = {
            newDate,
            feelings,
            city : data.name,
            temp: data.main.temp,
            description : data.weather
        }
    
        postData(serverURL+"/add", myData);

        DisplayingWeatherDetails();
    })


});

//Updating UI
const DisplayingWeatherDetails = async ()=>{
    const res = await fetch(serverURL + "/all");
    try{
        const myDetails = await res.json()

        date.innerHTML =  `Date : ${myDetails.newDate}`;
        contentEl.innerHTML = `Feeling : ${myDetails.feelings}`;
        tempEl.innerHTML = `Temprature : ${myDetails.temp} &degC`;
        cityEl.innerHTML=`City : ${myDetails.city}`;

        entryEl.classList.add("display");


    }catch(error){
        console.log(error)
    }
}