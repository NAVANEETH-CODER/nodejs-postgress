const express = require("express");
const app = express();
const todoRoutes = require("./routes/todos")
const PORT = 3000;

app.use(express.json());

app.use("/todo",todoRoutes);


app.listen(PORT, () => {
  console.log(`Listening to the port ${PORT}`);
});
