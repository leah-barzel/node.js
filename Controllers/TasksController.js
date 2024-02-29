
const TasksController = {

    getList: (req, res) => {
      console.log(req.query.status);
      res.send([
        { id: 1, name: "task 1", status: "TODO" },
        { id: 2, name: "task 2", status: "Done" },
      ]);
    },

    getById: (req, res) => {
      res.send(`Get task with id ${taskId}`);
    },

    add: (req, res) =>{
      res.send(`post task : ${JSON.stringify(req.body)}`)
    },

    update: (req, res) =>{
      const taskId = req.params.id;
      res.send(`Task with ID ${taskId} updated`);
      //console.log(req)
    },

    delete: (req , res) => {
      const taskId = req.params.id;
      res.send(`Task with ID ${taskId} deleted`);
    }
    
  };
  

  export default TasksController;
