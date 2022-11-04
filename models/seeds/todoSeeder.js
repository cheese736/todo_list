if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const bcrypt = require('bcryptjs')
const Todo = require('../todo.js') // 載入 todo model
const db = require('../../config/mogoose')
const User = require('../user')
const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}

db.once('open', () => {
  bcrypt
  .genSalt(10)
  .then(salt => bcrypt.hash(SEED_USER.password, salt))
  .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    })
  )
  .then(user => {
    console.log(user)
    const userId = user._id
    for (let i = 0; i < 10; i++) {
      Todo.create({name: `name-${i}`, userId})
    }
  })
  .then(() => {
    console.log('done')
    process.exit()
  })
})