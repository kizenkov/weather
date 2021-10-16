import {useState} from 'react'

function Header({setLatLon}) {
    const [location, setLocation] = useState('')
    const [latLonName, setLatLonName] = useState(['Минск', 'BY'])
    const getWeather = (e) => {
        if (e.preventDefault) {
            e.preventDefault()
        } else {
            e.returnValue = false
        }
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=e66c7ec7a8be8c638d481b97895d23ee`)
            .then(response => response.json())
            .then(response => {
                setLatLonName([response[0].local_names.ru, response[0].country])
                setLatLon([response[0].lat, response[0].lon])
            })
            .catch(err => {
                // console.log(err)
                alert(err)
            })
        // setLocation('')
    }

    return <div className='header'>
        <form onSubmit={getWeather} className='inline'>
            <input type='text'
                   required
                   value={location}
                   name='locationfield'
                   onChange={(e) => setLocation(e.target.value)}
                   placeholder='Поиск местоположения'/>
        </form>
        <h4 className='inline'>{latLonName[0]}, {latLonName[1]}</h4>
    </div>
}

export default Header