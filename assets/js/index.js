'use strict';

const $quote = document.getElementById('quote'),
  $author = document.getElementById('author'),
  $typeQuote = document.getElementById('type'),
  $quoteContainer = document.getElementById('quote-container'),
  $allQuotes = document.getElementById('allquotes-container'),
  $loader = document.getElementById('loader'),
  $btnRandom = document.getElementById('btn-random'),
  $btnClose = document.getElementById('btn-close'),
  $btnAuthorSection = document.getElementById('btn-author-section'),
  $modal = document.getElementById('modal');

let isLoader = true;
let author = undefined;
$quoteContainer.style.display = 'none';

const api = 'https://quote-garden.herokuapp.com/api/v3/quotes/random';
/**
 *
 * Request Data to API
 */

/**
 *
 * @param {*} urlAPI
 */
async function getRandomQuote(urlAPI) {
  const fetchQuote = await fetch(urlAPI);
  const getQuote = await fetchQuote.json();
  return getQuote;
}

/**
 *
 * @param {*} limit
 */
async function getQuoteByAuthor(limit = 10) {
  isLoader = false;
  const apiByAuthor = `https://quote-garden.herokuapp.com/api/v3/quotes?author=${author}&&limit=${limit}`;
  const response = await getRandomQuote(apiByAuthor);
  const data = response.data;
  render(data, $allQuotes);
  isVisible(isLoader);
}

/**
 * Functions to util by load components
 * @param {*} obj
 * @param {*} $container
 */
function loadComponents(obj, $container) {
  const $el = document.createElement('div');
  $el.innerHTML = cardQuoteComponent(obj);
  $container.appendChild($el.firstElementChild);
}

function getRandomQuoteByButton() {
  isLoader = true;
  isVisible(isLoader);
  renderDOM();
}

function showAllQuotes() {
  isLoader = true;
  $loader.style.display = 'block';
  showModal();
  getQuoteByAuthor();
  clearHTML($allQuotes);
}

/**
 *
 * Components
 */

async function singleCardComponent() {
  const data = await getRandomQuote(api);
  const quote = data.data[0];
  $quote.textContent = quote.quoteText;
  $author.textContent = quote.quoteAuthor;
  $typeQuote.textContent = quote.quoteGenre;
  author = quote.quoteAuthor;
  isVisible(isLoader);
}

/**
 *
 * @param {*} param0
 */
function cardQuoteComponent({ quoteText }) {
  return `<p class="quote all m-1" id="quote">${quoteText}</p>`;
}

/**
 *
 * Render Components
 */

/**
 *
 * @param {*} arr
 * @param {*} $container
 */
function render(arr, $container) {
  isLoader = false;
  if (!isLoader) {
    arr.forEach(el => loadComponents(el, $container));
  }
}

function renderDOM() {
  isLoader = false;
  if (!isLoader) {
    singleCardComponent();
  }
}

/**
 * Utils Functions
 * */

/**
 *
 * @param {*} $el
 */
function clearHTML($el) {
  while ($el.firstChild) {
    $el.removeChild($el.firstChild);
  }
}

/**
 *
 * @param {*} hasLoader
 */
function isVisible(hasLoader) {
  if (!hasLoader) {
    $loader.style.display = 'none';
    $quoteContainer.style.display = 'block';
    $allQuotes.style.display = 'block';
    return;
  }
  $loader.style.display = 'block';
  $quoteContainer.style.display = 'none';
  $allQuotes.style.display = 'none';
}

function showModal() {
  if (!$modal.classList.contains('active')) {
    $modal.classList.add('active');
    return;
  }
  $modal.classList.remove('active');
  isLoader = false;
}

function closeModal() {
  showModal();
}

renderDOM();
$btnRandom.addEventListener('click', getRandomQuoteByButton);
$btnAuthorSection.addEventListener('click', showAllQuotes);
$btnClose.addEventListener('click', closeModal);
