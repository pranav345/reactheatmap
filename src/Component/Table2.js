
import React from 'react'; 
import ReactDOM from 'react-dom'; 
  
const Table2=(myarr,msarr,pimap)=>
{
  
    let nor = 5;
    

    function cells(){

         const cells =[];

        for(let i=0;i<nor;i++)
        {  
           let l_row = myarr.map((topic)=>{
              let score = msarr[pimap.get(topic)][i][1]
              if(score<=1)
              {
                return(`<td style ="background-color:#FF0000">${score}</td>`)
              }
              else if(score<=2)
              {
                return(`<td style ="background-color:#FF5B00">${score}</td>`)
              }
              else if(score<4)
              {
                return(`<td style ="background-color:#FFEB00">${score}</td>`)
              }
              else
              {
                return(`<td style ="background-color:#54FF12">${score}</td>`)
              }  
           })
         
           
            cells.push(<tr><th style ="background-color:#c4c4c4;color:#416cb5">${msarr[0][i][0]}</th>${l_row}</tr>);
           
        }
        return cells;

    }

    return(<>
           
           {cells()}

    </>);

}
  
export default Table2;