const express = require('express')
const router = express.Router()
const passport = require('passport')
const Todo = require('../../models/todo')
const User = require('../../models/user')


router.get('/login', (req,res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req,res) => {
  res.render('register')
})


router.post('/register', (req,res) => {
  const {
    name, email, password, confirmPassword
  } = req.body
  User.findOne({email})
  .then(user => {
    if (user) {
      // 檢查email是否已註冊，若是，回到填寫頁面，保持輸入資訊
      console.log('Operation failed: email has been used.')
      res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
      // 若否，寫入資料庫
    } else {
      return User.create({
        name,
        email,
        password
      })
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
    }
  })
  .catch(err => console.log(err))
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

module.exports = router