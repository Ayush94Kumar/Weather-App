
const buttom = document.getElementById("search_button")
const input = document.getElementById("city")
const cityname = document.getElementById("city_name");
const time = document.getElementById("city_time");
const temp = document.getElementById("city_temp");
const wind = document.getElementById("wind");
const feels = document.getElementById("feels");

async function weather(city) {
    try {
        const data = await fetch(`https://api.weatherapi.com/v1/current.json?key=e400deae2f8e413d9e4145139252304&q=${city}&aqi=yes`);
        let res = await data.json();
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
}

buttom.addEventListener("click", async () => {
    const value = input.value;
    
    if (!value) {
        document.getElementById("result-card").style.display = "block"; 
        cityname.innerHTML = "Enter City Name";
        time.innerHTML = "";
        temp.innerHTML = "";
        feels.innerHTML = "";
        wind.innerHTML = "";
        return;
    }

    const res = await weather(value);
    document.getElementById("result-card").style.display = "block";
    
    if (!res) {
        cityname.innerHTML = "Network error. Please try again.";
        time.innerHTML = "";
        temp.innerHTML = "";
        feels.innerHTML = "";
        wind.innerHTML = "";
        return;
    }

    if (res.error) {
        cityname.innerHTML = "City not found!";
        time.innerHTML = "";
        temp.innerHTML = "";
        feels.innerHTML = "";
        wind.innerHTML = "";
        return;
    }
    
    const temp_of_city = res.current.temp_c;
    cityname.innerHTML = `City:- ${res.location.name}, ${res.location.region}, ${res.location.country}`
    time.innerHTML = `Date:- ${res.current.last_updated}`
    temp.innerHTML = `Temp:- ${temp_of_city} °C, ${res.current.condition.text}`
    feels.innerHTML = `FeelsLike:- ${res.current.feelslike_c} °C`
    wind.innerHTML = `Wind:- ${res.current.wind_kph} km/h`
});


