const getNews = ({ keywords = '', topic = 'general', callback }) => {
  const keyWo = keywords ? `q=${keywords}&` : keywords
  const topicQuery = `category=${topic}&`
  const myRequest = `https://newsapi.org/v2/top-headlines?${topicQuery}${keyWo}pageSize=20&apiKey=63950d5ff0964007b5b228950d7b79e9`
  fetch(myRequest).then(function (response) {
    return response.json();
  }).then(function (response) {
    callback(response.articles.filter(({
      urlToImage,
      title,
      description }) => urlToImage && title && description))
  });
}

const createNewComponent = ({
  urlToImage = 'https://cst.org.uk/data/image/8/e/8e3e848cbd24bdb85a7c97869ec77386.1451995352.jpg',
  title,
  description,
  author }) => {
  const news = document.createElement('div');
  news.className = "news";
  const image = document.createElement('img');
  image.setAttribute('src', urlToImage);
  image.classList.add("news-image");

  const info = document.createElement('div');
  info.classList.add("information");

  const header = document.createElement('h2');
  header.innerHTML = title;

  const descriptionElem = document.createElement('p');
  const descriptionText = description ? description.substring(0, 200) : '';
  descriptionElem.innerHTML = descriptionText;

  const authorElem = document.createElement('span');
  authorElem.innerHTML = author;

  info.appendChild(header);
  info.appendChild(descriptionElem);
  info.appendChild(authorElem);
  news.appendChild(image);
  news.appendChild(info);

  return news
}

const drawNews = (news) => {
  const newsList = document.createElement('div');
  newsList.classList.add("news-list");
  news.forEach(article => {
    newsList.appendChild(createNewComponent(article));
  })
  const domElem = document.getElementById('news-container');
  if (!news.length) {
    domElem.innerHTML = 'No news';
  } else {
    domElem.innerHTML = '';
    domElem.appendChild(newsList);
  }
}

const store = {
  topic: "",
}

const addListners = () => {
  document.getElementsByClassName('search-button')[0].addEventListener('click', (e) => {
    e.preventDefault();
    const value = document.getElementsByClassName('search-input')[0].value;
    getNews({ keywords: value, topic: store.topic, callback: drawNews }, );
  })

  document.getElementsByClassName('news-checkbox')[0].addEventListener('click', (e) => {
    store.topic = e.target.value;
  })
}

window.onload = () => {
  getNews({ callback: drawNews });
  addListners();

}