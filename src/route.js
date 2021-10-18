const express = require('express')

const route = express.Router()

const QuestionControoler = require('./controllers/QuestionController')

const RoomController = require('./controllers/RoomController')

route.get('/', (req, res) => res.render("index", {page: 'enter-room'}))

route.get('/creat-pass', (req, res) => res.render("index", {page: 'creat-pass'}))

route.get('/room/:room', (req, res) => res.render("room"))


route.post('/question/:room/:question/:action', QuestionControoler.index)
route.post("/create-room", RoomController.create)

module.exports = route