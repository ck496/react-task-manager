import { useState, useEffect } from "react";
import About from "./components/About";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Tasks from "./components/Tasks";



function App() {
  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks,setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
    //Empty array at the end represents a dependency array, if you want this 
    //function to run if a value changes you would put that value in the [], 
    //we dont have anything like that rn so empty 
  }, [])

  //Fetch Tasks from json server 
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5001/tasks')

    const data = await res.json()

    return data
  }

  //Fetch single Task from json server 
  const fetchTask = async (id) => {
    //fetch returns a promise so await that promise 
    const res = await fetch(`http://localhost:5001/tasks/${id}`)
    //Turn it into json data 
    const data = await res.json()

    return data
  }

    //Add Task
    const addTask = async (task) =>{

      const res = await fetch(`http://localhost:5001/tasks`, 
                              { method : 'POST',
                                headers: { 
                                    'Content-Type': 'application/json'
                                },
                                  body: JSON.stringify(task)
                              }
                            )
                  
      //This data thats returned is the new task object with the id etc 
      const data = await res.json()

      //create an array, copy all the tasks currnlty on there and add the new task to it too
      setTasks([...tasks, data])

    }


    // Delete task 
    const deleteTask = async (id) => {
      //Req to server to delete 
      await fetch(`http://localhost:5001/tasks/${id}`, {method : 'DELETE'})
      //filter state therefore UI
      setTasks(tasks.filter( (task) => task.id !== id))
    }

    //Toggle reminder
    const toggleReminder = async (id) => {

      const taskToToggle = await fetchTask(id)
      //Updated task copies over all the attributes of task, except changes reminder 
      const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}

      const res = await fetch(`http://localhost:5001/tasks/${id}`,
                              { method: "PUT",
                                headers: { 
                                  'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(updatedTask)
                              } )

      const data = await res.json()

      //Change the UI task reminder to updatedTask reminder from the server
      setTasks(tasks.map((task) => 
        task.id === id ? {...task, reminder: data.reminder} 
        : task))
    }

  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)}
              showAddTask={showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ? (
      <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>) : (
        "No tasks to show")
      }
      <Footer />
    </div>
  );
}

export default App;
