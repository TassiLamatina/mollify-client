import { useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import { Row, Col, Button } from 'react-bootstrap'
import axios from "axios"

// Components
import Login from "./Login"
import TaskList from './TaskList'
import Menu from './Menu'
import TaskDetail from "./TaskDetail"
import NewTask from './NewTask'
import UpdateTask from './UpdateTask'

export default function LandingPage(props) {
    // console.log(props)
    // state is information from the server
    const [filter,setFilter] = useState(null)
    const [taskList,setTaskList] = useState([])
    const [filteredTaskList,setFilteredTaskList] = useState([])
    const [selected,setSelected] = useState(null)
    const [action,setAction] = useState('view')

    // state passed through to writable form
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [notes,setNotes] = useState('')
    const [dateAdded,setDateAdded] = useState('')
    const [priority,setPriority] = useState('High')
    const [status,setStatus] = useState('Incomplete')

    // hit the auth locked route on the backend
    useEffect(() => {
        const getUserTasks = async () => {
            try {
                // get the jwt from local storage
                const token = localStorage.getItem('jwtToken')

                // makeup the auth headers
                const authHeaders = {
                    Authorization: token
                }

                // hit the auth locked endpoint
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/tasks`, { headers: authHeaders })
                // set state with the data from the server
                // console.log(`${response} 🍎`)
                setTaskList(response.data[0].tasks)
                setFilteredTaskList(response.data[0].tasks)
    
            } catch (err) {
                console.log(err)
                //log the user out if an error occurs
                props.handleLogout()
            }
        }
        getUserTasks()
    }, [props])
    // redirect if there is no user in state
    if(!props.currentUser) return <Redirect to='/' component={ Login } currentUser={ props.currentUser } />

// handlers and utils

    // filter list of tasks by status
    const handleMenuClick = (newFilter) => {
        setSelected(null)
        setFilter(newFilter)
        setAction('view')
        if (!newFilter) {
            setFilteredTaskList(taskList)
        } else {
            let filteredTasks = taskList.filter(task => task.status === newFilter)
            setFilteredTaskList(filteredTasks)
        }
    }

    // show task detail
    const handleTaskCardClick = (task) => {
        setAction('view')
        setSelected(task)
    }

    // create new task
    const handleTaskCreate = async () => {
        try {
            const newTask = {
                title: title,
                description: description,
                notes: notes,
                priority: priority,
                status: status,
                dateAdded: dateAdded
            }

            // make post request
            const token = localStorage.getItem('jwtToken')

            // makeup the auth headers
            const authHeaders = {
                Authorization: token
            }
            // hit the auth locked endpoint
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/tasks`, {task: newTask}, { headers: authHeaders})

            // add to state taskList
            console.log(response.data)
            setTaskList([...taskList, response.data.task])  
            // update filters and action
            setAction('view')
            setFilter(response.data.task.status)
            let filteredTasks = taskList.filter(task => task.status === response.data.task.status)
            filteredTasks.push(response.data.task)
            setFilteredTaskList(filteredTasks)
            setSelected(taskList[taskList.length-1])
            setTitle('')
            setDescription('')
            setNotes('')
            setDateAdded('')
            setPriority('High')
            setStatus('Incomplete')
        } catch (err) {
            console.log(err)
        }
    }

    // update existing task
    const handleTaskUpdate = async () => {
        try {
            // set selected task to form state
            selected.title = title
            selected.description = description
            selected.notes = notes
            selected.priority = priority
            selected.status = status
            selected.dateAdded = dateAdded

            const token = localStorage.getItem('jwtToken')

            // makeup the auth headers
            const authHeaders = {
                Authorization: token
            }
            // hit the auth locked endpoint
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/tasks`, {task: selected }, { headers: authHeaders})

            // set filter to current status
            setAction('view')
            setFilter(selected.status)
            let filteredTasks = taskList.filter(task => task.status === selected.status)
            setFilteredTaskList(filteredTasks)
            // reset form
            setTitle('')
            setDescription('')
            setNotes('')
            setDateAdded('')
            setPriority('High')
            setStatus('Incomplete')
        } catch (err) {
            console.log(err)
        }
    }
    
    // delete exising Task
    const handleTaskDelete = async () => {
        try {
            const token = localStorage.getItem('jwtToken')

            // makeup the auth headers
            const authHeaders = {
                Authorization: token
            }
            // hit the auth locked endpoint
            const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/tasks`, { headers: authHeaders , data: {taskId: selected._id }})

            // remove task in state
            let i = taskList.findIndex(task => task._id === selected._id)
            taskList.splice(i, 1)
            
            setSelected(null)
            // reset filter to show all
            setAction('create')
            setFilter(null)
            setFilteredTaskList(taskList)
            // reset form
            setTitle('')
            setDescription('')
            setNotes('')
            setDateAdded('')
            setPriority('High')
            setStatus('Incomplete')  
        } catch (err) {
            console.log(err)
        }
    }

    const showNewTaskForm = () => {
        setAction('create')
        setSelected(null)
        setTitle('')
        setDescription('')
        setNotes('')
        setDateAdded('')
        setPriority('High')
        setStatus('Incomplete')
    }

    const showUpdateTaskForm = (task) => {
        setAction('update')
        setSelected(task)
        setTitle(task.title)
        setDescription(task.description)
        setNotes(task.notes)
        setDateAdded(task.dateAdded)
        setPriority(task.priority)
        setStatus(task.status)
    }

    // display pane logic 

    let selectedTaskPane

    if(selected) {
        if(action === 'view'){
            selectedTaskPane = <TaskDetail showUpdateTaskForm={showUpdateTaskForm} task={ selected }/>
        } else if(action === 'update') {
            selectedTaskPane = <UpdateTask 
            handleTaskUpdate={handleTaskUpdate}
            handleTaskDelete={handleTaskDelete}

            task={ selected } 

            title={title} setTitle={setTitle}
            description={description} setDescription={setDescription}
            notes={notes} setNotes={setNotes}
            dateAdded={dateAdded} setDateAdded={setDateAdded}  
            priority={priority} setPriority={setPriority}
            status={status} setStatus={setStatus}
            />
        }
    } else {
        selectedTaskPane = <NewTask
         handleTaskCreate={handleTaskCreate} 
         
         task={ selected } 

         title={title} setTitle={setTitle}
         description={description} setDescription={setDescription}
         notes={notes} setNotes={setNotes}
         dateAdded={dateAdded} setDateAdded={setDateAdded}  
         priority={priority} setPriority={setPriority}
         status={status} setStatus={setStatus}
         />
    }
    
    return(
        <div id="LandingPage">
            <div id="menuLand">
                <Row>
                    <Col md={3}>
                        <div className="create-btn">
                            <Button id="createbtn" onClick={ showNewTaskForm }>Create New Task</Button>
                        </div>
                        <div id="menu">
                            <Menu handleMenuClick={ handleMenuClick } filter={filter}/>
                        </div>
                    </Col>

                <Col md={3} id="taskCards">
                        <TaskList taskData={filteredTaskList} handleTaskCardClick= { handleTaskCardClick }/>
                    </Col>
                    
                    <Col md={5} id="taskDetail">
                        {selectedTaskPane}
                    </Col>
                </Row>
            </div>
        </div>
    )
}