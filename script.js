const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const wordInfo = document.getElementById('word-info');
const notificationPopup = document.getElementById('notification-popup');

searchButton.addEventListener('click', () => {
  const word = searchInput.value;
  if (word) {
    getWordInfo(word);
  }
});

function getWordInfo(word) {
  const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`; // Replace with the actual API URL

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const definitions = data[0].meanings;

      let html = '<h2>Definitions:</h2>';
      definitions.forEach(meaning => {
        html += `<p><strong>${meaning.partOfSpeech}</strong>: ${meaning.definitions[0].definition}</p>`;
      });

      wordInfo.innerHTML = html;
      showNotificationPopup('success', 'Word definition retrieved successfully.');
    })
    .catch(error => {
      console.error('Error:', error);
      showNotificationPopup('error', 'Failed to retrieve word definition.');
    });
}

function showNotificationPopup(type, message) {
  const popupContainer = document.createElement('div');
  popupContainer.className = `notification-popup ${type}`;
  popupContainer.innerHTML = message;

  notificationPopup.appendChild(popupContainer);

  setTimeout(() => {
    popupContainer.remove();
  }, 3000);
}
