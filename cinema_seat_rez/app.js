const container = document.querySelector('.container')
const count = document.getElementById('count')
const amount = document.getElementById('amount')
const select = document.getElementById('movie')
const seats =  document.querySelectorAll('.seat:not(.reserved)')

getFromLocalStorage()
calculareTotal()

container.addEventListener('click', function(e){
    if(e.target.classList.contains('seat')&& !e.target.classList.contains('reserved')){
        e.target.classList.toggle('selected')

        calculareTotal()
    }
})

select.addEventListener('change',function(e){
    calculareTotal()
})

function calculareTotal() {
    const selectedSeats= container.querySelectorAll('.seat.selected')
    
    const selectedSeatsArr= []
    const seatsArr = []

    selectedSeats.forEach(function(seat){
        selectedSeatsArr.push(seat)
    })

    seats.forEach(function(seat){
        seatsArr.push(seat)
    })

    let selectedSeatsIndexs = selectedSeatsArr.map(function(seat){
        return seatsArr.indexOf(seat)
    })

    console.log(selectedSeatsIndexs)

    let selectedSeatCount= container.querySelectorAll('.seat.selected').length
    count.innerText=selectedSeatCount

    amount.innerText= selectedSeatCount * select.value

    saveToLocalStorage(selectedSeatsIndexs)
}

function getFromLocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))

    if(selectedSeats !=null && selectedSeats.length>0){
        seats.forEach((seat,index)=>{
            if(selectedSeats.indexOf(index)>-1){
                seat.classList.add('selected')
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')

    if(selectedMovieIndex !=null){
        select.selectedIndex = selectedMovieIndex
    }
}

function saveToLocalStorage(indexs){
    localStorage.setItem('selectedSeats',JSON.stringify(indexs))
    localStorage.setItem('selectedMovieIndex', select.selectedIndex)
}