import React from 'react';
import '../App.css';
import axios from 'axios';
import Table from './SCORETABLE'  //this component dynamically populate the score table
import TopicList from './SELECTTOPIC' // this component dynamically populate the Topic list dropdown menu

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        definition:[], //to store definitions coming from api (index-topic-subtopic)
        data:[],       //to store score-parameter data coming from API 
        itmap:new Map(), //index-topic mapping for example engagement =>[fit,motivation,job characteristic]
        tsmap:new Map(), //topic to subtopic mapping
        pimap:new Map(), //parameter to index mapping (here index corresponds to location where score of given parameter is saved in msarr
        msarr:[],   // managerscore array (this is two dimensional array) saves manager name and score of one parameter in one row 
        myarr:[],   //used to pass data necessary to populate the manager score table
        check:false,  //check whether data from api has been recieved and arranged once data is recieved it help in rerendering page to display data
        topicbool:true,  //to enable and disable dropdown select menu 
        topicarr:[], // used to send data to dynamically populate the topic selection menu
        currentindex:null //used to save the value of current selected index in case we need to use in at some place later in program
    }
}
 

// when data is loaded from API call this is called to rerender the page
  loaddata(){
    this.setState({check:true});
  }
// in componentWillMount the api call is made and data is processed properly for utilising at later stage
   componentWillMount(){
   axios.get("https://run.mocky.io/v3/09a1870d-294b-4d53-ac4f-87b676ddd000")
   .then(response =>{
     this.setState({definition:response.data.definitions,data:response.data.data});
    
     
     // this for loop process data for index-topic map, topic-subtopic map
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
    
    //this for loop processes data for parameter-index map and manager-score array 
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
     
    //this make myarr ready for making call for default table in case no index and topic have been selected
     this.state.myarr = [...this.state.itmap.keys()];
     this.loaddata();
   })
  }

  //this help in enabling the topic selection dropdown menu
  enabletopic(){
    this.setState({topicbool:false});
  }

  //this is called when any changes is made in index selction dropdown menu
  indexClicked(e){
    let val = e.target.value;

    if(val ==="")
    {
      this.setState({myarr:[...this.state.itmap.keys()],topicbool:true});
    }
    else
    { 
    this.state.currentindex = val;
    this.setState({myarr:this.state.itmap.get(val),topicarr:this.state.itmap.get(val)},this.enabletopic);
    }

  }

  //this is called when any changes is made in topic selection dropdown menu
  topicClicked(e){
      let val = e.target.value;
      console.log(e.target.value);
    if(val !== "")
    {    
      console.log(this.state.tsmap);
      this.setState({myarr:this.state.tsmap.get(val)});
    }
    else
    {
      this.setState({myarr:this.state.itmap.get(this.state.currentindex)});
    }
    
  }
  





 render(){
     //until data does not arrive from server it returns empty div
     if(!this.state.check)
     {
         return <div/>
     }


  return (
    <div background ="#010101" class="topdiv">
     <form>
         <select id ="indexSelector" name ="index" onChange={(e)=> this.indexClicked(e)}>
             <option value ="">Select an Index</option>
             <option value = "Engagement">Engagement</option>
             <option value = "Manager Satisfaction">Manager Satisfaction</option>
             <option value = "Job Satisfaction">Job Satisfaction</option>
         </select>
        
        {this.state.topicbool?
        (<select id="topicSelector" name ="topic" disabled>
        <option value ="">Select an Topic</option>
        </select>)
        
        :(<select id="topicSelector" name ="topic" onChange ={(e)=>this.topicClicked(e)}>
           <option value ="">Select an Topic</option>
         <TopicList topicarr = {this.state.topicarr}/> 
        </select> )} 
            
     </form>
     
     <br/><br/>
     
     <table id="scoretable">
        <Table myarr= {this.state.myarr} msarr ={this.state.msarr} pimap = {this.state.pimap}/>
     </table>
    </div>
  )
  }
 }