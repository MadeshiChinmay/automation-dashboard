const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.options('*', cors());  // enable pre-flight

const PORT = 8081

app.use(morgan('tiny'))
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// parse application/json
app.use(express.json())

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "../automation-dashboard/build", "index.html"))
})
app.use(express.static("../automation-dashboard/build"));

app.post('/api', (req,res) => {
    console.log(req.body)
    const { exec } = require("child_process");

    exec("dir", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
    
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.send({
        "statusCode": 200,
        "payload": req.body,
        "message": "Received Body"
    })
})

app.listen(PORT, console.log('Server is running at ' + " " + PORT))

/*

OS,
Browser,
average time (Calculated)

 */