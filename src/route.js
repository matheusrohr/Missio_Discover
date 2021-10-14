const express = require('express')

const route = express.Router()

route.get('/', (req, res) => res.render("index"))

route.get('/room', (req, res) => res.render("room"))

route.get('/creat-pass', (req, res) => res.render("creat-pass"))

module.exports = route