import React from 'react'
import { Modal } from 'react-bootstrap'

function InfoModal(props) {
    return (
        <Modal className="tooltip-modal" show={props.show} onHide={props.handleClose} centered>
            <Modal.Body>
                <div className="tooltip-content">
                    <h3>{props?.title}</h3>
                    <p>{props.descrition}</p>
                    <button className="btn-primary" onClick={props.handleClose}>
                        Close
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default InfoModal