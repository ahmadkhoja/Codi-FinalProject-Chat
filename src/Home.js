import React from "react";
import './Home.css';
import { Button, Modal, Glyphicon } from 'react-bootstrap';
import CreateServerModal from './Components/Servers/CreateServerModal'
import CreateRoomModal from './Components/Rooms/CreateRoomModal'
import Server from './Components/Servers/Server';
import Room from './Components/Rooms/Room';
import Menu from './Components/Menu';
import io from 'socket.io-client';


const SingleMessage = ({image,body}) => {
  return (
      <div className="singleMessage">
        <img src={image} alt="batata" className="messageImage"/>
        <p className="bodyText">{body}</p>
      </div>
  )
}

const TeamMember = (username,lang) => {
  return(
      <div className="teamMembers">
        <div className="teamMember">
            {/* <img src={image} className="memberImage"/> */}
            <p className="memberUsername">{username}({lang})</p>
        </div>
    </div>
  )
}

class TeamOptions extends React.Component {
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
      <div className="teamOptions">
      
        <button className="optionTeamSection" onClick={this.handleShow}>
            <Glyphicon glyph="align-justify" />
        </button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Team Options </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <Button vertical block>Build New Team</Button> */}
            <Button vertical block>Share Your Code</Button>
            <Button vertical block>To Do List</Button>
            <Button vertical block>Invite New Member</Button>
            <Button vertical block>Remove Member</Button>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}


class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      user_id:null,
      user_names:'',
      user_lang:'',
      messageText: '',
      // user_profile:[],
      messages: [
        {text:'hello',image:'ai'},
        {text:'batata',image:'codi'},
        {text:'me llamo ahmad',image:'webdev'},
      ],
      servers: [
        {servername:'ai',image:'ai'},
        {servername:'codi',image:'codi'},
        {servername:'webdev',image:'webdev'},
      ],
      rooms: [
        {roomname:'Welcome'},
        {roomname:'General'},
        {roomname:'Web Development'},
      ],
    }
  }
  
  
  componentDidMount = () => {
    const socket = io();
    this.socket = socket;
    socket.on('server sends a message to everyone',(id,text) => {
      const message = {id, text, me:false}
      if(id === this.state.user_id){
        message.me = true
      }
      const messages = this.state.messages.slice()
      messages.push(message)
      this.setState({messages})
    })

    socket.on('giving you the user id',(user_id)=>{
      this.setState({user_id})
    })
    socket.on('giving you the user a name',(name,lang)=>{
      // {name:'',lang:''}
      // const userObj = {username:name,lang:lang,me:false}
      // console.log('userObj = ',userObj)
      // console.log('user profile: ',this.state.user_profile)
      // if(name === this.state.user_names){
      //   userObj.me = true
      // }
      // const userProfile = this.state.user_profile.slice()
      // userProfile.push(userObj)
      this.setState({user_name:name,user_lang:lang,/*user_profile:userObj*/})
    })

  }

  addNewServer = (servername,image) => {
    const new_server = {servername,image};
    const serversAdded = this.state.servers;
    serversAdded.push(new_server);
    this.setState({servers:serversAdded});
  }
  addNewRoom = (roomname) => {
    const new_room = {roomname};
    const roomsAdded = this.state.rooms;
    roomsAdded.push(new_room);
    this.setState({rooms:roomsAdded});
  }
  // addNewMessage = (text,image) => {
  //   const message = {text,image}
  //   const messageList = this.state.messages;
  //   messageList.push(message)
  //   this.setState({messages:messageList})
  //   console.log('new messages list: ',this.state.messages)
  // }
  removeRoom = (room) => {
    const index = this.state.rooms.indexOf(room)
    if (index < 0) {
      return;
    }
      const selected = this.state.rooms.slice();
      selected.splice(index, 1);
      this.setState({ rooms:selected });
  }
  removeServer = (server) => {
    const index = this.state.servers.indexOf(server)
    if (index < 0) {
      return;
    }
      const selected = this.state.servers.slice();
      selected.splice(index, 1);
      this.setState({ servers:selected });
  }
  onTextChange = (evt) => {
    this.setState({messageText:evt.target.value})
    evt.target = ''
    // console.log(this.state.messageText)
  }
  onMessageSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const message = form.message_text.value;
    const user_language = this.state.user_lang;
    // console.log(user_language)
    // const image = form.message_image.value;
    // this.addNewMessage(message,'codi')
    this.socket.emit('message from one user to the server',message , user_language)
    
    // >>>>> sign up
    // this.socket.emit('signup',username,password)

    form.message_text.value = "";
    // console.log(this.state.messages)
  }

  renderMessages(){
    return(
      this.state.messages.map((props,index)=>
        <SingleMessage user_id={this.state.user_id}   body={props.text} key = {index} {...props} image={'/images/'+props.image+'.jpg'}/>
    )
  )
}
//   renderUsers(){
//     return(
//       this.state.user_profile.map((props)=>
//         <TeamMember username={props.username}  {...props} lang={props.lang}/>
//     )
//   )
// }
  renderUsers(){
    return(
      this.state.user_profile.map((props)=>
        <TeamMember username={props.username}  {...props} lang={props.lang}/>
    )
  )
}
  renderServers(){
    return(
      this.state.servers.map((props)=>
        <Server servername = {props.servername} removeServer={() => this.removeServer(props)} key = {props.servername} {...props} image={'/images/'+props.image+'.jpg'}/>
    )
  )
}
  renderRooms(){
    return(
      this.state.rooms.map((props)=>
        <Room roomname = {props.roomname}  removeRoom = {() => this.removeRoom(props)} key = {props.roomname} {...props} />
    )
  )
}

  render(){
    const server_list = this.renderServers()
    const room_list = this.renderRooms()
    const messages_list = this.renderMessages()
    // const users_list = this.renderUsers()
    // console.log(server_list)
    return(
      <div>
          <Menu />
          <div className="wrapper">
             
              <div className="servers">
                       <h3>Servers </h3>
                       <hr/>
                        <CreateServerModal addNewServer={this.addNewServer}/>
                        <div className="serverSectionContainer">
                        { server_list }
                        </div>
              </div>

              <div className="rooms">
                    
                    <h3>
                      Rooms
                      <hr/>
                      <CreateRoomModal addNewRoom={this.addNewRoom}/>
                    </h3>
                    <div className="roomSectionContainer">
                    {room_list}
                    </div>

              </div>
               
              <div className="block mainChat">
              
                <div className="mainChatWrapper">

                  <section className="chatRoom">

                      {messages_list}

                  </section>

                  <section className="inputField">
                      <form method="post" onSubmit={this.onMessageSubmit} className="inputForm"> 
                        <input type="text" name="message_text" value={this.state.messageText} onChange={this.onTextChange} className="type" placeholder="Write Something..."/>
                        {/* <input type="file" name="message_image" value={this.state.messageImage} onChange={this.onImageChange} className="upload" placeholder="Write Something..."/> */}
                        <button className="send">Send</button>
                      </form>
                  </section>
                </div>
              </div>

                <div className="block teams">
                  {/* <h3>Welcome To Teams</h3> */}
                  
                    <div className= "memberTeamOptions">
                      <img   className="imageTeamSection" src="images/1codi.jpg" alt="batata"/>
                      <label className="usernameTeamSection">{this.state.user_name}({this.state.user_lang})</label>
                      <TeamOptions />
                      <label className="roleTeamSection">Team Leader</label>
                    </div>
                  
                      <hr className="red"/>
                      
                      {/* {users_list} */}
                      {/* {this.state.user_name}({this.state.user_lang}) */}
                  <div className="teamMembers">
                    <div className="teamMember">
                        <p className="memberUsername">Ahmad(en)</p>
                    </div>
                    <div className="teamMember">
                        <p className="memberUsername">Ahmad(en)</p>
                    </div>
                    <div className="teamMember">
                        <p className="memberUsername">Ahmad(en)</p>
                    </div>
                    <div className="teamMember">
                        <p className="memberUsername">Ahmad(en)</p>
                    </div>
                </div>
           </div>

        </div>
            
      </div>
    )
  }

}

export default Home;