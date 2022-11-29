import "./FindORBody.css";
import { useState } from "react";
import rt from "../../images/Routemap.jpg";
import { flaskApi } from "../../api-config";
function FindORBody(){


  const [file, setFile] = useState(null)

const handleSubmit =(e)=>{
  e.preventDefault();
  window.location.assign('https://app.forestadmin.com/Route_optimization/Production/Operations/data/Student/index');
}

const isValidFileUploaded=(file)=>{
  const validExtensions = ['csv']
  const fileExtension = file.type.split('/')[1]
  return validExtensions.includes(fileExtension)
}

const fileHandle = e => {
  if(e.target.files.length < 1){
    return;
  }
  const fileChange = e.target.files[0];

  if(isValidFileUploaded(fileChange)){
    setFile(fileChange)
  }else{
    alert("invalid file type")
    
    console.log("invalid file type")
  }
}




  return(
        <div className="FindORBody">

             <div className="Bodi">
                <img style={{width:"100%",height:"100%",filter:"blur(2px)"}} className="image" src={rt}></img>
                <div className="OnImg">
                  <h1>Find Optimized Route</h1>
                  <p className="para">Enter Latitude and longitude of Student pickuplocation</p>
                  <form onSubmit={handleSubmit}>
                    <input type="file" value={file} onChange={(e)=>{fileHandle(e)}} />
                    <button  type="submit"> submit </button>
                  </form>
                </div>
            </div>       
        </div>
    );
}
export default FindORBody;