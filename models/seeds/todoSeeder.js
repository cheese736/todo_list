const mongoose = require('mongoose')
const Todo = require('../todo.js') // 載入 todo model

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  Todo.deleteMany({}).then(() => console.log('clear data'))
  .catch((err) => console.log(err))
  for (let i = 0; i < 10; i++) {
    Todo.create({name: `name-${i}`, isDone: false})
  }
})