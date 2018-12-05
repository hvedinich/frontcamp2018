import errorComponent from './getNewsErrorComponent'

export default (err) => {
  const domElem = document.getElementById('news-container');
  domElem.innerHTML = '';
  console.error(`Can't upload news`);
  // the error will be sent to our log service
  const component = errorComponent();
  domElem.appendChild(component);
}