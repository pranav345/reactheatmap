
let itmap = new Map(); //index to topic map;
let tsmap = new Map();//topic to subtopic map;

let pimap = new Map(); //parameter to index map;

let msarr = []; //manager score array



let definition;
let mydata;

$.get("https://run.mocky.io/v3/09a1870d-294b-4d53-ac4f-87b676ddd000",function(data){

    definition = data.definitions;
    mydata = data.data;


   for(let i= 0;i<definition.length;i++)
    {
        let index = definition[i].index;
        let topic = definition[i].topic;
        let subTopic = definition[i].subTopic;
        if(itmap.has(index))
        {
           itmap.set(index,[...itmap.get(index),topic]);
           if(tsmap.has(topic))
           {
               tsmap.set(topic,[...tsmap.get[topic],subTopic]);
           }
           else
           {
              tsmap.set(topic,[subTopic]);
           }
        }
        else
        {
           itmap.set(index,[topic]);
           tsmap.set(topic,[subTopic]);
        }
    }

    for(let i = 0;i<mydata.length;i++)
    {
     let manager = mydata[i].manager;
     let parameter = mydata[i].parameter;
     let score = mydata[i].score;

     if(pimap.has(parameter))
     {
        let idx = pimap.get(parameter);
        msarr[idx][msarr[idx].length]= [manager,score];
     }
     else
     {
       pimap.set(parameter,msarr.length);
       msarr[msarr.length] = [];
       msarr[msarr.length-1][0] = [manager,score];
     }
    }
    createtable([...itmap.keys()]);
 
});

function indexClicked()
{   
        
    let value = document.getElementById("#indexSelector").value;
    document.getElementById("topicSelector").innerHTML = "<option value =''>Select An Topic</option>";
   
    if(value == "")
    {
        document.getElementById("#topicSelector").disabled = true;
        createtable([...itmap.keys()]);
    }
    

    else
    {
        document.getElementById("#topicSelector").disabled = false;
        let topicarr = itmap.get(value);
        topicarr.map(topic =>{
            document.getElementById('#topicSelector').append(`<option value='${topic}'>${topic}</option>`);
        })
        createtable(itmap.get(value));
    }
    
}
function topicClicked()
{
    let val = document.getElementById("#topicSelector").value;
    if(val !="")
    {
        createtable(tsmap.get(val));
    }
}


function createtable(myarr)
{
    const table = document.getElementById("#scoretable");
    table.innerHTML = "";
    let nor = msarr[0].length;
    let l_row = myarr.map((topic)=>{
        return(`<th style ="background-color:#665c5c;color:#f7faff">${topic}</th>`);
    })
    table.append(
        `<tr>
            <th style="background-color:#665c5c;color:#f7faff">Managers</th>
             ${l_row}
         </tr>`
    );

    for(let i=0;i<nor;i++)
    {  
       l_row = myarr.map((topic)=>{
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
     
       table.append(
           `<tr>
               <th style ="background-color:#c4c4c4;color:#416cb5">${msarr[0][i][0]}</th>
                ${l_row}
               </tr>`
       )
    }
}

export const IndexClicked = () => window.addEventListener('change', () => indexClicked());
export const TopicClicked = () => window.addEventListener('change', () => topicClicked());


