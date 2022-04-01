require("dotenv").config()

const express = require("express")
const cors = require("cors")
const cookieSession = require("cookie-session")
const bodyParser = require("body-parser")
const app = express()
const mongoose = require("mongoose")
mongoose.Promise = global.Promise

// Connect to Mongodb
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on("error", (error) => console.error(error))
db.once("open", () => console.log("Connected to Database"))

// Import Controller
const errorController = require("./controllers/error")

//Let our server accept json
app.use(express.json())

//Parse body
//app.use(bodyParser.urlencoded({extended: false}))
//Parse json inside request body
app.use(bodyParser.json())

//Avoid CORS Errors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
})

const usersRouter = require("./routes/users")
app.use("/users", usersRouter)

const productsRouter = require("./routes/products")
app.use("/products", productsRouter)

// const transactionsRouter = require("./routes/transactions")
// app.use("/transactions", transactionsRouter)

// const chatsRouter = require("./routes/chats")
// app.use("/chats", chatsRouter)

// Return 404 Not Found if no middleware handles that req
// app.use(errorController.get404)

// Allow cross-origin resource sharing
app.use(cors())
// set user session data within cookie
app.use(
    cookieSession({
        name: "CUEx-session",
        // key:['key1, 'key2'],
        secret: "COOKIE-SECRET",
        httpOnly: true
    })
)

require('./routes/auth')(app)
require('./routes/userAuth')(app)

app.listen(3000, () => console.log('Server Started'))

