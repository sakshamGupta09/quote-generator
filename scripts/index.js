// State
const quote = {
  text: "",
  author: "",
};

// constants
const API_URL = "https://api.api-ninjas.com/v1/quotes/?";
const API_KEY = "XY0hNGAA+lIXDEIhH2+5Rw==KjtRN7sRwManCtot";
const themeLabels = {
  dark: "Dark theme",
  light: "Light theme",
};

// Dom Elements
const themeSwitchCheckboxElement = document.getElementById("theme-switch");
const themeTypeTextElement = document.getElementById("theme-type");
const themeIconElement = document.getElementById("theme-icon");
const quoteContainerElement = document.getElementById("quote-container");
const quoteElement = document.getElementById("quote-text");
const authorNameElement = document.getElementById("quote-author");
const newQuoteButton = document.getElementById("new-quote");
const loaderElement = document.getElementById("loader");

// Event listeners
themeSwitchCheckboxElement.addEventListener("change", onThemeChange);
newQuoteButton.addEventListener("click", fetchQuote);

// Functions
function onThemeChange(e) {
  setTheme(e.target.checked);
}

function setTheme(isDarkMode) {
  const label = isDarkMode ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", label);
  themeTypeTextElement.textContent = themeLabels[label];
  themeSwitchCheckboxElement.checked = isDarkMode;
  if (isDarkMode) {
    themeIconElement.classList.replace("fa-sun", "fa-moon");
  } else {
    themeIconElement.classList.replace("fa-moon", "fa-sun");
  }
}

async function fetchQuote() {
  showLoader();
  try {
    const payload = getFetchQuotePayload();
    const response = await fetch(API_URL + payload.query, {
      headers: payload.headers,
    });
    const data = await response.json();
    data && setQuote(data);
  } catch (error) {
    console.error(error);
  } finally {
    hideLoader();
  }
}

function getFetchQuotePayload() {
  const headers = {
    "X-Api-Key": API_KEY,
  };
  const query = new URLSearchParams({
    limit: 1,
    category: "success",
  }).toString();

  return { headers, query };
}

function setQuote(data) {
  quote.text = data[0].quote;
  quote.author = data[0].author;
  renderQuote();
}

function renderQuote() {
  quoteElement.textContent = quote.text;
  authorNameElement.textContent = quote.author;
}

function showLoader() {
  quoteContainerElement.hidden = true;
  loaderElement.hidden = false;
}

function hideLoader() {
  quoteContainerElement.hidden = false;
  loaderElement.hidden = true;
}

function getPreferredColourScheme() {
  let isDarkMode = false;
  if (window?.matchMedia("(prefers-color-scheme: dark)")?.matches) {
    isDarkMode = true;
  }
  setTheme(isDarkMode);
}

// on load
fetchQuote();
getPreferredColourScheme();
