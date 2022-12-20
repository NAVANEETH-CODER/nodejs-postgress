
const pool = require("../model/db");

const allTodos = async (req, res) => {
    try {
      const allTodos = await pool.query("SELECT * FROM todo");
      res.json(allTodos.rows);
    } catch (error) {
      console.log(error);
    }
  }

const specificTodo = async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
      const todos = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
        id,
      ]);
      res.json(todos.rows);
    } catch (error) {
      console.log(error);
    }
  }
const updateTodos =async (req, res) => {
    try {
      const { id } = req.params;
      const { description } = req.body;
      console.log(id);
      const updateTodos = await pool.query(
        "UPDATE todo SET description=$1 WHERE todo_id = $2",
        [description, id]
      );
      res.json(`Number of rows: ${updateTodos.rowCount}  was Updated`);
    } catch (error) {
      console.log(error.message);
    }
  }
const deleteTodo = async (req, res) => {
    try {
      const { id } = req.params;
      const deleteTodos = await pool.query(
        "DELETE FROM todo WHERE todo_id = $1",
        [id]
      );
      res.json(`Number of rows: ${deleteTodos.rowCount}  was Deleted`);
    } catch (error) {
      console.log(error.message);
    }
  }

  const addTodos = async (req, res) => {
    try {
      const { description } = req.body;
      const newTodo = await pool.query(
        "INSERT INTO todo (description) VALUES ($1) RETURNING *",
        [description]
      );
      res.json(newTodo.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }

module.exports = {addTodos,allTodos,specificTodo,updateTodos,deleteTodo};