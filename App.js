import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Table from 'react-bootstrap/lib/Table';
import Image from 'react-bootstrap/lib/Image';
import  'font-awesome/css/font-awesome.css'


class App extends Component {
  
  state={
    top100Days:[],
    top100AllTime:[],
    current:true
  }
getFCCData(url,stateName){
  axios.get(url).then(({data})=>{
    this.setState({[stateName]:data});
  console.log(this.state.top100Days);
})
}

pointChange(value){
if(this.state.current !==value){
  this.setState({current:value});
}
}

componentDidMount(){
  this.getFCCData('https://fcctop100.herokuapp.com/api/fccusers/top/recent',
  "top100Days");

  this.getFCCData('https://fcctop100.herokuapp.com/api/fccusers/top/alltime',"top100AllTime");
}
  render() {
    const { top100Days, top100AllTime, current }=this.state;
    const Timestamp = require('react-timestamp');
    
    return (
      <div className="App" container>
       <Table striped bordered condensed hover className="colorBlack"> 
       <thead>
         <tr>
           <th>#</th>
           <th>Camper Name</th>
           <th onClick={(event)=>this.pointChange(true)} className="Cursor">Points in 30 Days {current && (<i className="fa fa-caret-down"> </i>)}
            </th>
           <th onClick={(event)=>this.pointChange(false)} className="Cursor">All time points {current ===false &&  (<i className="fa fa-caret-down"> </i>)}
           </th>
           <th>Last Update</th>
           
         </tr>
         
         </thead>
       
         <tbody>
           
{
 current &&( top100Days.map((value,index)=>(


<tr key={value.username}>
<td>{index+1}</td>
 <td><a href={`https://www.freecodecamp.org/${value.username}`}>
<Image src={value.img} className="imgHeight" circle/>{value.username}
</a> </td>
<td>{value.recent}</td>
<td>{value.alltime}</td>
<td>
 <Timestamp time={value.lastUpdate} format="full"/>
 </td>
</tr>
) 
))}
           
{
  current === false && (top100AllTime.map((value,index)=>(


<tr key={value.username}>
<td>{index+1}</td>
 <td><a href={`https://www.freecodecamp.org/${value.username}`}>
<Image src={value.img} className="imgHeight" circle/>{value.username}
</a> </td>
<td>{value.recent}</td>
<td>{value.alltime}</td>
<td>
 <Timestamp time={value.lastUpdate} format="full"/>
 </td>
</tr>
) 
))}
         </tbody>
         </Table>
      </div>
    );
  }
}

export default App;
