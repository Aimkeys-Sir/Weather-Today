const coverage = {
    "clear":"./images/clouds/sunny.png","few clouds": "./images/clouds/partly.png",
     "scattered clouds": './images/clouds/partly.png',
    "broken clouds": "./images/clouds/partly.png", 
    "overcast": "./images/clouds/overcast.png", 
    "sky obscured": "./images/clouds/foggy.png"
}

const bell = document.getElementById("bell")
let isBellOn = false
bell.addEventListener("click", () => {
    bell.src = "./images/bell-on.png"
    if (isBellOn) {
        bell.src = "./images/bell.png"
        isBellOn = false
    }
    else {

        isBellOn = true
    }
})
console.log("yeah")

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            getWeather(position.coords.latitude, position.coords.longitude)
        })
    }
}
function getWeather(lat, long) {
    const url = `https://weather-proxy.freecodecamp.rocks/api/current?lat=${lat}&lon=${long}`
    fetch(url)
        .then(response => response.json())
        .then(res => {
            populateDom(res)
            console.log(res)
        })
}
function populateDom(resObj) {
    const city=document.getElementById("city")
    city.innerText=resObj.name +", " + resObj.sys.country

    const windDesc = document.getElementById("wind-desc")
    windDesc.innerText = resObj.wind.speed +"km/h"
    const windDir = document.getElementById("wind-dir")
    windDir.innerText = resObj.wind.deg + "\u00B0"

    
    const rainIcon = document.getElementById("rain-icon")
    let key=Object.keys(coverage).find(cloud=>cloud.toUpperCase()==resObj.weather[0].description.toUpperCase())
    rainIcon.src = coverage[key]
    console.log(coverage[key])
    const cloudDesc = document.getElementById("cloud-desc")
    cloudDesc.innerText = resObj.weather[0].description

    const pressure = document.getElementById("pressure")
    pressure.innerText = resObj.main.pressure +"hPa"

    const humidity = document.getElementById("humidity")
    humidity.innerText = resObj.main.humidity + "%"

}
getLocation()