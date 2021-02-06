const inputVal = document.getElementById('inputVal');
const API_KEY = `2fa3816aa2ffa9f2810f0568cf8ec7b9`;
const ICON_URL = `http://openweathermap.org/img/wn/`;

inputVal.addEventListener('keypress', (e) => {
    if(e.key === 'Enter'){
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputVal.value}&units=metric&appid=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            let weatherData = {
                icon: data.weather[0].icon,
                city: data.name,
                country: data.sys.country,
                cloud: data.weather[0].description,
                temp: data.main.temp,
                humidity: data.main.humidity,
                pressure: data.main.pressure
            }
            createElement(weatherData)
        })
        // .catch(e=>console.log(e))
        document.getElementById('inputVal').value = ''
    }
})

const info = document.getElementById('info');
function createElement(weather) {
    let dataShow = document.createElement('div');
    dataShow.className = 'data-show';
    let iconDiv = document.createElement('div');
    iconDiv.id = 'icon';
    let img = document.createElement('img');
    img.id = 'weather-icon';
    img.src = `${ICON_URL}${weather.icon}.png`;
    iconDiv.appendChild(img);
    let descDiv = document.createElement('div')
    descDiv.className = 'weather-description';

    let cityNameDiv = document.createElement('div');
    cityNameDiv.className = 'city-name';
    descDiv.appendChild(cityNameDiv);

    let citySpan = document.createElement('span')
    citySpan.id = 'city-name';
    citySpan.innerText = `${weather.city}, `;
    let countrySpan = document.createElement('span');
    countrySpan.id = 'country';
    countrySpan.innerText = weather.country;
    let cloudSpan = document.createElement('span');
    cloudSpan.id = 'cloud';
    cloudSpan.innerText = ` (${weather.cloud})`

    cityNameDiv.appendChild(citySpan);
    cityNameDiv.appendChild(countrySpan);
    cityNameDiv.appendChild(cloudSpan);

    let weatherThpDiv = document.createElement('div');
    weatherThpDiv.id = 'weather-thp';
    descDiv.appendChild(weatherThpDiv);

    let tempSpan = document.createElement('span');
    tempSpan.id = 'temp';
    tempSpan.innerText = `Temp: ${weather.temp}, `
    let humiditySpan = document.createElement('span');
    humiditySpan.id = 'humidity';
    humiditySpan.innerText = `Humidity: ${weather.humidity}%, `
    let pressureSpan = document.createElement('span');
    pressureSpan.id = 'pressure';
    pressureSpan.innerText = `Pressure: ${weather.pressure}mb`

    weatherThpDiv.appendChild(tempSpan);
    weatherThpDiv.appendChild(humiditySpan);
    weatherThpDiv.appendChild(pressureSpan);

    dataShow.appendChild(iconDiv);
    dataShow.appendChild(descDiv);
    info.insertBefore(dataShow, info.childNodes[0])
}