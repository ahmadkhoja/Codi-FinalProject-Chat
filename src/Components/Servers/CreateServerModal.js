import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import ServerFormInstance from './ServerFormInstance';

class CreateServerModal extends React.Component {
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
        <div className="addServer">
          <Button bsStyle="primary batata" onClick={this.handleShow} >Add Server</Button>  
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>New Server</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* Form Instance */}
              {/* Student Rating  */}
              {/* <h1>Contact {this.props.name}</h1> */}
              <ServerFormInstance addNewServer={this.props.addNewServer}/>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  }
    
  export default CreateServerModal;