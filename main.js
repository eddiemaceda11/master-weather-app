const search = document.querySelector("#search");
const tempIcon = document.querySelector(".span");
tempIcon.classList.add("span");
const checkbox = document.getElementById("checkbox");
const formBtn = document.querySelector(".form-btn");

// listen for user search input on icon click
formBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  // store user input into a variable
  let location = search.value;
  console.log(location);
  try {
    // get user input location info using geolocation
    const getLocation = async (val) => {
      val = [];
      val.push(location);
      const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${val[0]},${val[1]}&limit=1&appid=94c00620a61593a9111c00344c194a3a`);
      const data = await response.json();

      return {
        lat: data[0].lat,
        lon: data[0].lon,
        state: data[0].state,
      };
    };

    // store return value(s) from getLocation
    // function into variable for use
    let coords = await getLocation(location);

    let latitude = coords.lat;
    let longitude = coords.lon;
    let state = coords.state;

    // get weather info using lat and
    // long values from getLocation()
    const getWeather = async () => {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=94c00620a61593a9111c00344c194a3a`);
      const data = await response.json();

      return {
        desc: data.weather[0].description,
        name: data.name,
        dt: data.dt,
        temp: data.main.temp,
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        speed: data.wind.speed,
      };
    };

    // store return value from getWeather
    // function into variable for use
    let weather = await getWeather();

    let desc = weather.desc;
    let name = weather.name;
    // let date = new Date(weather.dt * 1000);
    let temp = weather.temp; //convert from K
    let feelsLike = weather.feelsLike; //convert from K
    let speed = weather.speed;
    let humidity = weather.humidity;

    // display weather on webpage
    const displayWeather = async () => {
      // output weather description to webpage
      const descText = document.querySelector("#desc-text");
      // loop through each desc word to make the first letter of each word uppercase
      let words = desc.split(" ");
      for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].slice(1).toLowerCase();
      }

      descText.textContent = words.join(" ");

      // add weather icon next to weather desc
      let icon = await getWeatherIcon(descText.textContent);
      const iconDisplay = document.querySelector("#weather-img");
      iconDisplay.src = "";
      iconDisplay.src = icon;

      // display location to the webpage
      const nameText = document.querySelector(".location");
      nameText.textContent = `${name}, ${state}`;

      // display current temp to the webpage
      const tempText = document.querySelector(".temperature");
      const tempFarenheit = (temp - 273.15) * (9 / 5) + 32;
      tempText.textContent = `${tempFarenheit.toFixed(0)}`;

      // display "feels-like" temp
      const feelsLikeText = document.getElementById("feels-like");
      const feelsLikeTemp = (feelsLike - 273.15) * (9 / 5) + 32;
      feelsLikeText.textContent = feelsLikeTemp.toFixed(0);

      // display wind speed
      const windSpeedText = document.getElementById("wind");
      windSpeedText.textContent = speed.toFixed(0);

      // display humidity
      const humidityText = document.getElementById("humidity");
      humidityText.textContent = humidity;
    };
    await displayWeather();
  } catch {
    console.log("Location not found");
  } finally {
  }
});

checkbox.addEventListener("change", () => {
  // change theme of website on toggle
  if (document.body.classList.contains("light")) {
    document.body.classList.remove("light");
    document.body.classList.add("dark");
  } else if (document.body.classList.contains("dark")) {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
  }
});

// https://openweathermap.org/img/wn/01n.png --clear sky
// https://openweathermap.org/img/wn/02n.png --few clouds
// https://openweathermap.org/img/wn/03n.png --scattered clouds
// https://openweathermap.org/img/wn/04n.png --broken clouds
// https://openweathermap.org/img/wn/09n.png --shower rain
// https://openweathermap.org/img/wn/10n.png --rain
// https://openweathermap.org/img/wn/11n.png --thunderstorm
// https://openweathermap.org/img/wn/50n.png --mist

const getWeatherIcon = (value) => {
  let image;

  if (value === "Clear Sky") {
    image = "https://openweathermap.org/img/wn/01n.png";
  }
  if (value === "Few Clouds") {
    image = "https://openweathermap.org/img/wn/02n.png";
  }
  if (value === "Scattered Clouds") {
    image = "https://openweathermap.org/img/wn/03n.png";
  }
  if (value === "Broken Clouds" || value === "Overcast Clouds") {
    image = "https://openweathermap.org/img/wn/04n.png";
  }
  if (value === "Shower Rain") {
    image = "https://openweathermap.org/img/wn/09n.png";
  }
  if (value === "Rain") {
    image = "https://openweathermap.org/img/wn/10n.png";
  }
  if (value === "Thunderstorm") {
    image = "https://openweathermap.org/img/wn/11n.png";
  }
  if (value === "Mist") {
    image = "https://openweathermap.org/img/wn/50n.png";
  }
  return image;
};

// listen for user search input on enter keypress
search.addEventListener("keypress", async (e) => {
  // If user presses Enter, run function
  if (e.key === "Enter") {
    e.preventDefault();
    // store user input into a variable
    let location = search.value;
    console.log(location);
    try {
      // get user input location info using geolocation
      const getLocation = async (val) => {
        val = [];
        val.push(location);
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${val[0]},${val[1]}&limit=1&appid=94c00620a61593a9111c00344c194a3a`);
        const data = await response.json();

        return {
          lat: data[0].lat,
          lon: data[0].lon,
          state: data[0].state,
        };
      };

      // store return value(s) from getLocation
      // function into variable for use
      let coords = await getLocation(location);

      let latitude = coords.lat;
      let longitude = coords.lon;
      let state = coords.state;

      // get weather info using lat and
      // long values from getLocation()
      const getWeather = async () => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=94c00620a61593a9111c00344c194a3a`);
        const data = await response.json();

        return {
          desc: data.weather[0].description,
          name: data.name,
          dt: data.dt,
          temp: data.main.temp,
          feelsLike: data.main.feels_like,
          humidity: data.main.humidity,
          speed: data.wind.speed,
        };
      };

      // store return value from getWeather
      // function into variable for use
      let weather = await getWeather();

      let desc = weather.desc;
      let name = weather.name;
      // let date = new Date(weather.dt * 1000);
      let temp = weather.temp; //convert from K
      let feelsLike = weather.feelsLike; //convert from K
      let speed = weather.speed;
      let humidity = weather.humidity;

      // display weather on webpage
      const displayWeather = async () => {
        // output weather description to webpage
        const descText = document.querySelector("#desc-text");
        // loop through each desc word to make the first letter of each word uppercase
        let words = desc.split(" ");
        for (let i = 0; i < words.length; i++) {
          words[i] = words[i][0].toUpperCase() + words[i].slice(1).toLowerCase();
        }

        descText.textContent = words.join(" ");

        // add weather icon next to weather desc
        let icon = await getWeatherIcon(descText.textContent);
        const iconDisplay = document.querySelector("#weather-img");
        iconDisplay.src = "";
        iconDisplay.src = icon;

        // display location to the webpage
        const nameText = document.querySelector(".location");
        nameText.textContent = `${name}, ${state}`;

        // display current temp to the webpage
        const tempText = document.querySelector(".temperature");
        const tempFarenheit = (temp - 273.15) * (9 / 5) + 32;
        tempText.textContent = `${tempFarenheit.toFixed(0)}`;

        // display "feels-like" temp
        const feelsLikeText = document.getElementById("feels-like");
        const feelsLikeTemp = (feelsLike - 273.15) * (9 / 5) + 32;
        feelsLikeText.textContent = feelsLikeTemp.toFixed(0);

        // display wind speed
        const windSpeedText = document.getElementById("wind");
        windSpeedText.textContent = speed.toFixed(0);

        // display humidity
        const humidityText = document.getElementById("humidity");
        humidityText.textContent = humidity;
      };
      await displayWeather();
    } catch {
    } finally {
    }
  }
});
