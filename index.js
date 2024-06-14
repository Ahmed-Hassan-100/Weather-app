const apiKey = "ad2d89af4c2d4a7695a234624241306" ;
// Define an async function to search for weather data
async function search(query) {
    // Fetch weather data from the API with the provided query
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query}&days=3`);
    
    // Check if the response is okay and the status is not 400
    if (response.ok && response.status !== 400) {
        // Parse the response as JSON
        let data = await response.json();
        // Display the current weather and forecast
        displayCurrent(data.location, data.current);
        displayAnother(data.forecast.forecastday);
    }
}

// Add an event listener to the search input field for keyup event
document.getElementById("search").addEventListener("keyup", (event) => {
    search(event.target.value);
});

// Define arrays for days of the week and month names
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Function to display the current weather
function displayCurrent(location, current) {
    if (current != null) {
        // Parse the last updated date
        var updatedDate = new Date(current.last_updated.replace(" ", "T"));
        // Create the HTML content for current weather
        let currentWeatherHtml = `
            <div class="today forecast">
                <div class="forecast-header" id="today">
                    <div class="day">${days[updatedDate.getDay()]}</div>
                    <div class="date">${updatedDate.getDate()} ${monthNames[updatedDate.getMonth()]}</div>
                </div>
                <div class="forecast-content" id="current">
                    <div class="location">${location.name}</div>
                    <div class="degree">
                        <div class="num">${current.temp_c}<sup>o</sup>C</div>
                        <div class="forecast-icon">
                            <img src="https:${current.condition.icon}" alt="" width="90">
                        </div>
                    </div>
                    <div class="custom">${current.condition.text}</div>
                    <span><img src="images/icon-umberella.png" alt="">20%</span>
                    <span><img src="images/icon-wind.png" alt="">18km/h</span>
                    <span><img src="images/icon-compass.png" alt="">East</span>
                </div>
            </div>`;
        // Insert the current weather HTML into the forecast element
        document.getElementById("forecast").innerHTML = currentWeatherHtml;
    }
}

// Function to display the weather forecast for upcoming days
function displayAnother(forecastDays) {
    let forecastHtml = "";
    for (let i = 1; i < forecastDays.length; i++) {
        let dayForecast = forecastDays[i];
        let forecastDate = new Date(dayForecast.date.replace(" ", "T"));
        forecastHtml += `
            <div class="forecast">
                <div class="forecast-header">
                    <div class="day">${days[forecastDate.getDay()]}</div>
                </div>
                <div class="forecast-content">
                    <div class="forecast-icon">
                        <img src="https:${dayForecast.day.condition.icon}" alt="" width="48">
                    </div>
                    <div class="degree">${dayForecast.day.maxtemp_c}<sup>o</sup>C</div>
                    <small>${dayForecast.day.mintemp_c}<sup>o</sup></small>
                    <div class="custom">${dayForecast.day.condition.text}</div>
                </div>
            </div>`;
    }
    // Append the forecast HTML to the forecast element
    document.getElementById("forecast").innerHTML += forecastHtml;
}

// Initial search to display weather for London
search("London");
