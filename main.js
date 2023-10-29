const container = document.getElementById("ctn-main");
const planetsPrevious = document.getElementById("planets-previous");
const planetsNext = document.getElementById("planets-next");

let URL_Planets = "https://swapi.tech/api/planets/?1";
let nextPlanets;
let previousPlanets;

planetsPrevious.addEventListener("click", pagePreviousPlanets);
planetsNext.addEventListener("click", pageNextPlanets);

const peoplePrevious = document.getElementById("people-previous");
const peopleNext = document.getElementById("people-next");

let URL_People = "https://swapi.tech/api/people/?1";
let nextPeople;
let previousPeople;

peoplePrevious.addEventListener("click", pagePreviousPeople);
peopleNext.addEventListener("click", pageNextPeople);

async function fetchPlanets() {
  document.querySelector('.loader').classList.add('active');
  let results = await fetch(URL_Planets);
  const data = await results.json();

  nextPlanets = data.next;
  previousPlanets = data.previous;
  let planetPromises = data.results.map(async planet => {
    return await fetch(planet.url)
      .then(res => res.json())
      .then(data => data.result.properties);
  })
  const planets = await Promise.all(planetPromises);
  let cards = ' ';
  document.querySelector('.loader').classList.remove('active');
  planets.forEach(item =>  {
    cards += `<div class="card card-planet">
                  <h2>${item.name}</h2>
                  <h5>Climate: ${item.climate}</h5>
                  <h5>Terrain: ${item.terrain}</h5>
                  <h5>Population: ${item.population}</h5>
               </div>`
  })
  container.innerHTML = cards;
}

function pageNextPlanets() {
  if(nextPlanets) {
    URL_Planets = new URL(nextPlanets);
  }
  fetchPlanets()
    .then(response => {
    console.log('Success: Planets');
  })
    .catch(error => {
    console.log('error! ', error);
  });
}

function pagePreviousPlanets() {
  if(previousPlanets) {
    URL_Planets = new URL(previousPlanets);
  }
  fetchPlanets()
    .then(response => {
    console.log('Success: Planets');
  })
    .catch(error => {
    console.log('error! ', error);
  });
}

async function fetchPeople() {
  document.querySelector('.loader').classList.add('active');
  let results = await fetch(URL_People);
  const data = await results.json();

  nextPeople = data.next;
  previousPeople = data.previous;
  let peoplePromises = data.results.map(async people => {
    return await fetch(people.url)
      .then(res => res.json())
      .then(data => data.result.properties);
  })
  const people = await Promise.all(peoplePromises);
  let cards = ' ';
  document.querySelector('.loader').classList.remove('active');
  people.forEach(item => {
    cards += `<div class="card card-people">
                  <h2>${item.name}</h2>
                  <h5>Gender: ${item.gender}</h5>
                  <h5>Birth Year: ${item.birth_year}</h5>
                  <h5>Height: ${item.height}</h5>
                  <h5>Hair Color: ${item.hair_color}</h5>
                  <h5>Skin Color: ${item.skin_color}</h5>
                  <h5>Eye Color: ${item.eye_color}</h5>
               </div>`
  })
  container.innerHTML = cards;
}

function pageNextPeople() {
  if(nextPeople) {
    URL_People = new URL(nextPeople);
  }
  fetchPeople()
    .then(response => {
    console.log('Success: People');
  })
    .catch(error => {
    console.log('error! ', error);
  });
}

function pagePreviousPeople() {
  if(previousPeople) {
    URL_People = new URL(previousPeople);
  }
  fetchPeople()
    .then(response => {
    console.log('Success: People');
  })
    .catch(error => {
    console.log('error! ', error);
  });
}