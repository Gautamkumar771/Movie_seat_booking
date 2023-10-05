
// Define the movie list with movie names and prices
const moviesList = [
    { movieName: "Flash", price: 7 },
    { movieName: "Spiderman", price: 5 },
    { movieName: "Batman", price: 4 },
  ];
  
  // Get references to HTML elements
  const selectMovieEl = document.getElementById("selectMovie");
  const allSeatCont = document.querySelectorAll("#seatCont .seat");
  const selectedSeatsHolderEl = document.getElementById("selectedSeatsHolder");
  const moviePriceEl = document.getElementById("moviePrice");
  const cancelBtnEL = document.getElementById("cancelBtn");
  const proceedBtnEl = document.getElementById("proceedBtn");
  
  // Populate the movie select dropdown with options
  moviesList.forEach((movie) => {
    const optionEl = document.createElement("option");
    optionEl.innerHTML = `${movie.movieName} $${movie.price}`;
    selectMovieEl.appendChild(optionEl);
  });
  
  // Initialize movie price and current movie name
  let moviePrice = 7;
  let currentMovieName = `Tom and Jerry 2021`;
  
  // Event listener for movie selection
  selectMovieEl.addEventListener("input", (e) => {
    // Extract movie name and price from the selected option
    let movieName = e.target.value.split("");
    let dollarIndex = movieName.indexOf("$");
    let movie = movieName.splice(0, dollarIndex - 1).join("");
    currentMovieName = movie;
    moviePrice = JSON.parse(movieName.splice(2, dollarIndex).join(""));
  
    // Update movie details
    updatMovieName(movie, moviePrice);
    updatePrice(moviePrice, takenSeats.length);
  });
  
  // Initialize seat IDs for unoccupied seats
  let initialSeatValue = 0;
  allSeatCont.forEach((seat) => {
    const attr = document.createAttribute("data-seatid");
    attr.value = ++initialSeatValue;
    seat.setAttributeNode(attr);
  });
  
  // Get all unoccupied seats
  let seatContEl = document.querySelectorAll("#seatCont .seat:not(.occupied)");
  
  // Initialize an array to store selected seats
  let takenSeats = [];
  
  // Event listeners for seat selection
  seatContEl.forEach((seat) => {
    seat.addEventListener("click", (e) => {
      let isSelected = seat.classList.contains("selected");
  
      let seatId = JSON.parse(seat.dataset.seatid);
  
      if (!isSelected) {
        seat.classList.add("selected");
        takenSeats.push(seatId);
        takenSeats = [...new Set(takenSeats)];
      } else if (isSelected) {
        seat.classList.remove("selected");
  
        takenSeats = takenSeats.filter((seat) => {
          if (seat !== seatId) {
            return seat;
          }
        });
      }
      updateSeats();
      updatePrice(moviePrice, takenSeats.length);
    }, { once: true }); // The 'once' option ensures that the event listener runs only once
  });
  
  // Update the selected seats display
  function updateSeats() {
    selectedSeatsHolderEl.innerHTML = ``;
  
    takenSeats.forEach((seat) => {
      const seatHolder = document.createElement("div");
      seatHolder.classList.add("selectedSeat");
      selectedSeatsHolderEl.appendChild(seatHolder);
  
      seatHolder.innerHTML = seat;
    });
  
    if (!takenSeats.length) {
      const spanEl = document.createElement("span");
      spanEl.classList.add("noSelected");
      spanEl.innerHTML = `NO SEAT SELECTED`;
      selectedSeatsHolderEl.appendChild(spanEl);
    }
  
    seatCount();
  }
  
  // Update the number of selected seats
  function seatCount() {
    const numberOfSeatEl = document.getElementById("numberOfSeat");
    numberOfSeatEl.innerHTML = takenSeats.length;
  }
  
  // Update the movie name and price
  function updatMovieName(movieName, price) {
    const movieNameEl = document.getElementById("movieName");
    const moviePriceEl = document.getElementById("moviePrice");
    movieNameEl.innerHTML = movieName;
    moviePriceEl.innerHTML = `$ ${price}`;
  }
  
  // Update the total price
  function updatePrice(price, seats) {
    const totalPriceEl = document.getElementById("totalPrice");
    let total = seats * price;
    totalPriceEl.innerHTML = `$ ${total}`;
  }
  
  // Event listener for cancel button
  cancelBtn.addEventListener("click", (e) => {
    cancelSeats();
  });
  
  // Function to cancel selected seats
  function cancelSeats() {
    takenSeats = [];
    seatContEl.forEach((seat) => {
      seat.classList.remove("selected");
    });
    updatePrice(0, 0);
    updateSeats();
  }
  
  // Event listener for proceed button
  proceedBtnEl.addEventListener("click", (e) => {
    if (takenSeats.length) {
      alert("Yayy! Your Seats have been booked");
      uncancelSeats();
    } else {
      alert("Oops no seat Selected");
    }
  });
  
  // Function to uncancel seats (simulate booking)
  function uncancelSeats() {
    takenSeats = [];
    seatContEl.forEach((seat) => {
      if (seat.classList.contains("selected")) {
        seat.classList.remove("selected");
        seat.classList.add("seat")
        seat.classList.add("occupied");
      }
    });
    updatePrice(0, 0);
    updateSeats();
  }
  