import "../styles/styles.scss"
import WeatherHtmlComponent from './classes/weather-html-component'
import SelectHtmlComponent from './classes/select-html-component'
import WeatherApi from "./classes/weather.api"

const weatherApi = new WeatherApi({
    units: "units=metric"
})

const weatherComponent = new WeatherHtmlComponent({
    shortWeatherContainer: ".short-weather-content",
    visualWeatherContainer: ".weather-visual",
    extendedWeatherContainer: ".extended-weather-content",
});

const selectComponent = new SelectHtmlComponent({
    container: ".select",
    selectItems: ['Kiev','Moscow','London','Paris','Tokyo','New York','Madrid','Сurrent location']
});

main();

function main() {

    weatherApi.init().then(res => res.json())                                
    .then(data => weatherComponent.render(data));

    selectComponent.selectContainer.addEventListener('click', (event) => {
        if(event.target.closest('.select__input')) {
            selectComponent.toggle();
        }
    
        if(event.target.closest('.select-list__item')) {
            let selectedItem = event.target.innerHTML;
            selectComponent.setup(event);

            if(selectedItem === "Сurrent location") {
                localStorage.removeItem('location')
                navigator.geolocation.getCurrentPosition((position) => {
                    let {latitude,longitude} = position.coords;
                    weatherApi.getForCurrentPosition(latitude,longitude)
                            .then(res => res.json())
                                .then(data => weatherComponent.render(data));
                });
            } else {
                localStorage.setItem('location', `${selectedItem}`)
                weatherApi.getForCityName(selectedItem)
                        .then(res => res.json())                                
                            .then(data => weatherComponent.render(data));
            }
        }
    })
};