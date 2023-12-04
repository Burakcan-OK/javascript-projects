const url ="https://dataservice.accuweather.com/currentconditions/v1/"
const url2='https://dataservice.accuweather.com/locations/v1/cities/search'

const api='SAoImYWrYzqX6RO2tnMaHbP4o3NYuSEK'

const setQuery =(e)=>{
    if(e.keyCode=='13')
    getCity(searchBar.value)
    const city = getCityForm.city.value.trim();
    getCityForm.reset();

    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => {
            console.log(alert('Please enter a valid city name'))
            console.log(err);
        })
}

const getCity= (cityName) =>{

    let query= `${url2}?apikey=${api}&q=${cityName}`
    fetch(query)
    .then(weather =>{
        return weather.json()
    })
    .then(displayCity)
}
const displayCity=(result)=>{
    
    const cityData=result[0]
    console.log(cityData)
    
    let city = document.querySelector('.city')
    city.innerText = `${cityData.LocalizedName}, ${cityData.Country.ID}`

}
const updateCity = (city) =>{
    const cityDetails = getCity(city)
    const cityWeather = getWeather(cityDetails.Key)
    
    return {cityDetails,cityWeather}
}
const getWeather= (locationKey) =>{

    let query= `${url}${locationKey}?apikey=${api}`
    fetch(query)
    .then(weather =>{
        return weather.json()
    })
    .then(displayWeather)
}
const displayWeather=(result)=>{
    
    const weatherData=result[0]
    console.log(weatherData)
    
    
    let temp = document.querySelector('.temp')
    temp.innerText = `${Math.round(result.main.temp)}°C`

    let desc = document.querySelector('.desc')
    desc.innerText = weatherData.WeatherText

    let minmax = document.querySelector('.minmax')
    minmax.innerText = `${Math.round(result.min.temp_min)}°C / 
                        ${Math.round(result.main.temp_max)}°C`
}

const searchBar = document.getElementById('searchBar')
searchBar.addEventListener('keypress',setQuery)