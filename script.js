// script.js
const API_KEY = config.YOUTUBE_API_KEY;

const API_URL = "https://www.googleapis.com/youtube/v3/search";

// Function to search videos
function searchVideos() {
  const query = document.getElementById("searchInput").value.trim();
  if (!query) {
    alert("Please enter a search term.");
    return;
  }

  const url = `${API_URL}?part=snippet&type=video&q=${encodeURIComponent(query)}&key=${API_KEY}&maxResults=50`;

  // Fetch data from the YouTube API
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch YouTube videos");
      }
      return response.json();
    })
    .then((data) => displayResults(data.items))
    .catch((error) => {
      console.error(error);
      alert("An error occurred while fetching videos.");
    });
}

// Function to display results
function displayResults(videos) {
  const resultsContainer = document.getElementById("resultsContainer");
  resultsContainer.innerHTML = "";

  videos.forEach((video) => {
    const videoId = video.id.videoId;
    const title = video.snippet.title;
    const description = video.snippet.description;
    const thumbnailUrl = video.snippet.thumbnails.medium.url;

    // Create result card
    const resultDiv = document.createElement("div");
    resultDiv.className = "result";
    resultDiv.onclick = (event) => playVideo(videoId);

    // Thumbnail
    const thumbnailDiv = document.createElement("div");
    thumbnailDiv.className = "thumbnail";
    const thumbnailImg = document.createElement("img");
    thumbnailImg.src = thumbnailUrl;
    thumbnailImg.alt = title;
    thumbnailDiv.appendChild(thumbnailImg);

    // Details
    const detailsDiv = document.createElement("div");
    detailsDiv.className = "result-details";

    const titleElement = document.createElement("p");
    titleElement.className = "result-title";
    titleElement.textContent = title;

    const descriptionElement = document.createElement("p");
    descriptionElement.className = "result-description";
    descriptionElement.textContent = description;

    detailsDiv.appendChild(titleElement);
    detailsDiv.appendChild(descriptionElement);

    // Combine thumbnail and details
    resultDiv.appendChild(thumbnailDiv);
    resultDiv.appendChild(detailsDiv);

    // Append to results container
    resultsContainer.appendChild(resultDiv);
  });
}

// Function to play video
function playVideo(videoId) {
  // Create iframe for video
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  iframe.frameBorder = "0";
  iframe.allow = "autoplay; encrypted-media";
  iframe.allowFullscreen = true;
  iframe.style.width = "100%";
  iframe.style.height = "300px";

  // Find the clicked card's thumbnail and replace it with the iframe
  const resultCard = event.currentTarget; // Event's target card
  const thumbnail = resultCard.querySelector(".thumbnail img");
  if (thumbnail) {
    thumbnail.replaceWith(iframe); // Replace image with iframe
  }
}


// Function to toggle Dark Mode
function toggleDarkMode() {
  const body = document.body;
  const toggleButton = document.getElementById("darkModeToggle");

  if (body.classList.contains("dark-mode")) {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    toggleButton.textContent = "Dark Mode";
  } else {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    toggleButton.textContent = "Light Mode";
  }
}
