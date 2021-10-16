import {useEffect, useState} from "react"
import vector from './vector.png'
import Footer from "./Footer";


function App() {
    let [time, setTime] = useState(new Date())
    let monthsArray = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
    let day = time.getDate()
    let month = monthsArray[time.getMonth()]
    let year = time.getFullYear()
    useEffect(() => {
        let change = setInterval(() => {
            setTime(new Date())
        }, 1000)
        return function () {
            clearInterval(change)
        }
    })

    const [data, setData] = useState(null)

    let dailyList = []
    if (data) {
        for (let i = 0; i < data.daily.length; i++) {
            dailyList.push(<div className='next-weather' key={data.daily[i].dt}>
                <div className='description'>
                    {i === 0 ? 'СЕГОДНЯ' : new Date(+data.daily[i].dt * 1000).toLocaleDateString()}
                    <span> {data.daily[i].weather[0].description}</span>
                </div>
                <div className='description-block'>
                    <img src={`http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`}
                         alt="icon"/>
                    <div className="inline degree">
                        <div>
                            {Math.trunc(+data.daily[i].temp.day - 273.15)}°
                        </div>
                        <div>
                            {Math.trunc(+data.daily[i].temp.night - 273.15)}°
                        </div>
                    </div>

                    <div className='inline information'>
                        <div className='inline'>
                            <div>
                                ВЕТЕР
                            </div>
                            <div className='wind description'>
                                {Math.round(+data.daily[i].wind_speed * 10) / 10} м/c
                                <img src={vector} alt="" style={{transform: `rotate(${+data.daily[i].wind_deg}deg)`}}/>
                            </div>
                        </div>
                        <div className='inline'>
                            <div>
                                ПОРЫВЫ
                            </div>
                            <div className='wind description'>
                                до {Math.round(+data.daily[i].wind_gust * 10) / 10} м/с
                            </div>
                        </div>
                        <div className='inline'>
                            <div>
                                ВЛАЖНОСТЬ
                            </div>
                            <div className='description'>
                                {data.daily[i].humidity}%
                            </div>
                        </div>
                        <div className='inline'>
                            <div>
                                ОБЛАЧНОСТЬ
                            </div>
                            <div className='description'>
                                {data.daily[i].clouds}%
                            </div>
                        </div>
                        <div className='inline'>
                            <div>
                                ДАВЛЕНИЕ
                            </div>
                            <div className='description'>
                                {Math.round(+data.daily[i].pressure / 1.33)} мм
                            </div>
                        </div>
                        <div className='inline'>
                            <div>
                                ВОСХОД <span className='description'>
                                     {new Date(+data.daily[i].sunrise * 1000).toLocaleTimeString().slice(0, -3)}
                                </span>
                            </div>
                            <div>
                                ЗАКАТ <span className='description'>
                                     {new Date(+data.daily[i].sunset * 1000).toLocaleTimeString().slice(0, -3)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
        }
    }

    const [location, setLocation] = useState('');
    const [latLonName, setLatLonName] = useState([53.893, 27.567, 'Минск', 'BY']);
    const getWeather = (e) => {
        e.preventDefault();
        if (location !== '') {
            fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=e66c7ec7a8be8c638d481b97895d23ee`)
                .then(response => response.json())
                .then(response => {
                    setLatLonName([response[0].lat, response[0].lon, response[0].local_names.ru, response[0].country])
                })
                .catch(err => {
                    console.log(err)
                })
            setLocation('')
        }
    }

    useEffect(() => {
        try {
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latLonName[0]}&lon=${latLonName[1]}&lang=ru&exclude=minutely,hourly&appid=e66c7ec7a8be8c638d481b97895d23ee`)
                .then(response => response.json())
                .then(response => {
                    setData(response)
                })
        } catch (err) {
            alert(err)
        }
    }, [latLonName])


    return (<div>
            <div className='app'>
                <form onSubmit={getWeather} className='inline'>
                    <input type='text'
                           value={location}
                           onChange={(e) => setLocation(e.target.value)}
                           placeholder='Поиск местоположения'/>
                </form>
                <h4 className='inline'>{latLonName[2]}, {latLonName[3]}</h4>
                {data && <div className="current">
                    <h5>
                        ТЕКУЩАЯ ПОГОДА
                    </h5>
                    <div>
                        <div>
                            {time.toLocaleTimeString().slice(0, -3)}
                        </div>
                        <div>
                            {`${day} ${month} ${year}`}
                        </div>
                    </div>
                    <div className='current-weather'>
                        <div>
                            <div className='currentTemp inline'>
                                <img src={`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`}
                                     alt="icon"/>
                                <span>{Math.trunc(+data.current.temp - 273.15)}°</span>
                            </div>
                            <div className='inline'>
                                <div className='description'>
                                    {data.current.weather[0].description[0].toUpperCase() + data.current.weather[0].description.slice(1)}
                                </div>
                                <div>Ощущается как {Math.trunc(+data.current.feels_like - 273.15)}°</div>
                            </div>
                        </div>

                        <div>
                            <div className='inline'>
                                <div>
                                    ВЕТЕР
                                </div>
                                <div className='wind description'>
                                    {Math.round(+data.current.wind_speed * 10) / 10} м/c
                                    <img src={vector} alt=""
                                         style={{transform: `rotate(${+data.current.wind_deg}deg)`}}/>
                                </div>
                            </div>
                            <div className='inline'>
                                <div>
                                    ПОРЫВЫ
                                </div>
                                <div className='wind description'>
                                    до {Math.round(+data.current.wind_gust * 10) / 10} м/с
                                </div>
                            </div>
                            <div className='inline'>
                                <div>
                                    ВЛАЖНОСТЬ
                                </div>
                                <div className='description'>
                                    {data.current.humidity}%
                                </div>
                            </div>
                            <div className='inline'>
                                <div>
                                    ВИДИМОСТЬ
                                </div>
                                <div className='description'>
                                    {data.current.visibility / 1000} км
                                </div>
                            </div>
                            <div className='inline'>
                                <div>
                                    ОБЛАЧНОСТЬ
                                </div>
                                <div className='description'>
                                    {data.current.clouds}%
                                </div>
                            </div>
                            <div className='inline'>
                                <div>
                                    ДАВЛЕНИЕ
                                </div>
                                <div className='description'>
                                    {Math.round(+data.current.pressure / 1.33)} мм
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
                <h5>
                    ПРОГНОЗ НА 7 ДНЕЙ
                </h5>
                <div className="overflow">
                    {dailyList}
                </div>
                <div className='today'>

                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default App