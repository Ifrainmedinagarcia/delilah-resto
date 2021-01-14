const express = require('express')
const helmet = require('helmet')
const PORT = 3000

const app = express()

app.get('/', (req, res)=>{
    res.send('Hello WORLD')
})

app.listen(PORT, () =>{
    console.log(`Server estarted in the PORT ${PORT}`);
})
