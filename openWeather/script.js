const api='58703466e5f95fbebe89fcc883153cf4'

const setQuery =(e)=>{
    if(e.keyCode=='13')
    getCity(searchBar.value)
}

const getCity= (cityName) =>{

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api}&units=metric&lang=tr`)
    .then(weather =>{
        return weather.json()
    })
    .then(display)
}
const display=(result)=>{
    
    console.log(result)
    
    let city = document.querySelector('.city')
    city.innerText = `${result.name}, ${result.sys.country}`

    let temp = document.querySelector('.temp')
    temp.innerText = `${Math.round(result.main.temp)}°C`

    let desc = document.querySelector('.desc')
    desc.innerText = result.weather[0].description

    let minmax = document.querySelector('.minmax')
    minmax.innerText = `${Math.round(result.main.temp_min)} °C / ${Math.round(result.main.temp_max)} °C `

    let wind = document.querySelector('.wind')
    wind.innerText = `${result.wind.deg} °deg, Hız: ${result.wind.speed} km`

    

}

const searchBar = document.getElementById('searchBar')
searchBar.addEventListener('keypress',setQuery)