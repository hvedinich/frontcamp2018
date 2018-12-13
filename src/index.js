import Requests from './js/requests';
import './index.css';

const store = {
  topic: "",
}

const requests = new Requests();
const proxy = new Proxy(requests, {
  get(target, prop) {
    return (method, data) => {
      console.log(`request ${method}. Args:${JSON.stringify(data)}`);
      return target[prop](method, data)
    };
  }
});


const addListners = () => {
  document.getElementsByClassName('search-button')[0].addEventListener('click', (e) => {
    e.preventDefault();
    const value = document.getElementsByClassName('search-input')[0].value;
    Promise.all([
      import(/* webpackChunkName: "print" */ './js/drawNews')
    ]).then((res) => {
      const drawNews = res[0].default;
      proxy.createRequest('get', { keywords: value, topic: store.topic, callback: drawNews }, );
    });
  })

  document.getElementsByClassName('news-checkbox')[0].addEventListener('click', (e) => {
    store.topic = e.target.value;
  })
}

window.onload = () => {
  addListners();
}