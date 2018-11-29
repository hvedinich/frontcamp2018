import createNewComponent from './createComponent'

export default (news) => {
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