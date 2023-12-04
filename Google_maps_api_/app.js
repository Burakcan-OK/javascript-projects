let latitude, longitude=""

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(onSucess,onError)
}else{
    alert("Browser can't get location info...")
}


function onSucess(position){
    latitude = position.coords.latitude
    longitude = position.coords.longitude

    initMap()
    
    const api_key= "your_api_key"
    const url= `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${api_key}`

    fetch(url)
        .then(response=>response.json())
        .then(result=>{
            let details=result.results[0].components
            console.log(details)
            let {country, postcode, proveince, suburb, road}= details

            document.getElementById("results").innerHTML=`
            <p>ülke: ${country} <p>
            <p>posta kodu: ${postcode} <p>
            <p>il: ${proveince} <p>
            <p>mahalle: ${suburb} <p>
            <p>sokak: ${road} <p>
            `
            
        })
}

function onError(error){
    if(error.code==1){
        alert("user denied location permission")
    }else if(error.code==2){
        alert("location can't get")
    }else{
        alert("an error has been ocured")
    }
}

let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: latitude, lng: longitude },
    zoom: 8,
  });

  const marker = new google.maps.Marker({
    map: map,
    position:{ lat: latitude, lng: longitude },
    title: "Uluru",
  });

}
