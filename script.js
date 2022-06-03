let weather = {
  apiKey: 'api-key here!!!',
  fetchWeather: function (city) {
    //fetch weather information by city of your choice from the openweathermap api
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        '&units=metric&appid=' +
        this.apiKey
    )
      .then((response) => {
        //if the response is not ok let the user know that there is no weather to display
        if (!response.ok) {
          alert('No weather found.');
          throw new Error('No weather found.');
        }
        //if the response is ok return the information
        return response.json();
      })
      //use the response information to call the displayWeather function
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    //destructure the given data and save them in variables
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    //select the elements from the dom and give them the right information
    document.querySelector('.city').innerText = 'Weather in ' + name;
    document.querySelector('.icon').src =
      'https://openweathermap.org/img/wn/' + icon + '.png';
    document.querySelector('.description').innerText = description;
    document.querySelector('.temp').innerText = temp + '°C';
    document.querySelector('.humidity').innerText =
      'Humidity: ' + humidity + '%';
    document.querySelector('.wind').innerText =
      'Wind speed: ' + speed + ' km/h';
    document.querySelector('.weather').classList.remove('loading');
    //change the background with a background searched on unsplash by the name
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  //this function calls the fetchWeater function with the name typed into the search field.
  search: function () {
    this.fetchWeather(document.querySelector('.search-bar').value);
  },
};
//adds an eventlistener to the search button and calls the search function.
document.querySelector('.search button').addEventListener('click', function () {
  weather.search();
});

//when you hit enter after typing in the search-bar field call the search function
document
  .querySelector('.search-bar')
  .addEventListener('keyup', function (event) {
    if (event.key == 'Enter') {
      weather.search();
    }
  });

//the first time search directly for the weather in Hellevoetsluis
weather.fetchWeather('Hellevoetsluis');
