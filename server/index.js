const express = require("express");
const cors = require("cors");
const fs = require('fs');
const request = require('request');
const bp = require('body-parser');


const PORT = process.env.PORT || 4000;
const app = express();
const corsOptions = { origin: '*'}
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.use(cors(corsOptions))
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.post("/image", (req, res) => {
    var id = req.originalUrl;
    const img = req.body.image;
    console.log(img);
    request(`http://127.0.0.1:5000/conv?img=${img}` , function (error, response, body){
        console.error('error:', error); // Print the error
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the data received
    })
    const base64 = fs.readFileSync("../conv/img/convert.jpg", "base64");
    res.send(base64);
    console.log(id);
});


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});




