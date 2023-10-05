const API_KEY = "c3811addec214bfebfa08230ba39b762";

const url = "https://newsapi.org/v2/everything?q=";
window.addEventListener("load", () => fetchNews("India"));

n = new Date();
y = n.getFullYear();
m = n.getMonth() + 1;
d = n.getDate();
document.getElementById("date").innerHTML = d + "/" + m + "/" + y;

async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  bindData(data.articles);
}
function bindData(articles) {
  const cardsContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-card");
  cardsContainer.innerHTML = "";
  articles.forEach((element) => {
    if (!element.urlToImage) return;
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, element);
    cardsContainer.appendChild(cardClone);
  });
}
function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-src");
  const newsDesc = cardClone.querySelector("#news-desc");

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;
  newsSource.href = article.url;
}
let curSelctedNav = null;

function onNavItems(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelctedNav?.classList.remove(`active`);
  curSelctedNav = navItem;
  curSelctedNav.classList.add(`active`);
}
function reload() {
  window.location.reload();
}

const searchButton = document.getElementById("search-btn");
const searchText = document.getElementById("search-txt");
searchButton.addEventListener("click", () => {
  const query = searchText.value;
  if (!query) return;
  fetchNews(query);
  curSelctedNav?.classList.remove("active");
  curSelctedNav = null;
});
