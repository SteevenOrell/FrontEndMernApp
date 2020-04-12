import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link, Redirect} from 'react-router-dom'; 
import Alert from 'react-bootstrap/Alert'
import Button from '@material-ui/core/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
import TextField from '@material-ui/core/TextField';
//import './App.css';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';






class EditRoom extends React.Component {
    state = { Roomname:"",
    selectedStatus:"", goToMenu:false}

    setRoomName(event){
        this.setState({
        
        Roomname : event.target.value
        
        })
        }
        
        setSelectedStatus(event){
        this.setState({
        
          selectedStatus : event.target.value
        });
        console.log(event.target.value)
        
        }



        addOrEditRoom(e){
            if(this.state.Roomname === "" || this.state.selectedStatus ===""){
            
              e.preventDefault();
              this.setState({
            
            consign: "Please fill empty field"
            
              })
            }
            else{
              var url = "https://back-end-mern-stack.herokuapp.com/room-specific/"+this.state.Roomname;
            Axios.get(url).then((res)=>{
            
             console.log(res.data[0])
              if(res.data[0] != null){
            
                
                let newData = {"Room":this.state.Roomname,
                               "CreatedDate": res.data[0].CreatedDate, 
                               "EditDate": this.getCurrentDateTime()[0],
                                "Status": this.state.selectedStatus }  
            //this.props.match.params.id
            
            
            Axios.put("https://back-end-mern-stack.herokuapp.com/room-edit/"+this.state.Roomname,newData).then((result)=>{
            
            })
            
            this.setState({
            
              consign:"Data Successfully Updated",
              Roomname: "",
              selectedStatus:"",
              goToMenu:true
            })
            
            //this.props.Menu.push("/");
              }
              else{
                
                let newData = {"Room":this.state.Roomname,
                "CreatedDate": this.getCurrentDateTime()[0], 
                "EditDate": "Not edited yet",
                 "Status": this.state.selectedStatus }  
            
            
            Axios.post("https://back-end-mern-stack.herokuapp.com/room-add",newData).then((resultAdd)=>{ 
               })
            
            
               this.setState({
            
                consign:"Data Successfully Added",
                Roomname: "",
              selectedStatus:"",
              goToMenu:true,
                   })
            
              }
            
            
            
            })
             }
            }
            
             getCurrentDateTime(){
            
              var d = Date(Date.now());
              var date = d.toString().slice(0,15);
              var time = d.toString().slice(15,);
              var dateAndTime = d.toString();
              var arr = [date,time,dateAndTime];
            
            return arr;
            }
            
            
            showAlert() {
              
            
              return (
            
            
            
            
                <>
                  <Alert show={true} >
                  <Typography color="primary" component="h3" variant="h5" >
                  Add/Edit Room
                </Typography> 
              <h4 style={{color:"white"}}>{this.state.consign}</h4>
                    <form >
                   
                      <TextField 
                        margin="normal"
                         value={this.state.Roomname}
                         onChange={(e)=>this.setRoomName(e)}
                        id="Room name"
                        label="Room Name" 
                      />
                      <br></br>
            
                      <Select
                       defaultValue=""
                       displayEmpty
                      onChange={(e)=>this.setSelectedStatus(e)}
                    >
                      <MenuItem value="" selected disabled>
                            <em>Select Status</em>
                          </MenuItem>
                    <MenuItem value="Active" >Active</MenuItem>
                      <MenuItem value="Inactive" >Inactive</MenuItem>
                    </Select>
                    
                    <hr />
                    
                      <Button color='primary' onClick={(e)=>this.addOrEditRoom(e)}>
                       Save
                      </Button>
                   
                    </form>
            
                   <Link to="/Menu" style={{textDecoration : 'none'}} >
                    <Button color='default' >
                       Back to Menu
                      </Button>
                      </Link>
                  </Alert>
            
                </>
              );
            }




    render() { 


        let redirect = this.state.goToMenu ? <Redirect to="/Menu"/>:<></>
        return (
            
            <>
        
        {this.showAlert()}
        {redirect}

        
        </> );
    }
}
 
export default EditRoom;
