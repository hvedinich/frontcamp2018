import './index.css'

const store = {
  topic: "",
}

const addListners = () => {
  document.getElementsByClassName('search-button')[0].addEventListener('click', (e) => {
    e.preventDefault();
    const value = document.getElementsByClassName('search-input')[0].value;
    Promise.all([
      import(/* webpackChunkName: "print" */ './js/getNews'),
      import(/* webpackChunkName: "print" */ './js/drawNews')
    ]).then((res) => {
      const getNews = res[0].default;
      const drawNews = res[1].default;
      getNews({ keywords: value, topic: store.topic, callback: drawNews }, );
    });
    // getNews({ keywords: value, topic: store.topic, callback: drawNews }, );
    // 
  })

  document.getElementsByClassName('news-checkbox')[0].addEventListener('click', (e) => {
    store.topic = e.target.value;
  })
}

window.onload = () => {
  // getNews({ callback: drawNews });
  addListners();

}