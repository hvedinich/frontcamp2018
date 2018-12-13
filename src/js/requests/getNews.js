export default ({ keywords = '', topic = 'general', callback }) => {
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
  }).catch((err) => {
    import(/* webpackChunkName: "print" */ '../errorHandler/getNewsErrorHandler').then((res) => {
      const getNewsErrorHandler = res.default.getInstance();
      getNewsErrorHandler.showErrorComponent(err);
    })
  });;
}