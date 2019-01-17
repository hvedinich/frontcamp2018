const express = require('express')
const bodyParser = require('body-parser');
const router = require('./routes');
const winston = require('winston');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

const app = express()
const port = 3000

app.use(require('./middleware/sendHttpError'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req,res,next)=>{
  logger.log({
    level: 'info',
    message: `${Date.now()}-${req.method}-url:${req.url}`
  });
  next();
})

app.get("/error", function (req, res) {
  throw new Error("BROKEN"); 
});

app.use('/', router);

app.use(function (err, req, res, next) {
  res.sendHttpError(err);
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))