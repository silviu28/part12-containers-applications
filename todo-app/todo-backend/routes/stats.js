const { getAsync } = require('../redis')
const express = require('express')

const statsRouter = express.Router()

statsRouter.get('/', async (_, res) => {
  // Stored value is a string, parse to int beforehand
  const added_todos = parseInt(
    await getAsync('added_todos') || 0
  )

  res.json({ added_todos })
})

module.exports = statsRouter