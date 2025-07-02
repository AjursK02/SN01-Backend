console.log("starting a new project")

const express = require("express")

const app = express();



app.use('/hello', (req, res)=>{
    res.send("hello hello hello hello hello")
})

app.use('/test', (req, res)=>{
    res.send("hello from the test server")
})

app.use('/', (req, res)=>{
    res.send("hello from the server......")
})

app.listen(3000, ()=>{
    console.log("server is successfully listening on port 3000...")
});