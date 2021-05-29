(()=>{"use strict";var t={};t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),(()=>{var e;t.g.importScripts&&(e=t.g.location+"");var i=t.g.document;if(!e&&i&&(i.currentScript&&(e=i.currentScript.src),!e)){var n=i.getElementsByTagName("script");n.length&&(e=n[n.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=e})();class e{find(t,e=document){let i=e.querySelectorAll(t);return 1===i.length?i[0]:i}}const i=t.p+"ad9cc1297ccf6ceb63769eaca8b5a0c7.png",n=t.p+"3ec68c4008cc4135d273e50802b788fb.png",s=t.p+"a22ddf6ec4c259d4a74b0351a093fa0c.png",a=t.p+"15ca937c459e00717910724f03730f44.png",r=t.p+"b52700c315e3a13eaad9c5427a8c2665.png",o=new class extends class{constructor(){this.url="http://api.openweathermap.org/data/2.5/weather"}get(t){return fetch(`${this.url}${t}`)}}{constructor(t){super(),this.units=t.units}#_apiKey="appid=c2d7b0dc545a1691d056e13f6ec432f3";async init(){let t=localStorage.getItem("location");if(t)return this.getForCityName(t);{const t=async()=>{const t=await new Promise(((t,e)=>{navigator.geolocation.getCurrentPosition(t,e)}));return{long:t.coords.longitude,lat:t.coords.latitude}};let{lat:e,long:i}=await t();return this.getForCurrentPosition(e,i)}}getForCurrentPosition(t,e){return this.get(`?lat=${t}&lon=${e}&${this.units}&${this.#_apiKey}`)}getForCityName(t){return this.get(`?q=${t}&${this.units}&${this.#_apiKey}`)}}({units:"units=metric"}),c=new class extends e{constructor({shortWeatherContainer:t,visualWeatherContainer:e,extendedWeatherContainer:i}){super(),this.shortWeatherContainer=this.find(t),this.visualWeatherContainer=this.find(e),this.extendedWeatherContainer=this.find(i)}render(t){this.data=t,this.temperature=Math.round(this.data.main.temp),this.temperatureFeels=Math.round(this.data.main.feels_like),this.weatherDescription=this.data.weather[0].description,this.weatherMain=this.data.weather[0].main,this.celsiusСharacter="&#8451",this.imageSrc=`http://openweathermap.org/img/wn/${this.data.weather[0].icon}@2x.png`,this.visualWeatherContainer.innerHTML=`\n            <img src="${this.imageSrc}">\n        `,this.#_createShortWeatherContent(),this.#_createExtendedWeatherContent()}#_createShortWeatherContent(){let t=`\n            <p><b>${this.temperature}</b>${this.celsiusСharacter}</p>\n            <p>${this.weatherDescription}</p>\n        `;this.shortWeatherContainer.innerHTML=t}#_createExtendedWeatherContent(){let t=new Date;t.setSeconds(t.getSeconds()+this.data.timezone);let e=t.toLocaleString("en",{hour:"numeric",minute:"2-digit",month:"long",day:"2-digit",timeZone:"UTC"}),o=this.data.wind.deg,c=this.data.rain,h="";c&&(h=`\n            <div class="visual">\n                <img src="${a}">\n            </div>\n            <span>${c["1h"]}mm</span>\n            `);let d=this.data.visibility/1e3;d=d.toFixed(1);let l=`\n            <div class="date">${e}</div>\n            <div class="city">${this.data.name}, ${this.data.sys.country}</div>\n            <div class="temperature">\n                <img src="${this.imageSrc}" width="70" height="70">\n                <span><b>${this.temperature}</b>${this.celsiusСharacter}</span>\n            </div>\n            <div class="weather">\n                <span>Feels like ${this.temperatureFeels}${this.celsiusСharacter}</span>\n                <span>${this.weatherMain}. ${this.weatherDescription}</span>\n            </div>\n            <div class="weather-add-info">\n                <div class="weather-add-info__item _wind">\n                    <div class="visual">\n                        <img style="transform: rotate(${o}deg)"src="${i}">\n                    </div>\n                    <span>${this.data.wind.speed} m/s</span>\n                </div>\n                <div class="weather-add-info__item _pressure">\n                    <div class="visual">\n                        <img src="${n}">\n                    </div>\n                    <span>${this.data.main.pressure}hPa</span>\n                </div>\n                <div class="weather-add-info__item _humidity">\n                    <div class="visual">\n                        <img src="${s}">\n                    </div>\n                    <span>Humidity: ${this.data.main.humidity}%</span>\n                </div>\n                <div class="weather-add-info__item _rain">\n                    ${h}\n                </div>\n                <div class="weather-add-info__item _visibility">\n                    <div class="visual">\n                        <img src="${r}">\n                    </div>\n                    <span>Visibility: ${d}km</span>\n                </div>\n            </div>\n        `;this.extendedWeatherContainer.innerHTML=l}}({shortWeatherContainer:".short-weather-content",visualWeatherContainer:".weather-visual",extendedWeatherContainer:".extended-weather-content"}),h=new class extends e{constructor({container:t,selectItems:e}){super(),this.selectContainer=this.find(t),this.selectInput=this.find(".select__input"),this.selectListContainer=this.find(".select-list"),this.selectItems=e,this.render()}render(){let t=this.selectItems.map((t=>`<li class="select-list__item">${t}</li>`)).join("");this.selectListContainer.innerHTML=t}setup(t){let e=t.target.innerHTML;"Select location"===this.selectInput.textContent?t.target.remove():t.target.innerHTML=this.selectInput.innerHTML,this.selectInput.innerHTML=e,this.toggle()}toggle(){this.selectContainer.classList.toggle("open")}}({container:".select",selectItems:["Kiev","Moscow","London","Paris","Tokyo","New York","Madrid","Сurrent location"]});o.init().then((t=>t.json())).then((t=>c.render(t))),h.selectContainer.addEventListener("click",(t=>{if(t.target.closest(".select__input")&&h.toggle(),t.target.closest(".select-list__item")){let e=t.target.innerHTML;h.setup(t),"Сurrent location"===e?(localStorage.removeItem("location"),navigator.geolocation.getCurrentPosition((t=>{let{latitude:e,longitude:i}=t.coords;o.getForCurrentPosition(e,i).then((t=>t.json())).then((t=>c.render(t)))}))):(localStorage.setItem("location",`${e}`),o.getForCityName(e).then((t=>t.json())).then((t=>c.render(t))))}}))})();
//# sourceMappingURL=bundle.js.map