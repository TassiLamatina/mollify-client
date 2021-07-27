import { Form, Button } from "react-bootstrap"

export default function UpdateTask(props) {
    return(
        <>
            <h4>Update Task</h4>

            <Form.Group controlId="exampleForm.ControlInput1" className="mb-2">
                <Form.Label>Task Title</Form.Label>
                <Form.Control type="taskTiltle" value={props.title} onChange={(e) => props.setTitle(e.target.value)} placeholder="Task Title" />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1" className="mb-2">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} value={props.description} onChange={(e) => props.setDescription(e.target.value)} placeholder="Description"/>
            </Form.Group>

             <Form.Group controlId="exampleForm.ControlTextarea1" className="mb-3">
                <Form.Label>Notes</Form.Label>
                <Form.Control as="textarea" rows={3} value={props.notes} onChange={(e) => props.setNotes(e.target.value)} placeholder="Notes"/>
            </Form.Group>       
            
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
                    <option>Done</option>
                </Form.Control> 
            </Form.Group>
            <div className="create-btn">
                <Button id="updateCard" variant="secondary" onClick={() => props.handleTaskUpdate()}>Update Task</Button>
                <Button id="deleteCard" variant="danger" onClick={() => props.handleTaskDelete()}>Delete Task</Button>
            </div>
        </>
    )
}