import { readFileSync } from "fs";
import express from "express";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("static"));

const todos = [];

const template = readFileSync("./template.html", "utf-8");
app.get("/", async (request, response) => {
  const html = template.replace(
    "<!-- todos -->",
    todos.map((todo) => `<li>${todo}</li>`).join("")
  );
  response.send(html);
});

app.post("/send", async (request, response) => {
  const newTodo = request.body.todo;
  todos.push(newTodo);
  response.redirect("/");
});

app.listen(3000);
