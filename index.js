// Function to change from mode
var mode = document.getElementById("mode");
mode.addEventListener("click", function() {
  document.body.classList.toggle("dark-mode");
  if(document.body.classList.contains("dark-mode")){
    mode.src = "images/sun.png"
  } else {
    mode.src = "images/moon.png"
  }
});


// JavaScript code for fetching data from NASA APIs and dynamically populating the content

// Function to fetch real-time satellite imagery data from NASA API
function fetchSatelliteData() {
    // Fetch data from NASA API (Worldview API or Earth Imagery API)
    // Parse the response and dynamically generate HTML content
  }
  
  // Function to fetch weather & climate data from NASA API
  function fetchWeatherData() {
    // Fetch data from NASA API (Worldview API or Global Imagery Browse Services)
    // Parse the response and dynamically generate HTML content
  }
  
  // Function to fetch Astronomy Picture of the Day (APOD) data from NASA API
  function fetchAPODData() {
    // Fetch data from NASA API (APOD API)
    // Parse the response and dynamically generate HTML content
  }
  
  // Function to fetch exoplanet data from NASA API
  function fetchExoplanetData() {
    // Fetch data from NASA API (Exoplanet Archive API)
    // Parse the response and dynamically generate HTML content
  }
  
  // Call functions to fetch data and populate content when the page loads
  window.onload = function() {
    fetchSatelliteData();
    fetchWeatherData();
    fetchAPODData();
    fetchExoplanetData();
  };
  