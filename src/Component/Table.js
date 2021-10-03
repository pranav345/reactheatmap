import React from 'react';
import '../App.css';
import axios from 'axios';
import Table2 from './Table2'

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        definition:[],
        data:[],
        itmap:new Map(),
        tsmap:new Map(),
        pimap:new Map(),
        msarr:[]
    }
}

   componentDidMount(){
   axios.get("https://run.mocky.io/v3/09a1870d-294b-4d53-ac4f-87b676ddd000")
   .then(response =>{
     this.setState({definition:response.data.definitions,data:response.data.data});
    

     for(let i= 0;i<this.state.definition.length;i++)
    {
        let index = this.state.definition[i].index;
        let topic = this.state.definition[i].topic;
        let subTopic = this.state.definition[i].subTopic;
        if(this.state.itmap.has(index))
        {
            this.state.itmap.set(index,[...this.state.itmap.get(index),topic]);
           if(this.state.tsmap.has(topic))
           {
            this.state.tsmap.set(topic,[...this.state.tsmap.get[topic],subTopic]);
           }
           else
           {
            this.state.tsmap.set(topic,[subTopic]);
           }
        }
        else
        {
            this.state.itmap.set(index,[topic]);
            this.state.tsmap.set(topic,[subTopic]);
        }
    }

    for(let i = 0;i<this.state.data.length;i++)
    {
     let manager = this.state.data[i].manager;
     let parameter = this.state.data[i].parameter;
     let score = this.state.data[i].score;

     if(this.state.pimap.has(parameter))
     {
        let idx = this.state.pimap.get(parameter);
        this.state.msarr[idx][this.state.msarr[idx].length]= [manager,score];
     }
     else
     {
        this.state.pimap.set(parameter,this.state.msarr.length);
        this.state.msarr[this.state.msarr.length] = [];
        this.state.msarr[this.state.msarr.length-1][0] = [manager,score];
     }
    }

   })
  }

 render(){
  return (
    <div background ="#010101" class="topdiv">
      
     <form>
         <select id ="indexSelector" name ="index" onChange="indexClicked()">
             <option value ="">Select an Index</option>
             <option value = "Engagement">Engagement</option>
             <option value = "Manager Satisfaction">Manager Satisfaction</option>
             <option value = "Job Satisfaction">Job Satisfaction</option>
         </select>
         <select id="topicSelector" name ="topic" onChange ="topicClicked()" disabled>
            <option value ="">Select an Topic</option>
        </select>
     </form>
     <br/><br/>
     
     <table id="scoretable">
         <Table2 myarr= {[...this.state.itmap.keys()]} msarr ={this.state.msarr} pimap = {this.state.pimap}/>
     </table>
    </div>
  )
  }
 }