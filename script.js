const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function detectMobile() {
    return( ( window.innerWidth < 900) && ( window.innerHeight < 700) )
}

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function hideLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote From API
async function getQuote() {
    showLoadingSpinner()
    const proxyUrl = "https://gentle-harbor-09399.herokuapp.com/"
    const apiUrl = "http://quotes.stormconsultancy.co.uk/random.json";
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // If Author request returns nothing, add 'unknown'.
        if (data.author === '') {
            authorText.innerText = "Unknown";
        } else {
            authorText.innerText = data.author;
        } 
        // Reduce font-size for quotes larger than 120 characters.
        if (data.quote.length > 100) {
            quoteText.classList.remove('quote-mobile');
            quoteText.classList.add('long-quote');
        } else if (detectMobile()) {
            quoteText.classList.remove('long-quote');
            quoteText.classList.add('quote-mobile');
        } else {
            quoteText.classList.remove('quote-mobile');
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quote;
        hideLoadingSpinner();
    } catch (error) {
        getQuote()
    }
}

// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

//  Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();