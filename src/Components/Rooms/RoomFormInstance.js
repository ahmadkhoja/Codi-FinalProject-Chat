import React from 'react';
import { Button } from 'react-bootstrap';
import FieldGroup from '../FieldGroup';

class RoomFormInstance extends React.Component {

  onFormSubmit = (evt) =>{
    evt.preventDefault();
    const form = evt.target;
    const roomname = form.room_name.value;
    console.log('room name: ',roomname)
    this.props.addNewRoom(roomname);
    form.room_name.value = "";
  }

  render(){
    return (<div>
      <form onSubmit={this.onFormSubmit}>
      <FieldGroup
        id="formControlsText"
        name="room_name"
        type="text"
        label="Room Name"
        placeholder="Enter Your Room Name"
      />

      <Button type="submit" bsStyle= "success">Create Room</Button>
      </form>
    </div>
    )
  } };

  
    export default RoomFormInstance;