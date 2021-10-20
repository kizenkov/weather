import {useRef, useState} from 'react'

function Header({setLatLon}) {

    const [latLonName, setLatLonName] = useState(['Минск', 'BY'])
    const [location, setLocation] = useState('')
    const locationField = useRef()
    const getWeather = (e) => {
        e.preventDefault()
        fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=e66c7ec7a8be8c638d481b97895d23ee`)
            .then(response => response.json())
            .then(response => {
                setLatLonName([response[0].local_names.ru, response[0].country])
                setLatLon([response[0].lat, response[0].lon])
            })
            .catch(err => {
                console.log(err)
            })
        setLocation('')
        locationField.current['style'].autofocus = 'false'
    }

    return <div className='header'>
        <form onSubmit={getWeather} className='inline'>
            <input type='text'
                   required
                   ref={locationField}
                   value={location}
                   onChange={(e) => setLocation(e.target.value)}
                   placeholder='Поиск местоположения'/>
        </form>
        <h4 className='inline'>{latLonName[0]}, {latLonName[1]}</h4>
    </div>
}

export default Header