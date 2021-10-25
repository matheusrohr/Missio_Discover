const express = require('express')

const route = express.Router()

const QuestionControoler = require('./controllers/QuestionController')

const RoomController = require('./controllers/RoomController')

route.get('/', (req, res) => res.render("index", {page: 'enter-room'}))

route.get('/creat-pass', (req, res) => res.render("index", {page: 'creat-pass'}))

route.post("/create-room", RoomController.create)
route.get('/room/:room', RoomController.open)
route.post('/enterRoom', RoomController.enter)

route.post('/question/create/:room', QuestionControoler.create)
route.post('/question/:room/:question/:action', QuestionControoler.index)

module.exports = route