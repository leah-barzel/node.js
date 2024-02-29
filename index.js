import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import crypto from 'crypto'
import jwt from "jsonwebtoken";
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://leahbarzel:<password>@cluster0.u0pl2v1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";



import TasksController from "./Controllers/TasksController.js";
import TasksRouter from './Routers/TasksRouter.js';



const app = express()
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.text())
app.use('/tasks' , TasksRouter) 

const port = 3000

//Middleware
const logMiddleware = (req, res, next) =>{
  req.UUID = crypto.randomUUID();
  console.log(`request ${req.UUID} started.`);
  next();
};

app.get('/', logMiddleware ,(req, res) => {
  res.send('Hello World! - is node.js')
})

/**
app.get('/hello', (req,res)=>{
  res.send('hello')
})


app.use("/", (req, res, next) => {
  req.UUID = crypto.randomUUID();
  console.log(`request ${req.UUID} started.`);
  next();
}); */


//jwt

const secret = "secret???!@#$%^&*()";
const token = jwt.sign({ userId: 1, roles: ["user"] }, secret);

try {
  const decoded = jwt.verify(token, secret);
} catch {
  console.log('JWT is not valid');
}

app.post("/login", (req, res) => {
  if (req.body.userName == "leahbarzel" && req.body.password == "123456") {
    const token = jwt.sign(
      { userId: 1, userName: "leahbarzel", roles: ["user"] }, secret);
    res.send({ accessToken: token });
  } else {
    res.status(401).send({ message: "unauthorized!!!" });
  }
});

app.use("/", (req, res, next) => {
  const token = req.headers.authorization.slice(7);
  console.log("token", token);
  try {
    const decoded = jwt.verify(token, secret);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).send({ message: "unauthorized" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})

  app.get("/tasks",TasksController.getList);

  app.get("/tasks/:id",TasksController.getById);

  app.post("/tasks/",TasksController.add)
  
  app.put("/tasks/:id",TasksController.update)
  
  app.delete("/tasks/:id",TasksController.delete)
  