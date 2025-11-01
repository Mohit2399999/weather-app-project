// --- 1. GET ALL HTML ELEMENTS WE NEED TO WORK WITH ---
const form = document.querySelector("nav form");
const searchInput = document.querySelector(".search_area");
const tempElement = document.querySelector(".temp p");
const locationElement = document.querySelector(".time_location p:first-child");
const dateTimeElement = document.querySelector(".time_location p:last-child");
const conditionElement = document.querySelector(".Condition p:last-child");

// --- 2. API DETAILS (USING YOUR KEY) ---
// Your API key from WeatherAPI.com
const apiKey = "28eb6175f51d4c28b38181141250111";
// The base URL for the API
const apiUrl = "http://api.weatherapi.com/v1/current.json";

// --- 3. ADD EVENT LISTENER FOR THE FORM ---
form.addEventListener("submit", (event) => {
    // Stop the page from reloading
    event.preventDefault(); 
    
    // Get the city name from the input field
    const city = searchInput.value;

    // If the input is not empty, fetch the weather
    if (city) {
        fetchWeather(city);
    }

    // Clear the input field
    searchInput.value = "";
});

// --- 4. THE MAIN FUNCTION TO FETCH WEATHER DATA ---
async function fetchWeather(city) {
    try {
        // Build the URL with your key and the city the user typed
        const response = await fetch(`${apiUrl}?key=${apiKey}&q=${city}&aqi=no`);

        if (!response.ok) {
            throw new Error("City not found");
        }

        // Convert the response to a JSON object
        const data = await response.json();

        // Log the data to the console to see what we got
        console.log(data);

        // Call our function to update the HTML
        updateUI(data);

    } catch (error) {
        console.error("Error fetching weather:", error);
        alert("Could not find weather for that city. Please try again.");
    }
}

// --- 5. FUNCTION TO UPDATE THE HTML (USER INTERFACE) ---
// This function is now written specifically for the WeatherAPI.com response
function updateUI(data) {
    
    // --- Parse data from the JSON response ---
    // (e.g., data.current.temp_c)
    const temp = Math.round(data.current.temp_c);
    const location = data.location.name;
    const country = data.location.country;
    const condition = data.current.condition.text;

    // The API gives us the exact local time for the city!
    const localTime = data.location.localtime; // This looks like "2025-11-02 0:15"
    
    // We need to split the date and time
    const [date, time] = localTime.split(' ');
    
    // Get the full weekday name (e.g., "Sunday") from the date
    const weekday = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });

    // --- Update the HTML elements ---
    tempElement.textContent = `${temp}°C`;
    locationElement.textContent = `${location}, ${country}`;
    dateTimeElement.textContent = `${time} - ${weekday} ${date}`;
    conditionElement.textContent = condition;
}

// --- 6. LOAD A DEFAULT CITY ON STARTUP ---
// This will run the code for "Nagpur" as soon as the page loads
fetchWeather("Nagpur");