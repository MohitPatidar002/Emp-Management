const express = require("express");
const DbConnect  = require("./config/DbConnect");
const app = express();
require("dotenv").config();
const cors = require("cors")

app.use(express.json());
app.use(cors('*'))

DbConnect()
.then(() => {
    app.listen(process.env.PORT || 4000, () => {
        console.log("App is running at PORT 4000")
    })
})
.catch((error) => {
    console.log("Error while connecting to the database", error);
})

const userRoute = require('./routes/user.routes.js')
const profileRoute = require('./routes/profile.routes.js')
const department = require('./routes/department.js')

app.use('/api/auth', userRoute)
app.use('/api/profile', profileRoute)
app.use('/api/department', department)

app.get('/', (req, res) => {
    res.send("Server is working...")
})