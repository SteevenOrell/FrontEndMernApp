import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {createMuiTheme } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/styles';
import {Route, Switch, Link,BrowserRouter} from 'react-router-dom'; 
import Menu from './Components/Menu' 
import Axios from 'axios'


const theme = createMuiTheme({
  

  palette: {
    type:"dark",
    
    primary:{
      
      main:"#1e13f0",},

      secondary:{
        
        main:"#121212",},   
    
  },
  

  

});




class App extends React.Component {

state = { admin_username :"",
  password : "",
  consign:"",
linkMenu:""}

onSetLink(){
  Axios.get('https://back-end-mern-stack.herokuapp.com/admin').then((res)=>{

 // console.log(res.data)
  if(this.state.password === res.data[0].Password && this.state.admin_username === res.data[0].Username){
    this.setState({
      linkMenu : "/Menu"
    })
    }
  })
  
}

  

 onChangeUsername(event){
this.setState({
admin_username: event.target.value
})


 }
 onChangePassword(event){
  this.setState({
  password : event.target.value
  })
  
  
   }

 
   onDisplayConsign(e){

    Axios.get('https://back-end-mern-stack.herokuapp.com/admin').then((res)=>{

      
 //   console.log(res.data[0].Username)
if(this.state.password !== res.data[0].Password && this.state.admin_username !== res.data[0].Username){
  
  
this.setState({
consign : "Please enter correct credential."
});
e.preventDefault();

}

    })
}

  render() { 
        

    return (    
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        

        <Switch>
<Route path="/" exact>
      <Container component="main" maxWidth="xs">
        
      <CssBaseline />
      <div >
   
        <Typography color="primary" component="h1" variant="h5" >
          Log in
        </Typography>
    <h3 >{this.state.consign}</h3>
        <form id="formLogin">
          <TextField id="usernameText"
            
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={this.state.admin_username}
           onChange={(e)=>this.onChangeUsername(e)}
           
          />
          <TextField 
                      
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={this.state.password}
            onChange={(e)=>this.onChangePassword(e)}
          />
        
        <Link to={this.state.linkMenu}  style={{textDecoration : 'none'}}>
          <Button color="primary" onClick={(e)=>this.onDisplayConsign(e)} onMouseOver={()=>this.onSetLink()}
            type="submit"
            fullWidth
           
            variant="contained"
          >  Submit</Button>
      </Link>
        </form>
      </div>
      
     
    </Container> 
    
    </Route>
  
    <Route path="/Menu" component={Menu}/>
      </Switch>
        
    
    </ThemeProvider>
    </BrowserRouter>);
  }
}
 
export default App;



