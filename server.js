const express = require('express')
const cors = require('cors')
const cookieSession = require('cookie-session')

const app = express()

app.use(cors())
/*
 *app.use(
 *cors({
 *credentials: true,
 *origin: ["https//localhost: 8080"]
 *})
 *)
*/

app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use(
    cookieSession({
        name: "Joseph-session",
        key: ["COOKIE-SECRET"],
        httpOnly: true,
        sameSite: 'strict'
    })
)

const db = require('./app/models')
const Role = db.Role

db.sequelize.sync()

app.get("/", (req, res) => {
    res.json({message: "Welcome to Note Taking App!"})
})

require('./app/routes/auth.routes')(app)
require('./app/routes/user.routes')

const PORT = process.env.PORT || 8081 
app.listen(PORT, ()=> {
    console.log(`Server running at on port ${PORT}`)
})

// Roles (Optional... Not needed for the assessment)
function initial() {
    Role.create({
        id: 1,
        name: 'user'
    }),
    Role.create({
        id: 2,
        name: "moderator"
    }),
    Role.create({
        id: 3,
        name: "admin"
    })
}