import React, { useState } from "react";
import axios from "axios";
const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://mypracticedquestions.herokuapp.com"
    : "http://localhost:5000";

function Page() {
    
        const [data, setdata] = useState([]);
        React.useEffect(()=> {
            axios
            .get(apiUrl+"/myacc")
            .then((res) => {
                // console.log(res);
                setdata(res.data.questions);
                // if(data.length < 1 ){
                    // console.log(data);
                    // }else{
                        // console.log("data gathered succesfully");
                        // }
                    })
                    .catch((error) => console.error("Ye error hai .....: ", error));
                    
                }, [] )
                
    

    return (
        <div>
            <h1>Following are the practiced questions</h1>
            <hr />
            <ol>
                {data.length >0 ? data.map(eachquestion=>{
                    let str=eachquestion.substring(44,eachquestion.length-2);
                    return <li key={JSON.stringify(eachquestion)}> <a href={eachquestion}>{str.charAt(0).toUpperCase() + str.slice(1)} </a> </li>
                }): <li> Data not reached yet </li> } 
            </ol>        
            <hr />
        </div>
    )
}

export default Page
