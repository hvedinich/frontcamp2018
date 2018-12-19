export default ({
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