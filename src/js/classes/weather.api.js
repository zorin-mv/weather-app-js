import Http from './http.service'

export default class WeatherApi extends Http{
    
    constructor(options) {
        super();
        this.units = options.units;
    }

    #_apiKey = 'appid=c2d7b0dc545a1691d056e13f6ec432f3';

    async init() {
        let location = localStorage.getItem('location');
        if(location) {
            return this.getForCityName(location)
        } else {
            const getCoords = async () => {
                const pos = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });
            
                return {
                    long: pos.coords.longitude,
                    lat: pos.coords.latitude,
                };
            };
        
            let {lat,long} = await getCoords();
            return this.getForCurrentPosition(lat,long)
        }
    }
    
    getForCurrentPosition(latitude,longitude) {
        return this.get(`?lat=${latitude}&lon=${longitude}&${this.units}&${this.#_apiKey}`);
    }

    getForCityName(city) {
        return this.get(`?q=${city}&${this.units}&${this.#_apiKey}`);
    }
};