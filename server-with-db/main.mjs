import { readFileSync } from "fs";
import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("static"));

const template = readFileSync("./template.html", "utf-8");
app.get("/", async (request, response) => {
  const todos = await prisma.todo.findMany();
  const html = template.replace(
    "<!-- todos -->",
    todos.map((todo) => `<li>${todo.title}</li>`).join("")
  );
  response.send(html);
});

app.post("/send", async (request, response) => {
  const newTodo = request.body.todo;
  await prisma.todo.create({
    data: {
      title: newTodo,
    },
  });
  response.redirect("/");
});

app.listen(3000);
