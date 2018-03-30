import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import RoomFormInstance from './RoomFormInstance';


class CreateRoomModal extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.state = {
        show: false
      };
    }
  
    handleClose() {
      this.setState({ show: false });
    }
  
    handleShow() {
      this.setState({ show: true });
    }
  
    render() {
      return (
        <div className="addRoom">
          <Button bsStyle="primary" onClick={this.handleShow} >Add Room</Button>  
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>New Room</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <RoomFormInstance addNewRoom={this.props.addNewRoom}/>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  }

  export default CreateRoomModal;