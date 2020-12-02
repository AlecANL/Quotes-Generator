'use strict';

const $quoteText = document.getElementById('quoteParagraph'),
  $authorQuote = document.getElementById('authorQuote'),
  $typeQuote = document.getElementById('typeQuote'),
  $btnRandom = document.getElementById('btn-random'),
  $loader = document.getElementById('loader'),
  $btnAuthor = document.getElementById('btn-author'),
  $modal = document.getElementById('modal'),
  $quoteContainer = document.getElementById('quote-container'),
  $quote = document.querySelectorAll('.quote'),
  $quotesByModal = document.querySelector('.quotes'),
  $random = document.querySelector('.random'),
  $close = document.querySelector('.close');

const api = 'https://quote-garden.herokuapp.com/api/v2/quotes/random';
let loader = true;
let author = undefined;
$quoteContainer.style.display = 'none';
$btnAuthor.style.display = 'none';
$close.style.display = 'none';

async function getRandomQuote(urlAPI) {
  const fetchQuote = await fetch(urlAPI);
  const getQuote = await fetchQuote.json();
  return getQuote;
}

async function renderDOM() {
  const quote = await getRandomQuote(api);
  $loader.style.display = 'none';
  $quoteText.innerText = quote.quote.quoteText;
  $authorQuote.innerText = quote.quote.quoteAuthor;
  $typeQuote.innerText = quote.quote.quoteGenre;
  $btnAuthor.style.display = 'block';
  $quoteContainer.style.display = 'block';
  author = quote.quote.quoteAuthor;
}
function getQuoteByButton() {
  $loader.style.display = 'block';
  $btnAuthor.style.display = 'none';
  $quoteContainer.style.display = 'none';
  renderDOM();
}

function showAllQuotes() {
  $loader.style.display = 'block';
  $modal.classList.remove('hidden');
  $random.style.display = 'none';
  $close.style.display = 'block';
  $quote.forEach(a => (a.style.display = 'none'));
  getQuoteByAuthor();
}
async function getQuoteByAuthor() {
  let apiByAuthor = `https://quote-garden.herokuapp.com/api/v2/authors/${author}?page=1&limit=10`;
  const quoteByAuthor = await getRandomQuote(apiByAuthor);
  loadComponent(quoteByAuthor.quotes);
}
function component({ quoteText }) {
  return `
    <p class="quote quote-container">${quoteText}</p>
  `;
}

function loadComponent(arrayQuotes) {
  const el = document.createElement('div');
  arrayQuotes.forEach(quote => {
    const c = component(quote);
    el.innerHTML = c;
    $quotesByModal.appendChild(el.firstElementChild);
  });
  $loader.style.display = 'none';
  $quote.forEach(a => (a.style.display = 'block'));
}

$btnRandom.addEventListener('click', getQuoteByButton);
$btnAuthor.addEventListener('click', showAllQuotes);
document.addEventListener('DOMContentLoaded', () => {
  renderDOM();
});
$close.addEventListener('click', () => {
  $modal.classList.add('hidden');
  $close.style.display = 'none';
  $random.style.display = 'block';
});
