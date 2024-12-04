import React from "react";
import { Form, Modal } from "react-bootstrap";

function CreateTask(props) {
  return (
    <Modal className="prodct-viewp createtask " {...props} size="lg">
      <Modal.Header>
        <Modal.Title>Create a task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="login-frm">
          <Form.Group className="form-group" controlId="formBasicEmail">
            <Form.Label>Task name</Form.Label>
            <Form.Control type="text" placeholder="" />
          </Form.Group>

          <Form.Group className="form-group" controlId="formBasicEmail">
            <div className="inputtime">
              <div>
                <Form.Label>Start time:</Form.Label>
              </div>{" "}
              <div className="d-flex gap-4">
                <Form.Control type="date" placeholder="" /> <p>@</p>
                <Form.Control type="time" placeholder="" />
              </div>
            </div>
          </Form.Group>
          <Form.Group className="form-group" controlId="formBasicEmail">
            <div className="inputtime">
              <div>
                <Form.Label>End time:</Form.Label>
              </div>{" "}
              <div className="d-flex gap-4 align-items-center">
                <Form.Control type="date" placeholder="" /> <p>@</p>
                <Form.Control type="time" placeholder="" />
              </div>
            </div>
          </Form.Group>

          <Form.Group className="form-group" controlId="formBasicEmail">
            <Form.Label>Created by</Form.Label>
            <Form.Control type="text" placeholder="" />
          </Form.Group>

          <Form.Group className="form-group" controlId="formBasicEmail">
            <Form.Label>Task description</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="" />
          </Form.Group>
        </Form>
        <button onClick={() => props?.onHide()} className="bold-btn w-50 p-3">
          Create a task
        </button>
      </Modal.Body>
    </Modal>
  );
}

export default CreateTask;
