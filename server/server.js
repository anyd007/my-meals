require("dotenv").config()
const express = require("express")
const cors = require("cors")
const path = require("path")
const mongoose = require("mongoose")
const mealRouts = require("./routes/mealRouter")

const app = express()

//middleware
app.use(cors())
app.use(express.json())
app.use((req, res,next)=>{
    console.log(req.path, req.method)
    next()
})

//routes
app.use("/api/meals", mealRouts)

//podłączenie do db
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('połączenie z bazą danych udane!')
    const herokuPort = process.env.PORT || process.env.LOCAL_PORT;
    app.listen(herokuPort, ()=>{
        console.log(`działam na porcie ${herokuPort}`)
    })
})
.catch((error)=>{
    console.log('nieudane połączenie z bazdą danych')
    console.log(error.message)
})