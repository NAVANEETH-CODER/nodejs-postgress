const express = require("express");
const router = express.Router();
// const pool = require("../model/db");
const {
  specificTodo,
  updateTodos,
  deleteTodo,
  allTodos,
  addTodos,
} = require("../controller/crudController");

router
  .route("/todos")
  // allTodos
  .get(allTodos)
  // create todo
  .post(addTodos);

router
  .route("/todos/:id")
  // get specific todo
  .get(specificTodo)
  // Update todo
  .put(updateTodos)
  // Delete todo
  .delete(deleteTodo);

module.exports = router;
