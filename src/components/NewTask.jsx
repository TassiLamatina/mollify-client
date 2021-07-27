import { Form, Button } from "react-bootstrap"

export default function NewTask(props) {
    return(
        <>  
            <h4>Create Task</h4>

            <Form.Group controlId="exampleForm.ControlInput1" className="mb-2">
                <Form.Label>Task Title</Form.Label>
                <Form.Control type="taskTiltle" value={props.title} onChange={(e) => props.setTitle(e.target.value)} placeholder="Task Title" />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1" className="mb-2">
                <Form.Label> Description</Form.Label>
                <Form.Control as="textarea" rows={3} value={props.description} onChange={(e) => props.setDescription(e.target.value)} placeholder="Description"/>
            </Form.Group>

             <Form.Group controlId="exampleForm.ControlTextarea1" className="mb-3">
                <Form.Label>Notes</Form.Label>
                <Form.Control as="textarea" rows={3} value={props.notes} onChange={(e) => props.setNotes(e.target.value)} placeholder="Notes"/>
            </Form.Group>

            <div className="apply-date">
                <label className="mb-1 px-1"id="calendar" htmlFor="added">Added on:</label>
                <input className="mb-2" type="date" id="added" name="added"
                    value={props.dateAdded} onChange={(e) => props.setDateAdded(e.target.value)} 
                    min="2018-01-01" max="2035-12-31"/>  
            </div>        
            
            <Form.Group controlId="exampleForm.ControlSelect1" className="mb-3">
                <Form.Label>Priority:</Form.Label>
                <Form.Control as="select" value={props.priority} onChange={(e) => props.setPriority(e.target.value)}>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlSelect1" className="mb-4">
                <Form.Label>Status:</Form.Label>
                <Form.Control as="select" value={props.status} onChange={(e) => props.setStatus(e.target.value)}>
                    <option>Incomplete</option>
                    <option>Completed</option>
                    
                </Form.Control>
            </Form.Group>
            <div className="create-btn">
                <Button id="createCard" onClick={() => props.handleTaskCreate()}>Submit</Button>
            </div>
        </>
    )
}