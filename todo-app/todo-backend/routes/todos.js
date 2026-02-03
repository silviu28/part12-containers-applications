const express = require('express');
const { Todo } = require('../mongo');
const { getAsync, setAsync } = require('../redis');
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })

  // Increment addedCount (parse to int to not concatenate with string)
  const addedCount = parseInt(
    await getAsync('added_todos') || 0
  )
  await setAsync('added_todos', addedCount + 1)
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/:id', async (req, res) => {
  const id = req.params.id
  const todo = await Todo.findById(id)

  if (!todo)
    return res.status(404)
  res.send(todo)
});

/* PUT todo. */
singleRouter.put('/:id', async (req, res) => {
  const id = req.params.id
  const todo = req.body

  const updatedTodo = await Todo.findById(todo.id)
  
  if (!updatedTodo)
    return res.status(404)

  updatedTodo = { ... todo }
  await updatedTodo.save()
  res.sendStatus(200)
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
