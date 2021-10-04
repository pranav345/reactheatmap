
import React from 'react'; 

  
const Table=(props)=>
{
  
    
    let nor = 5; //number of rows
    let f_row = props.myarr.map((topic)=>{// first row of the table
        return(<th>{topic}</th>);
    })
    

    function allrows(){ //return array of all the data containing row if the table 

         const cells =[];
        for(let i=0;i<nor;i++)
        {  
          let l_row = props.myarr.map((topic)=>{
              let score = props.msarr[props.pimap.get(topic)][i][1]
              if(score<=1)
              {
                return(<td style= {{backgroundColor:"#FF0000"}}>{score}</td>)
              }
              else if(score<=2)
              {
                return(<td style= {{backgroundColor:"#FF5B00"}}>{score}</td>)
              }
              else if(score<4)
              {
                return(<td style= {{backgroundColor:"#FFEB00"}}>{score}</td>)
              }
              else
              {
                return(<td style={{backgroundColor:"#54FF12"}}>{score}</td>)
              }  
           })
         
           
            cells.push(<tr><th>{props.msarr[0][i][0]}</th>{l_row}</tr>);
           
        }
        return cells;

    }


    return(
           <>
           <tr>
            <th>Managers</th>
             {f_row}
           </tr>
           {allrows()}
           </>
);

}


  
export default Table;