
import React from 'react'; 

  
const TopicList=(props)=>
{
  
   let optionList =  props.topicarr.map(topic =>{
      
        return (<option value={topic}>{topic}</option>);
    })

   
    return(<> 
           {optionList}  
           </>    
           );

}


  
export default TopicList;