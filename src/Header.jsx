import {useState} from 'react'
import * as axios from 'axios'

function Header({setLatLon}) {

    const [latLonName, setLatLonName] = useState(['Минск', 'BY'])
    const [location, setLocation] = useState('')
    const getWeather = (e) => {
        e.preventDefault()
        let url = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=e66c7ec7a8be8c638d481b97895d23ee`
        alert(url)
        axios.get(url)
            .then(response => {
                let data = response.data
                setLatLonName([data[0].local_names.ru, data[0].country])
                setLatLon([data[0].lat, data[0].lon])
            })
            .catch(err => {
                alert(err)
                // console.log(err)
            })
        setLocation('')
    }

    return <div className='header'>
        <form onSubmit={getWeather} className='inline'>
            <input type='text'
                   required
                   value={location}
                   onChange={(e) => setLocation(e.target.value)}
                   placeholder='Поиск местоположения'/>
            <input type="submit" value="Submit"/>
        </form>
        <h4 className='inline'>{latLonName[0]}, {latLonName[1]}</h4>
    </div>
}

export default Header