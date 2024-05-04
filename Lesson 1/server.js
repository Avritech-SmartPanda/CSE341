const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("Hello Daphne!");
});
const PORT = 3000;
app.listen(process.env.PORT || PORT, () => {
    console.log('Web Server is listening at port ' + (process.env.PORT || PORT));
});