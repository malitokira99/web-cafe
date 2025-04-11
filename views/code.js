function accion(){
    var contra = document.getElementsByClassName('menu');
    for(var incremento = 0; incremento < contra.length; incremento++){
        contra[incremento].classList.toggle('oculto');
    }
}

//codigo para el clima y datos atmosfericos

const apiKey = '6a4c64bb07ef024ec275d4a75a47465e';
const ciudad = 'Libano';
const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},CO&appid=${apiKey}&units=metric&lang=es`;

async function fetchWeather() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const weatherData = `
            <h2>${data.name}</h2>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}" class="weather-icon" style="width: 50px;">
            <p style="margin:1px;" >Temperatura: ${data.main.temp} °C</p>
            <p style="margin:1px;" >Clima: ${data.weather[0].description}</p>
            <p style="margin:1px;" >Humedad: ${data.main.humidity} %</p>
            <pstyle="margin:1px;">Viento: ${data.wind.speed} km/h</p>
        `;

        document.getElementById('weather').innerHTML = weatherData;
    } catch (error) {
        document.getElementById('weather').innerHTML = `<p>Error al obtener los datos del clima: ${error.message}</p>`;
    }
}

fetchWeather();


