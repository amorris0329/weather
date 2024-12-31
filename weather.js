let cards = document.querySelectorAll(".card");


window.addEventListener("load", async function() {
    cards[0].style.display = "none";
    cards[1].style.display = "none";
    cards[2].style.display = "none";
    cards[3].style.display = "none";

    let title1 = cards[1].querySelector(".card-title");
    let title2 = cards[2].querySelector(".card-title");
    let title3 = cards[3].querySelector(".card-title");

    title2.textContent = "Seattle";
    title1.textContent = "Charlotte";
    title3.textContent = "Nashville";

    await Promise.all([getCardInfo()]);

    cards[0].style.display = "block";
    cards[1].style.display = "block";
    cards[2].style.display = "block";
    cards[3].style.display = "block";


    for (let i = 0; i < cards.length; i++) {

        cards[i].addEventListener("click", function() {
            
            getModalInfo(i);
            
        });
        
    }
});


async function getModalInfo(i) {
    console.log(i);
    let forecast = document.getElementById("modal-title");

    let days = document.querySelectorAll(".list-group-item");

    let weekResponse;

    if(i == 0) { //Lakeland
        forecast.textContent = "Forecast for Lakeland";
        weekResponse = await fetch("https://api.open-meteo.com/v1/forecast?latitude=28.0395&longitude=81.9498&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max&temperature_unit=fahrenheit&wind_speed_unit=mph&models=gfs_seamless");
    }
    else if (i == 1) { //Charlotte
        forecast.textContent = "Forecast for Charlotte";
        weekResponse = await fetch("https://api.open-meteo.com/v1/forecast?latitude=35.2271&longitude=80.8431&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max&temperature_unit=fahrenheit&wind_speed_unit=mph&models=gfs_seamless");
    }
    else if (i == 2) { //Seattle
        forecast.textContent = "Forecast for Seattle";
        weekResponse = await fetch("https://api.open-meteo.com/v1/forecast?latitude=47.6061&longitude=122.3328&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max&temperature_unit=fahrenheit&wind_speed_unit=mph&models=gfs_seamless");
    }
    else { //Nashville
        forecast.textContent = "Forecast for Nashville";
        weekResponse = await fetch("https://api.open-meteo.com/v1/forecast?latitude=36.1627&longitude=86.7816&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max&temperature_unit=fahrenheit&wind_speed_unit=mph&models=gfs_seamless");
    }

    let weekData = await weekResponse.json();

        for(let j = 0; j < days.length; j++) {
            let weatherDESC = "";

            let iconclass = '';

            let code = weekData.daily.weather_code[j];
            if (code == 0 || code == 1) {
                iconclass = "bi-sun";
                weatherDESC = "Clear";
            }
            else if (code == 2) {
                iconclass = "bi-cloud-sun";
                weatherDESC = "Partly Cloudy";
            }
            else if(code == 3) {
                iconclass = "bi-cloud";
                weatherDESC = "Cloudy";
            }
            else if (code == 45 || code <= 48) {
                iconclass = "bi-cloud-fog";
                weatherDESC = "Fog";
            }
            else if (code == 51 || code == 53 || code == 55) {
                iconclass ="bi-cloud-drizzle";
                weatherDESC = "Light Rain";
            }
            else if (code == 61 || code == 63 || code == 80 || code == 81) {
                iconclass = "bi-cloud-rain";
                weatherDESC = "Rain";
            }
            else if(code == 65 || code == 82) {
                iconclass = "bi-cloud-rain-heavy";
                weatherDESC = "Heavy Rain";
            }
            else if (code == 56 || code == 57 || code == 66 || code == 67) {
                iconclass = "bi-cloud-sleet";
                weatherDESC = "Icy Rain";
            }
            else if (code == 71 || code == 73 || code == 75 || code == 77 || code == 85 || code == 86) {
                iconclass = "bi-cloud-snow";
                weatherDESC = "Snow";
            }
            else if (code == 95 || code == 96 || code == 99) {
                iconclass = "bi-cloud-lightning-rain";
                weatherDESC = "Thunderstorm";
            }
            else {
                iconclass = "bi-patch-question";
                weatherDESC = "Unknown";
            }
            

            let weatherString = "" + weekData.daily.temperature_2m_max[j] + weekData.daily_units.temperature_2m_max + " / " + weekData.daily.temperature_2m_min[j] + weekData.daily_units.temperature_2m_min + " - " + weatherDESC + ", " + weekData.daily.wind_speed_10m_max[j] + " mph wind";
            days[j].innerHTML = `<i class="bi ${iconclass} me-3"></i> ${weatherString}`;
    
        }

    }

    

async function getCardInfo() {
    let response0 = await fetch("https://api.open-meteo.com/v1/forecast?latitude=28.0395&longitude=81.9498&current=temperature_2m,precipitation,rain,showers,snowfall,weather_code&temperature_unit=fahrenheit&wind_speed_unit=mph&models=gfs_seamless");
    let data0 = await response0.json();

    let subtitle0 = cards[0].querySelector(".card-subtitle"); //Lakeland
    let code = data0.current.weather_code;
    let weatherDESC = "";

    let icon = cards[0].querySelector("i");
    icon.classList.remove("bi-cloud-snow");

    if (code == 0 || code == 1) {
        icon.classList.add("bi-sun");
        weatherDESC = "Clear";
    }
    else if (code == 2) {
        icon.classList.add("bi-cloud-sun");
        weatherDESC = "Partly Cloudy";
    }
    else if(code == 3) {
        icon.classList.add("bi-cloud");
        weatherDESC = "Cloudy";
    }
    else if (code == 45 || code <= 48) {
        icon.classList.add("bi-cloud-fog");
        weatherDESC = "Fog";
    }
    else if (code == 51 || code == 53 || code == 55) {
        icon.classList.add("bi-cloud-drizzle");
        weatherDESC = "Light Rain";
    }
    else if (code == 61 || code == 63 || code == 80 || code == 81) {
        icon.classList.add("bi-cloud-rain");
        weatherDESC = "Rain";
    }
    else if(code == 65 || code == 82) {
        icon.classList.add("bi-cloud-rain-heavy");
        weatherDESC = "Heavy Rain";
    }
    else if (code == 56 || code == 57 || code == 66 || code == 67) {
        icon.classList.add("bi-cloud-sleet");
        weatherDESC = "Icy Rain";
    }
    else if (code == 71 || code == 73 || code == 75 || code == 77 || code == 85 || code == 86) {
        icon.classList.add("bi-cloud-snow");
        weatherDESC = "Snow";
    }
    else if (code == 95 || code == 96 || code == 99) {
        icon.classList.add("bi-cloud-lightning-rain");
        weatherDESC = "Thunderstorm";
    }
    else {
        icon.classList.add("bi-patch-question");
        weatherDESC = "Unknown";
    }
    subtitle0.textContent = "" + weatherDESC + " - " + data0.current.temperature_2m + data0.current_units.temperature_2m;


    let response1 = await fetch("https://api.open-meteo.com/v1/forecast?latitude=35.2271&longitude=80.8431&current=temperature_2m,precipitation,rain,showers,snowfall,weather_code&temperature_unit=fahrenheit&wind_speed_unit=mph&models=gfs_seamless");
    let data1 = await response1.json();


    let subtitle1 = cards[1].querySelector(".card-subtitle"); //Charlotte
    code = data1.current.weather_code;
    weatherDESC = "";

    icon = cards[1].querySelector("i");
    icon.classList.remove("bi-cloud-snow");
    if (code == 0 || code == 1) {
        icon.classList.add("bi-sun");
        weatherDESC = "Clear";
    }
    else if (code == 2) {
        icon.classList.add("bi-cloud-sun");
        weatherDESC = "Partly Cloudy";
    }
    else if(code == 3) {
        icon.classList.add("bi-cloud");
        weatherDESC = "Cloudy";
    }
    else if (code == 45 || code <= 48) {
        icon.classList.add("bi-cloud-fog");
        weatherDESC = "Fog";
    }
    else if (code == 51 || code == 53 || code == 55) {
        icon.classList.add("bi-cloud-drizzle");
        weatherDESC = "Light Rain";
    }
    else if (code == 61 || code == 63 || code == 80 || code == 81) {
        icon.classList.add("bi-cloud-rain");
        weatherDESC = "Rain";
    }
    else if(code == 65 || code == 82) {
        icon.classList.add("bi-cloud-rain-heavy");
        weatherDESC = "Heavy Rain";
    }
    else if (code == 56 || code == 57 || code == 66 || code == 67) {
        icon.classList.add("bi-cloud-sleet");
        weatherDESC = "Icy Rain";
    }
    else if (code == 71 || code == 73 || code == 75 || code == 77 || code == 85 || code == 86) {
        icon.classList.add("bi-cloud-snow");
        weatherDESC = "Snow";
    }
    else if (code == 95 || code == 96 || code == 99) {
        icon.classList.add("bi-cloud-lightning-rain");
        weatherDESC = "Thunderstorm";
    }
    else {
        icon.classList.add("bi-patch-question");
        weatherDESC = "Unknown";
    }
    subtitle1.textContent = "" + weatherDESC + " - " + data1.current.temperature_2m + data1.current_units.temperature_2m;


    let response2 = await fetch("https://api.open-meteo.com/v1/forecast?latitude=47.6061&longitude=122.3328&current=temperature_2m,precipitation,rain,showers,snowfall,weather_code&temperature_unit=fahrenheit&wind_speed_unit=mph&models=gfs_seamless");
    let data2 = await response2.json();


    let subtitle2 = cards[2].querySelector(".card-subtitle"); //Seattle
    code = data2.current.weather_code;
    weatherDESC = "";

    icon = cards[2].querySelector("i");
    icon.classList.remove("bi-cloud-snow");
    if (code == 0 || code == 1) {
        icon.classList.add("bi-sun");
        weatherDESC = "Clear";
    }
    else if (code == 2) {
        icon.classList.add("bi-cloud-sun");
        weatherDESC = "Partly Cloudy";
    }
    else if(code == 3) {
        icon.classList.add("bi-cloud");
        weatherDESC = "Cloudy";
    }
    else if (code == 45 || code <= 48) {
        icon.classList.add("bi-cloud-fog");
        weatherDESC = "Fog";
    }
    else if (code == 51 || code == 53 || code == 55) {
        icon.classList.add("bi-cloud-drizzle");
        weatherDESC = "Light Rain";
    }
    else if (code == 61 || code == 63 || code == 80 || code == 81) {
        icon.classList.add("bi-cloud-rain");
        weatherDESC = "Rain";
    }
    else if(code == 65 || code == 82) {
        icon.classList.add("bi-cloud-rain-heavy");
        weatherDESC = "Heavy Rain";
    }
    else if (code == 56 || code == 57 || code == 66 || code == 67) {
        icon.classList.add("bi-cloud-sleet");
        weatherDESC = "Icy Rain";
    }
    else if (code == 71 || code == 73 || code == 75 || code == 77 || code == 85 || code == 86) {
        icon.classList.add("bi-cloud-snow");
        weatherDESC = "Snow";
    }
    else if (code == 95 || code == 96 || code == 99) {
        icon.classList.add("bi-cloud-lightning-rain");
        weatherDESC = "Thunderstorm";
    }
    else {
        icon.classList.add("bi-patch-question");
        weatherDESC = "Unknown";
    }
    subtitle2.textContent = "" + weatherDESC + " - " + data2.current.temperature_2m + data2.current_units.temperature_2m;


    let response3 = await fetch("https://api.open-meteo.com/v1/forecast?latitude=36.1627&longitude=86.7816&current=temperature_2m,precipitation,rain,showers,snowfall,weather_code&temperature_unit=fahrenheit&wind_speed_unit=mph&models=gfs_seamless");
    let data3 = await response3.json();


    let subtitle3 = cards[3].querySelector(".card-subtitle"); //Nashville
    code = data3.current.weather_code;
    weatherDESC = "";

    icon = cards[3].querySelector("i");
    icon.classList.remove("bi-cloud-snow");
    if (code == 0 || code == 1) {
        icon.classList.add("bi-sun");
        weatherDESC = "Clear";
    }
    else if (code == 2) {
        icon.classList.add("bi-cloud-sun");
        weatherDESC = "Partly Cloudy";
    }
    else if(code == 3) {
        icon.classList.add("bi-cloud");
        weatherDESC = "Cloudy";
    }
    else if (code == 45 || code <= 48) {
        icon.classList.add("bi-cloud-fog");
        weatherDESC = "Fog";
    }
    else if (code == 51 || code == 53 || code == 55) {
        icon.classList.add("bi-cloud-drizzle");
        weatherDESC = "Light Rain";
    }
    else if (code == 61 || code == 63 || code == 80 || code == 81) {
        icon.classList.add("bi-cloud-rain");
        weatherDESC = "Rain";
    }
    else if(code == 65 || code == 82) {
        icon.classList.add("bi-cloud-rain-heavy");
        weatherDESC = "Heavy Rain";
    }
    else if (code == 56 || code == 57 || code == 66 || code == 67) {
        icon.classList.add("bi-cloud-sleet");
        weatherDESC = "Icy Rain";
    }
    else if (code == 71 || code == 73 || code == 75 || code == 77 || code == 85 || code == 86) {
        icon.classList.add("bi-cloud-snow");
        weatherDESC = "Snow";
    }
    else if (code == 95 || code == 96 || code == 99) {
        icon.classList.add("bi-cloud-lightning-rain");
        weatherDESC = "Thunderstorm";
    }
    else {
        icon.classList.add("bi-patch-question");
        weatherDESC = "Unknown";
    }
    subtitle3.textContent = "" + weatherDESC + " - " + data3.current.temperature_2m + data3.current_units.temperature_2m;
}

0.