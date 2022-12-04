import "../static/CSS/MainWeather.css";
import { React, useEffect, useState } from 'react'
import jwt_decode from "jwt-decode";
import { getJwtAtStorage } from '../utils/useLocalStorage';

const WeatherDate = (props) => {

    const token = getJwtAtStorage(); //getStorageItem('jwtToken', '')[0];
    const { location } = jwt_decode(token);

    const [nowWeather, setNowWeather] = useState(null);

    const cityLocationList = [
        { city: "서울", lat: 37.5666103, lon: 126.9783882 },
        { city: "강원도", lat: 37.8603672, lon: 128.3115261 },
        { city: "경기도", lat: 37.4363177, lon: 127.550802 },
        { city: "경상남도", lat: 35.4414209, lon: 128.2417453 },
        { city: "경상북도", lat: 36.6308397, lon: 128.962578 },
        { city: "광주광역시", lat: 35.160032, lon: 126.851338 },
        { city: "대구광역시", lat: 35.87139, lon: 128.601763 },
        { city: "대전광역시", lat: 36.3504396, lon: 127.3849508 },
        { city: "부산광역시", lat: 35.179816, lon: 129.0750223 },
        { city: "세종특별자치시", lat: 36.4803512, lon: 127.2894325 },
        { city: "울산광역시", lat: 35.5394773, lon: 129.3112994 },
        { city: "전라남도", lat: 34.9007274, lon: 126.9571667 },
        { city: "전라북도", lat: 35.6910153, lon: 127.2368291 },
        { city: "제주특별자치도", lat: 33.4273366, lon: 126.5758344 },
        { city: "충청남도", lat: 36.6173379, lon: 126.8453965 },
        { city: "충청북도", lat: 36.7853718, lon: 127.6551404 },
        { city: "인천광역시", lat: 37.4559418, lon: 126.7051505 },
    ]
    let cityInfo = cityLocationList.filter((item) => {
        // 백엔드 데이터(사용자 데이터)
        return item.city === location;
    })

    const getWeatherByCityLocation = async (lat, lon) => {
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f6dac6728e6a482af225b0345eb090e9&lang=kr&&units=metric`
        let response = await fetch(url);
        let data = await response.json();
        setNowWeather(data);
    }

    useEffect(() => {
        getWeatherByCityLocation(cityInfo[0].lat, cityInfo[0].lon);
    }, [])

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', }}>
                <div style={{ float: 'left', height:'50px', display: 'table-cell', verticalAlign: 'middle', fontSize : '12pt'}}>
                    <div style={{position: 'relative', top: '15px'}}><b>{props.todayYear}년 {props.todayMonth}월 {props.todayDate}일 {props.dayOfweek}요일</b></div>
                    </div>
                <div style={{ float: 'right', fontSize : "11pt"}}>
                <img style={{ width: "30x", height: "50px", filter: "drop-shadow(0.5px 0.5px 0.5px #000)", marginRight : "-5px"}} src={`http://openweathermap.org/img/wn/${nowWeather?.weather[0].icon}@2x.png`} />
                    <b>{nowWeather?.main.temp.toFixed(1)}° {nowWeather?.weather[0].main}</b> {cityInfo[0].city}
                    
                </div>
            </div>
        </div>
    )
}

export default WeatherDate