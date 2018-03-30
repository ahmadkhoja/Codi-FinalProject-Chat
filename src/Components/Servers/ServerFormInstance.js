import React from 'react';
import { Button } from 'react-bootstrap';
import FieldGroup from '../FieldGroup';

class ServerFormInstance extends React.Component {

  onFormSubmit = (evt) =>{
    // console.log("batata")
    evt.preventDefault();
    const form = evt.target;
    const servername = form.server_name.value;
    const image = form.server_image.value;
    console.log('server name: ',servername,'image: ',image)
    // form.server_name.value = "";
    // form.server_image.value = "";
    this.props.addNewServer(servername,image);
  }

  render(){
    return (<div>
      <form onSubmit={this.onFormSubmit}>
      <FieldGroup
        id="formControlsText"
        name="server_name"
        type="text"
        label="Server Name"
        placeholder="Enter Your Server Name"
      />
      <FieldGroup
        id="formControlsFile"
        name="server_image"
        type="file"
        label="Upload Image:"
      />
      <Button type="submit" bsStyle= "success">Create Server</Button>
      </form>
    </div>
    )
  } };

  
    export default ServerFormInstance;