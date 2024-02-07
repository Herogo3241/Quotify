document.addEventListener('DOMContentLoaded', function () {
    
    fetch('quotes.json')
      .then(response => response.json())
      .then(data => {
        // Display a random quote
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomQuote = data[randomIndex];
  
        document.getElementById('quote-text').innerText = randomQuote.text;
        document.getElementById('quote-author').innerText = `- ${randomQuote.author}`;
      })
      .catch(error => console.error('Error fetching quotes:', error));
  });
  