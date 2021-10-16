import {useEffect, useState} from 'react'
import vector from './vector.png'

function Weather({data}) {

    let [time, setTime] = useState(new Date())
    let monthsArray = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
    let daysArray = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ']
    let daysArrayFull = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
    let date = time.getDate()
    let day = daysArrayFull[time.getDay()]
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

    let dailyList = []
    if (data) {
        for (let i = 0; i < data.daily.length; i++) {
            dailyList.push(<div className='next-weather' key={data.daily[i].dt}>
                <div className='description'>
                    {i === 0 ? 'Сегодня' : `${daysArray[new Date(+data.daily[i].dt * 1000).getDay()]}, ${new Date(+data.daily[i].dt * 1000).toLocaleDateString()}`}
                    <span> {data.daily[i].weather[0].description}</span>
                </div>
                <div className='description-block'>
                    <img src={`http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`}
                         alt='icon'/>
                    <div className='inline degree'>
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
                                <img src={vector} alt='' style={{transform: `rotate(${+data.daily[i].wind_deg}deg)`}}/>
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

    return <div className='weather'>
        {data && <div className='current'>
            <h5>ТЕКУЩАЯ ПОГОДА</h5>
            <div>
                <div>
                    {time.toLocaleTimeString().slice(0, -3)}
                </div>
                <div>
                    {`${day}, ${date} ${month} ${year}`}
                </div>
            </div>
            <div className='current-weather'>
                <div>
                    <div className='currentTemp inline'>
                        <img src={`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`}
                             alt='icon'/>
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
                            <img src={vector} alt=''
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
        <h5>ПРОГНОЗ НА 7 ДНЕЙ</h5>
        {dailyList}
    </div>
}

export default Weather