import express from 'express';
import cors from "cors";


const app = express()
app.use(cors());

const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World! - is node.js')
})

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})

app.get("/tasks", (req, res) => {
    res.send([
      { id: 1, name: "task 1", status: "TODO" },
      { id: 2, name: "task 2", status: "Done" },
    ]);
  });

  app.get("/tasks/:id",(req,res)=>{
    res.send("get task by id");
  })
  
  app.post("/tasks/",(req,res)=>{
    res.send("add a new task");
  })
  
  app.put("/tasks/:id",(req,res)=>{
    res.send("update a task");
  })
  
  app.delete("/tasks/:id",(req,res)=>{
    res.send("delete a task");
  })
  