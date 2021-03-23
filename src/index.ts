import {createConnection} from "typeorm";
createConnection().then(_connection => {
    
    const express = require('express')
    const bodyParser = require('body-parser')
    const cors = require('cors')
    const config = require('./config/config');
    const todo_controller = require('./controller/controller');
    const app = express();

    app.use(bodyParser.json())
    app.use(cors())
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(express.json());

    app.get("/findTodo", todo_controller.findTodo)
    app.get("/findList/:id", todo_controller.findList)
    app.put("/completedList/:idTodo/:idList", todo_controller.completedList)
    app.post("/newTodo", todo_controller.newTodo)
    app.post("/newList/:id", todo_controller.newList)
    app.delete("/removedTodo/:id", todo_controller.removedTodo)
    app.delete("/removedList/:idTodo/:idList", todo_controller.removedList)

    app.listen(process.env.PORT || config.port,
        () => console.log(`Server start on port ${config.port} ...`))
});
