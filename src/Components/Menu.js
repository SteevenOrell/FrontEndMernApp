import React from 'react';
import Typography from '@material-ui/core/Typography';
import {createMuiTheme } from '@material-ui/core/styles'
import {Route, Switch, Link,BrowserRouter} from 'react-router-dom'; 
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Table from 'react-bootstrap/Table'
import Pagination from 'react-bootstrap/Pagination'

import Button from '@material-ui/core/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';

import EditRoom from './EditRoom'
//const {Menu} = this.props;



class Menu extends React.Component {
    state = { EventHistory:[],
    ChatHistory:[],
  Rooms:[],
 current:1
}



componentDidMount(){

  //Get list of event-log
Axios.get("https://back-end-mern-stack.herokuapp.com/event-log").then((res)=>{

this.setState({
EventHistory : res.data

})
});

//Get list of chat history

Axios.get("https://back-end-mern-stack.herokuapp.com/chat-history").then((res)=>{

this.setState({
ChatHistory : res.data

})
});

//Get list of Rooms Ninja, Gold

Axios.get("https://back-end-mern-stack.herokuapp.com/room-list").then((res)=>{

this.setState({
Rooms : res.data

})
});


}

componentDidUpdate(){
 
    
    //Get list of Rooms Ninja, Gold
    
    Axios.get("https://back-end-mern-stack.herokuapp.com/room-list").then((res)=>{
    
    this.setState({
    Rooms : res.data
    
    })
    });
    


}

removeRoom(event){

console.log(event.currentTarget.value);
  Axios.delete("https://back-end-mern-stack.herokuapp.com/room-delete/"+event.currentTarget.value).then((res)=>{


  })
  console.log("Deleted successully")
}


  
    render() { 



      let active = 1;
let items = [];
for (let number = 1; number <= 5; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>,
  );
}


let event_list = this.state.EventHistory.map((single_event)=>{

  return <tr>
  <td>{single_event.EventType}</td>
<td>{single_event.Date}</td>
<td>{single_event.Time}</td>
<td>{single_event.User}</td>
  </tr>

});
var count=0;


let chat_hist_list = this.state.ChatHistory.map((single_chat_record)=>{
count++;
return <tr>
<td>{count}</td>
<td>{single_chat_record.Date}</td>
<td>{single_chat_record.Time}</td>
<td>{single_chat_record.Sender}</td>
<td>{single_chat_record.Receiver}</td>
<td> {single_chat_record.Message}</td>
<td> {single_chat_record.roomname}</td>
</tr>

});
 count=0;


let room_list = this.state.Rooms.map((single_room)=>{
count++
///"+single_room._id
return <tr>
<td>{count}</td>
<td>{single_room.Room}</td>
<td>{single_room.CreatedDate}</td>
<td>{single_room.EditDate}</td>
<td>{single_room.Status}</td>

<td><Link to={"/edit-room"} style={{textDecoration : 'none'}}><Button color="primary">Edit</Button></Link></td>

<td><Button color="white" value={single_room.Room} onClick={(e)=>this.removeRoom(e)}>Delete</Button></td>
</tr>


})
        return (
        <><Typography color="primary" component="h1" variant="h5" >
        Menu
    </Typography> 

    <div style={{ display: "flex" }}>
<Link to={"/"} style={{textDecoration : 'none', marginLeft: "auto"}} ><Button color="primary">Logout</Button></Link></div>

<BrowserRouter>
<Switch>

<Route path="/Menu" exact>
    <Tabs defaultActiveKey="event-history" id="uncontrolled-tab-example" style={{color:"gold"}}>
  <Tab eventKey="event-history" title="Event History" id="eventTab">
  
  
  
  <div>
  <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      
      <th>Event Type</th>
      <th>Date</th>
      <th>Time</th>
      <th>User</th>
    </tr>
  </thead>
  <tbody>
    {event_list}
    
  </tbody>
</Table>


    <Pagination>{items}</Pagination>
    

  
  </div>



  </Tab>
  <Tab eventKey="chat-history" title="Chat History">
  
  

  <div>

  <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>Id</th>
      <th>Date</th>
      <th>Time</th>
      <th>Sender</th>
      <th>Receiver</th>
      <th>Message</th>
      <th>Room</th>
    </tr>
  </thead>
  <tbody>
  
    {chat_hist_list}
   
  </tbody>
</Table>




    <Pagination>{items}</Pagination>
    

  
  </div>



  </Tab>
  <Tab eventKey="rooms" title="Rooms" >
  

  <div style={{ display: "flex" }}>
<Link to={"/edit-room"} style={{textDecoration : 'none', marginLeft: "auto"}} ><Button color="primary">Add New Room</Button></Link></div>


<div>
  <Table striped bordered hover variant="dark">

 
  <thead>
    <tr>
      <th>Id</th>
      <th>Room</th>
      <th>Created Date</th>
      <th>Edit Date</th>
      <th>Status</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
   
    {room_list}
  </tbody>
</Table>



    <Pagination>{items}</Pagination>
    

  
  </div>



  </Tab>
</Tabs>
</Route>


        <Route path="/edit-room"> <EditRoom/> </Route>
</Switch>
</BrowserRouter>
    </>
      
      
      
      );
    }
}
 
export default Menu;