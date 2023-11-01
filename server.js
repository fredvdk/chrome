const express = require('express')
const radio = require("./radio");
const app = express()
const port = 3000

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.post('/play', (req, res) => {
    console.log(req.body.channel);
    console.log(req.body.room);
    console.log(req.body.volume);
    radio.play(req.body.room, req.body.channel, req.body.volume);
    res.redirect('/');
})

//app.post('/volume', (req,res)=>{
    // console.log("Keuken volume :" + req.body.volumeKeuken);
    // console.log("Living volume :" + req.body.volumeLiving);
    // //radio.setVolume('Keuken', req.body.volume);
    // radio.setVolume('Keuken', req.body.volumeKeuken);
    // radio.setVolume('Living', req.body.volumeLiving);
    // res.redirect('/');
//})

app.get('/info', (req, res)=>{
    //res.send(radio.getInfoOnDevices());
   // console.log({Keuken: radio.getVolume('Keuken'), Living: radio.getVolume("Living")});
    res.send("test");
})

// app.get('/stop', (req,res)=>{
//     res.send(radio.stopAll());
// })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



