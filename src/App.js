import {useEffect, useState} from "react"
import Header from "./Header";
import Weather from "./Weather";
import Footer from "./Footer";

function App() {
    const [data, setData] = useState(null)
    const [latLon, setLatLon] = useState([53.893, 27.567])
    useEffect(() => {
        try {
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latLon[0]}&lon=${latLon[1]}&lang=ru&exclude=minutely,hourly&appid=e66c7ec7a8be8c638d481b97895d23ee`)
                .then(response => response.json())
                .then(response => {
                    setData(response)
                })
        } catch (err) {
            alert(err)
        }
    }, [latLon])

    return <div className='app'>
        <Header setLatLon={setLatLon}/>
        <Weather data={data}/>
        <Footer/>
    </div>
}

export default App