var express = require('express');
var HttpError = require('../errors/httpError').HttpError;

var router = express.Router();

let news = [
    {
        id: '1',
        text: "text text text texttexttexttexttext text text text text text "
    },
    {
        id: '2',
        text: "text text text texttexttexttexttext text text text text text "
    },
    {
        id: '3',
        text: "text text text texttexttexttexttext text text text text text "
    },
    {
        id: '4',
        text: "text text text texttexttexttexttext text text text text text "
    }

]

function getNews(id) {
    const res = news.find(e => e.id === id)
    if (!res) throw new HttpError(404, 'news not found')
    return res
}

function putNews(id, newNews) {
    const res = news.find((e) => e.id === id)

    if (!res) throw new HttpError(404, 'news not found')
    res.text = newNews.text
    return res
}

function deleteNews(id) {
    news = news.filter((e) => e.id !== id)
    if (!news) throw new HttpError(404, 'news not found')
    return news
}


router.get('/news', function (req, res) {
    res.send(news)
});
router.get('/news/:newsId', function (req, res) {
    res.send(getNews(req.params.newsId))
});

router.post('/news', function (req, res) {
    const newnews = JSON.parse(req.body.news);
    if (typeof newnews === 'object') {
        newnews.forEach(element => {
            news.push(element)
        });
    }
    res.send(news);
});

router.put('/news/:newsId', function (req, res) {
    const newnews = JSON.parse(req.body.news);
    res.send(putNews(req.params.newsId, newnews));
});

router.delete('/news/:newsId', function (req, res) {
    res.send(deleteNews(req.params.newsId));
});

module.exports = router;
