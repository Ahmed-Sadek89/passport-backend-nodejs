const express = require('express');
const app = express();


app.get('/', (req, res) => {
    res.send('<h1>hello in backend</h1><h2>copywrite ahmed sadek</h2>')
})

const port = process.env.PORT || 4000;
app.listen(port, () => console.log('SERVER IS WORKED ON PORT ', port) )