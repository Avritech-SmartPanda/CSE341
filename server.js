const express = require('express');
const app = express();
const router = express.Router();
const lesson1Controller = require('./controllers/lesson1');

app.get('/', (req, res) => {
    res.send("Hello Daphne!");
});

app.get('/profile', lesson1Controller.profileRoute);
router.get('/home', lesson1Controller.homeRoute);


app.use('/', router);


const PORT = 3000;
app.listen(process.env.PORT || PORT, () => {
    console.log('Web Server is listening at port ' + (process.env.PORT || PORT));
});