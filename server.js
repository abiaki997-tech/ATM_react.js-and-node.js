const express = require('express')
const connectDB = require('./config/db')
const app = express()



connectDB()


app.use(express.json())



app.use('/login',require('./routes/login/login'))
app.use('/account',require('./routes/account/account-rout'))




const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server started at port ${PORT}`))