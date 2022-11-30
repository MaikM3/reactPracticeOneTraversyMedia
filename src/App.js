import Header from './componenets/Header';
import Tasks from './componenets/Tasks'
import { useState, useEffect } from "react"
import AddTask from './componenets/AddTask';
import Footer from './componenets/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import About from './componenets/About';

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])
  const IS_UPDATE_TRUE = true

  useEffect(() => {
    const getTasks = async () => {
      const serverTasks = await fetchTasks()
      console.log(serverTasks)
      setTasks(serverTasks)
    }
    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async (id = undefined) => {
    const res = await fetch(`http://localhost:5000/tasks${id ? `/${id}` : ``}`)
    const data = await res.json()
    return data
  }

  const upsertTask = async (newTask, isUpdate = false) => {
    // uuidv4! const id = Math.floor(Math.random()*100000)+1
    const res = await fetch(`http://localhost:5000/tasks${isUpdate ? `/${newTask.id}` : ``}`, {
      method: isUpdate ? 'PUT' : 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newTask)
    })
    const data = await res.json()
    setTasks([...(tasks.filter(task => task.id !== newTask.id)), data])
  }


  // Add task replaced by upsert
  // const addTask = async (newTask) => {
  //   // uuidv4! const id = Math.floor(Math.random()*100000)+1

  //   const res = await fetch(`http://localhost:5000/tasks`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-type': 'application/json'
  //     },
  //     body: JSON.stringify(newTask)
  //   })
  //   const data = await res.json()
  //   setTasks([ ...tasks, data])
  // }

  // Delete task
  const onDelete = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter(task => task.id !== id))
  }

  const toggleReminder = async (id) => {
    const taskDb = await fetchTasks(id)
    await upsertTask({ ...taskDb, reminder: !taskDb.reminder }, IS_UPDATE_TRUE)

    //setTasks(tasks.map( task => task.id === id ? { ...task, reminder: !task.reminder} : task))
  }

  return (
    <Router>
      <div className="App">
          <Header title='Task Track' onAddClick={() => setShowAddTask(!showAddTask)}
            showAdd={showAddTask}
          />
        <Routes>
          <Route path='/' element={
            <>
              {showAddTask && <AddTask onAddTask={upsertTask} />}
              {tasks.length > 0 ?
                <Tasks tasks={tasks} onDelete={onDelete} onToggle={toggleReminder} /> :
                'No tasks'
              }
            </>
          } />
          <Route path='/about' element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
