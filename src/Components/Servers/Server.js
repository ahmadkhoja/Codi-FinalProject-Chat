import React from 'react';
import {Button} from 'react-bootstrap';

const Server = ({servername,image,removeServer}) => {
    return(

        <div className="ServerSection">
          
            <div className="server-name">
            {/* {console.log(image)} */}

                <Button bsStyle="info" className="serverNameButton">
                <Button onClick={removeServer} bsStyle="danger" className="removeServerButton">X</Button>
                <img src={image} alt='batata' className="server-icon"/>
                {/* <h4>{servername}</h4> */}
                </Button> 
            </div>
        </div>
    )
}

export default Server;