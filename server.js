const fs = require("fs")
// const http = require("http")
const express = require("express")

const app = express();

// middleware untuk membaca json dari reques body ke kita
app.use(express.json());

// default 
app.get("/", (req,res) => {
    res.status(200).json({
        "status" : "Success", 
        "message" : "application is running..."
    })
})

app.get("/hanif", (req, res) => {
    res.status(200).json({
        "message" : "Ping Successfully !!!"
    })
})

// /api/v1/(collection) => collection harus jamak (+s)
app.get("/api/v1/cars", (req, res) => {

    res.status(200).json({
        status: "Succes",
        message : "Success get cars data",
        isSucces: true,
        totalData : cars.length,
        data : {cars}
    })
})

const cars = JSON.parse(fs.readFileSync(`${__dirname}/assets/data/cars.json`, "utf-8"));

app.post("/api/v1/cars", (req, res) => {
    // insert into

    const newCar =  req.body;

    cars.push(newCar);

    fs.writeFileSync(`${__dirname}/assets/data/cars.json`, JSON.stringify(cars), (err) => {
        res.status(201).json({
            status: "Succes",
            message : "Success get cars data",
            isSucces: true,
            data : {
                cars : newCar,
            },
        });
    });

    res.status(200).json({
        status: "Succes",
        message : "Success get cars data",
        isSucces: true,
        data : cars
    })
})

// middleware / handler untuk url yang tidak dapat diakses karena memang tidak ada diaplikasi
// membuat middleware = our own middleware
app.use((req, res, next) => {
    res.status(404).json({
        "status" : "Failed",
        "message" : "API not exist !!!"
    })
})

app.listen("3000", () => {
    console.log("Start Aplication")
})
