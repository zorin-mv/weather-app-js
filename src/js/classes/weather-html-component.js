import DOMManipulator from '../classes/dom-manipulator'

import arrowIcon from '../../image/arrow.png'
import atmosphericIcon from '../../image/atmospheric.png'
import humidityIcon from '../../image/humidity.png'
import rainIcon from '../../image/rain.png'
import visibilityIcon from '../../image/visibility.png'

export default class WeatherHtmlComponent extends DOMManipulator{

    constructor({shortWeatherContainer,visualWeatherContainer,extendedWeatherContainer}) {
        super();
        this.shortWeatherContainer = this.find(shortWeatherContainer);
        this.visualWeatherContainer = this.find(visualWeatherContainer);
        this.extendedWeatherContainer = this.find(extendedWeatherContainer);
    }

    render(data) {
        this.data = data;

        this.temperature = Math.round(this.data.main.temp);
        this.temperatureFeels = Math.round(this.data.main.feels_like);
        this.weatherDescription = this.data.weather[0].description;
        this.weatherMain = this.data.weather[0].main;
        this.celsiusСharacter = '&#8451';
        this.imageSrc = `http://openweathermap.org/img/wn/${this.data.weather[0].icon}@2x.png`
        this.visualWeatherContainer.innerHTML = `
            <img src="${this.imageSrc}">
        `
        this.#_createShortWeatherContent();
        this.#_createExtendedWeatherContent();

    }

    #_createShortWeatherContent() {
        let shortWeatherHtmlContent = `
            <p><b>${this.temperature}</b>${this.celsiusСharacter}</p>
            <p>${this.weatherDescription}</p>
        `
        this.shortWeatherContainer.innerHTML = shortWeatherHtmlContent;
    }

    #_createExtendedWeatherContent() {
        let date = new Date();
        date.setSeconds(date.getSeconds() + this.data.timezone)
        let dateString = date.toLocaleString('en', {hour: 'numeric', minute:'2-digit',month: 'long', day: '2-digit', timeZone: 'UTC'});
        let windDeg = this.data.wind.deg;
        let rain = this.data.rain;
        let rainHtmlContent = '';

        if(rain) {
            rainHtmlContent = `
            <div class="visual">
                <img src="${rainIcon}">
            </div>
            <span>${rain['1h']}mm</span>
            `
        };
        let visibilityKm = this.data.visibility / 1000;
        visibilityKm = visibilityKm.toFixed(1);

        let extendedWeatherHtmlContent = `
            <div class="date">${dateString}</div>
            <div class="city">${this.data.name}, ${this.data.sys.country}</div>
            <div class="temperature">
                <img src="${this.imageSrc}" width="70" height="70">
                <span><b>${this.temperature}</b>${this.celsiusСharacter}</span>
            </div>
            <div class="weather">
                <span>Feels like ${this.temperatureFeels}${this.celsiusСharacter}</span>
                <span>${this.weatherMain}. ${this.weatherDescription}</span>
            </div>
            <div class="weather-add-info">
                <div class="weather-add-info__item _wind">
                    <div class="visual">
                        <img style="transform: rotate(${windDeg}deg)"src="${arrowIcon}">
                    </div>
                    <span>${this.data.wind.speed} m/s</span>
                </div>
                <div class="weather-add-info__item _pressure">
                    <div class="visual">
                        <img src="${atmosphericIcon}">
                    </div>
                    <span>${this.data.main.pressure}hPa</span>
                </div>
                <div class="weather-add-info__item _humidity">
                    <div class="visual">
                        <img src="${humidityIcon}">
                    </div>
                    <span>Humidity: ${this.data.main.humidity}%</span>
                </div>
                <div class="weather-add-info__item _rain">
                    ${rainHtmlContent}
                </div>
                <div class="weather-add-info__item _visibility">
                    <div class="visual">
                        <img src="${visibilityIcon}">
                    </div>
                    <span>Visibility: ${visibilityKm}km</span>
                </div>
            </div>
        `;
    
        this.extendedWeatherContainer.innerHTML = extendedWeatherHtmlContent;
    }
}
