const express = require("express");
const app = express();
const pool = require("./db");
const PORT = 3000;

app.use(express.json());

// get all todos

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.log(error);
  }
});

// get specific todo

app.get("/todos/:id", async (req, res) => {
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
});

// Update todo

app.put("/todos/:id", async (req, res) => {
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
});
// Delete todo
app.delete("/todos/:id", async (req, res) => {
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
});

// create todo

app.post("/todos", async (req, res) => {
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
});

app.listen(PORT, () => {
  console.log(`Listening to the port ${PORT}`);
});
