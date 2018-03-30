import React from 'react';
import {Button} from 'react-bootstrap';

const Room = ({roomname,removeRoom}) => {
    
return(

    <div className="RoomSection">  
        <div className="room-name">
         <div className=""singleRoom>
            <Button bsStyle="info" className="roomNameButton">
                {roomname}
                <Button bsStyle="danger" onClick={removeRoom}className="roomCancelButton">X</Button>
            </Button>
         </div>
        </div>
    </div>
    )
}

export default Room;