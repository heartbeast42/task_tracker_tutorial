// import React from "react"; // only needed if you're going to use classes

import {BrowserRouter as Router, Route} from "react-router-dom"

import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import About from "./components/About";
// import { useLocation } from "react-router-dom";


function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  // const location = useLocation();


  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }

    getTasks();
  }, []);

  // Fetch all Tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();

    console.log(data);
    return data;
  }

  // Fetch 1 Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    console.log(data);
    return data;
  }

  // Add Task
  const addTask = async (task) => {
    const res = await fetch(
      `http://localhost:5000/tasks`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(task),
      }
    )
    const data = await res.json();

    setTasks([...tasks, data]);

    // const id = Math.floor(Math.random() * 100000) + 1; // creating id here
    // const newTask = {id, ...task};
    // setTasks([...tasks, newTask]);
  }

  // Delete Task
  const deleteTask = async (id) => {
    // console.log("delete", id);
    await fetch(
      `http://localhost:5000/tasks/${id}`,
      {
        method: "DELETE",
      }
    )
    setTasks(tasks.filter( (task) => {
      return task.id !== id;
    }));
  }

  // Toggle Reminder
  const toggleReminder = async (target_task) => {
    const taskToToggle = await fetchTask(target_task.id);
    const updTask = {
      ...taskToToggle,
      reminder: !taskToToggle.reminder
    }

    const res = await fetch(
      `http://localhost:5000/tasks/${target_task.id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(updTask),
      }
    );

    const data = await res.json()

    setTasks(tasks.map( (task) => {
      const res = (
        task.id === target_task.id ?
          {
            ...task,
            reminder: data.reminder
          }
        :
          task );
        /* ///////////////////////////////////////////////////////
        if (task.id === target_task.id) {
          console.log(`reminder for task ${res.id}: ${res.reminder}`);
        }
        // */ ///////////////////////////////////////////////////////

        return res;
    }))
  }
  
  return (
        <Router>
    <div className="container">
        <Header
        showAdd={showAddTask}
        onAdd={ () => {
          return setShowAddTask(!showAddTask);
        }}/>
        <Route path="/" exact render={(props) => {
          return (<>
            {showAddTask && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ? <Tasks
              tasks={tasks}
              onDelete={deleteTask}
              onToggle={toggleReminder}
              /> : <h4>No Tasks To Show</h4>
            }
          </>)
        }} />
        <Route path="/about" component={About} />
        {/* { location.pathname === "/"? */}
          <Footer/>
        {/* : ""} */}
      </div>
    </Router>
  )
}

export default App;
