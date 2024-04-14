// Function to change the mode
var mode = document.getElementById("mode");
mode.addEventListener("click", function() {
  document.body.classList.toggle("dark-mode");
  if(document.body.classList.contains("dark-mode")){
    mode.src = "images/sun.png"
  } else {
    mode.src = "images/moon.png"
  }
});



 // Function to format date as "date-name of month-year"
 function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}


// Function to fetch all satellite data
function fetchAllSatelliteData() {
  return fetch(`http://localhost:3000/satellite`)
      .then(response => response.json());
}

// Function to display satellite details based on date
function displaySatelliteDetailsByDate(selectedDate) {
  // Fetch all satellite data
  fetchAllSatelliteData()
      .then(satellites => {
          // Clear previous content
          const dateList = document.getElementById("satellite-date");
          const imageSection = document.getElementById("satellite-image");
          const detailsSection = document.getElementById("satellite-details");
          dateList.innerHTML = '';
          imageSection.innerHTML = '';
          detailsSection.innerHTML = '';

          // Display date for each satellite
          satellites.forEach(satellite => {
              // Display date
              const dateItem = document.createElement("li");
              dateItem.textContent = `${formatDate(satellite.date)}`;
              dateItem.classList.add("date-item");
              dateList.appendChild(dateItem);

              // Add click event to date list item
              dateItem.addEventListener('click', () => {
                  displaySatelliteDetailsByDate(satellite.date);
              });

              // Display image and details if date matches selected date
              if (satellite.date === selectedDate) {
                  // Display image
                  const imageDiv = document.createElement("div");
                  const image = document.createElement("img");
                  image.src = satellite.image;
                  image.alt = "Satellite Image";
                  imageDiv.appendChild(image);
                  imageSection.appendChild(imageDiv);

                  // Display details
                  const detailsDiv = document.createElement("div");
                  detailsDiv.innerHTML = `
                      <h2>Satellite Imagery</h2>
                      <p>Caption: ${satellite.caption}</p>
                      <p>Distance to Earth: ${satellite['distance to earth']}</p>
                      <p>Distance to Sun: ${satellite['distance to sun']}</p>
                  `;
                  detailsSection.appendChild(detailsDiv);
              }
          });
      }); 
}

// Call function to display satellite details for the initial date when the page loads
window.onload = function() {
  // For demonstration, let's assume the initial date is '2024-04-08'
  const initialDate = '2024-04-08';
  displaySatelliteDetailsByDate(initialDate);
};



document.addEventListener('DOMContentLoaded', function() {
  // const dateLabel = document.getElementById('apod-date');
  const imageContainer = document.getElementById('apod-image');
  // const detailsContainer = document.getElementById('apod-details');
  const previousBtn = document.getElementById('previous');
  const nextBtn = document.getElementById('next');
  let currentIndex = 0;
  let apodData = [];

  // Function to display APOD details
  function displayApod(apod) {
      imageContainer.innerHTML = `<h1>Astronomy Picture of the day</h1>
        <img src="${apod.image}" alt="APOD">
          <h2>${apod.name}</h2>
          <p>${apod.description}</p>
          <h4>${formatDate(apod.date)}</h4>
      `;
  }

  // Function to update previous and next button states
  function updateButtons() {
      previousBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex === apodData.length - 1;
  }

  // Fetch APOD data from db.json
  fetch('http://localhost:3000/apod')
      .then(response => response.json())
      .then(data => {
          apodData = data;

          // Display initial APOD
          displayApod(apodData[currentIndex]);

          // Update buttons
          updateButtons();
      })
      .catch(error => console.log('Error fetching APOD data:', error));

  // Add event listener to previous button
  previousBtn.addEventListener('click', function() {
      if (currentIndex > 0) {
          currentIndex--;
          displayApod(apodData[currentIndex]);
          updateButtons();
      }
  });

  // Add event listener to next button
  nextBtn.addEventListener('click', function() {
      if (currentIndex < apodData.length - 1) {
          currentIndex++;
          displayApod(apodData[currentIndex]);
          updateButtons();
      }
  });
});



document.addEventListener('DOMContentLoaded', function() {
  const extroplanetsList = document.getElementById('extroplanets-list');
  const toggleAllButton = document.createElement('button');
  toggleAllButton.textContent = '+';
  toggleAllButton.classList.add('toggle-all-button', 'plus');
  extroplanetsList.parentNode.insertBefore(toggleAllButton, extroplanetsList.nextSibling);

  // Function to create collapsible container for each exoplanet
  function createCollapsibleContainer(exoplanet) {
      const container = document.createElement('div');
      container.classList.add('collapsible-container');

      const header = document.createElement('div');
      header.classList.add('collapsible-header');
      header.textContent = exoplanet.name;

      const buttonsContainer = document.createElement('div');
      buttonsContainer.classList.add('buttons-container');

      const plusButton = document.createElement('button');
      plusButton.classList.add('collapsible-button', 'plus');
      plusButton.textContent = '+';

      const minusButton = document.createElement('button');
      minusButton.classList.add('collapsible-button', 'minus');
      minusButton.textContent = '-';

      const content = document.createElement('div');
      content.classList.add('collapsible-content');
      content.textContent = exoplanet.description;

      buttonsContainer.appendChild(plusButton);
      buttonsContainer.appendChild(minusButton);
      header.appendChild(buttonsContainer);
      container.appendChild(header);
      container.appendChild(content);

      // Function to toggle collapsible content
      function toggleContent() {
          content.classList.toggle('active');
          plusButton.style.display = content.classList.contains('active') ? 'none' : 'inline-block';
          minusButton.style.display = content.classList.contains('active') ? 'inline-block' : 'none';
      }

      // Add click event to toggle collapsible content
      plusButton.addEventListener('click', toggleContent);
      minusButton.addEventListener('click', toggleContent);

      // Hide minus button initially
      minusButton.style.display = 'none';

      return container;
  }

  // Function to toggle all collapsible content
  function toggleAllContent() {
      const allContents = document.querySelectorAll('.collapsible-content');
      const isAllCollapsed = Array.from(allContents).every(content => !content.classList.contains('active'));
      allContents.forEach(content => {
          content.classList.toggle('active', isAllCollapsed);
      });
      const isAllCollapsedNow = Array.from(allContents).every(content => !content.classList.contains('active'));
      toggleAllButton.textContent = isAllCollapsedNow ? '+' : '-';
  }

  // Fetch exoplanet data from the endpoint
  fetch('http://localhost:3000/extroplanets')
      .then(response => response.json())
      .then(data => {
          data.forEach(exoplanet => {
              const collapsibleContainer = createCollapsibleContainer(exoplanet);
              extroplanetsList.appendChild(collapsibleContainer);
          });
      })
      .catch(error => console.error('Error fetching exoplanet data:', error));

  // Add click event to toggle all button
  toggleAllButton.addEventListener('click', toggleAllContent);
});



document.addEventListener('DOMContentLoaded', function() {
  // Function to fetch and display data for a specific endpoint
  function fetchData(endpoint, tableId) {
      fetch(`http://localhost:3000/${endpoint}`)
          .then(response => response.json())
          .then(data => {
              const table = document.getElementById(tableId);
              const tbody = table.querySelector('tbody');

              // Clear previous data
              tbody.innerHTML = '';

              // Populate table with new data
              data.forEach(entry => {
                  const row = document.createElement('tr');
                  const dateCell = document.createElement('td');
                  dateCell.textContent = entry.date;
                  const valueCell = document.createElement('td');
                  valueCell.textContent = entry.intensity || entry.magnitude; // Adjust according to the endpoint

                  row.appendChild(dateCell);
                  row.appendChild(valueCell);
                  tbody.appendChild(row);
              });
          })
          .catch(error => console.error(`Error fetching ${endpoint} data:`, error));
  }

  // Function to switch between tabs
  function openTab(event, tabName) {
      const tabcontents = document.querySelectorAll('.tabcontent');
      tabcontents.forEach(tabcontent => {
          tabcontent.classList.remove('show');
      });

      const tablinks = document.querySelectorAll('.tablinks');
      tablinks.forEach(tablink => {
          tablink.classList.remove('active');
      });

      const tabcontent = document.getElementById(tabName);
      tabcontent.classList.add('show');

      event.currentTarget.classList.add('active');
  }

  // Default to displaying solar flare data
  fetchData('solar-flare', 'solar-flare-table');

  // Event listeners for tab buttons
  const tablinks = document.querySelectorAll('.tablinks');
  tablinks.forEach(tablink => {
      tablink.addEventListener('click', function(event) {
          const tabName = this.getAttribute('data-tab');
          openTab(event, tabName);

          // Fetch data for the selected tab
          if (tabName === 'solar-flare') {
              fetchData('solar-flare', 'solar-flare-table');
          } else if (tabName === 'geomagnetic-storm') {
              fetchData('geomagnetic-storm', 'geomagnetic-storm-table');
          }
      });
  });
});
