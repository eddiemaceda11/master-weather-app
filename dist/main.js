const search = document.querySelector("#search");
const tempIcon = document.querySelector(".span");
tempIcon.classList.add("span");

// listen for user search input
search.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    let location = search.value;
    console.log(location);
    try {
      // get user location info
      const getLocation = async (val) => {
        val = [];
        val.push(location);
        console.log(val);
        const response = await fetch(
          `http://api.openweathermap.org/geo/1.0/direct?q=${val[0]},${val[1]}&limit=1&appid=94c00620a61593a9111c00344c194a3a`
        );
        const data = await response.json();
        console.log(data);

        return {
          lat: data[0].lat,
          lon: data[0].lon,
          city: data[0].name,
          state: data[0].state,
        };
      };

      // store return value from getLocation
      // function into variable for use
      let coords = await getLocation(location);
      console.log(coords);

      let latitude = coords.lat;
      let longitude = coords.lon;
      // let city = coords.name;
      // console.log(city);
      let state = coords.state;

      // get weather info from user location
      const getWeather = async () => {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=94c00620a61593a9111c00344c194a3a`
        );
        const data = await response.json();
        console.log(data);
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
      let date = new Date(weather.dt * 1000);
      let temp = weather.temp; //convert from K
      let feelsLike = weather.feelsLike; //convert from K
      let speed = weather.speed;
      let humidity = weather.humidity;

      // display weather on webpage
      const displayWeather = async () => {
        // output weather description to webpage
        const descText = document.querySelector(".description");
        // loop through each desc word to make the first letter of each word uppercase
        let words = desc.split(" ");
        for (let i = 0; i < words.length; i++) {
          words[i] =
            words[i][0].toUpperCase() + words[i].slice(1).toLowerCase();
        }
        words.join(" ");
        descText.textContent = words.join(" ");

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
