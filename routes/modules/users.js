const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

router.get('/login', (req,res) => {
  res.render('login')
})

module.exports = router