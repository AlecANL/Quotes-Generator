const $quoteText = document.getElementById('quoteParagraph'),
  $authorQuote = document.getElementById('authorQuote'),
  $typeQuote = document.getElementById('typeQuote'),
  $btnRandom = document.getElementById('btn-random'),
  $loader = document.getElementById('loader');

const api = 'https://quote-garden.herokuapp.com/api/v2/quotes/random';
let loader = true;
$authorQuote.style.display = 'none';
$quoteText.style.display = 'none';
$typeQuote.style.display = 'none';

async function getRandomQuote() {
  const fetchQuote = await fetch(api);
  const getQuote = await fetchQuote.json();
  return getQuote.quote;
}

async function renderDOM() {
  const quote = await getRandomQuote();
  $loader.style.display = 'none';
  $quoteText.innerText = quote.quoteText;
  $authorQuote.innerText = quote.quoteAuthor;
  $authorQuote.style.display = 'block';
  $quoteText.style.display = 'block';
  $typeQuote.style.display = 'block';
}
function getQuote() {
  $loader.style.display = 'block';
  $authorQuote.style.display = 'none';
  $quoteText.style.display = 'none';
  $typeQuote.style.display = 'none';
  renderDOM();
}

$btnRandom.addEventListener('click', getQuote);
renderDOM();
