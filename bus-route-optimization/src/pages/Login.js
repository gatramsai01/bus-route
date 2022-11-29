import react,{useState} from "react"
import NavBar from "../components/NavBar/NavBar";
import { expressApi } from "../api-config";
import "./Register.css"
import {Link, useNavigate} from 'react-router-dom'
function Login(){

    const [email,setEmail]=useState("")
    const[pass,setPass]=useState("")
    const [err,setErr]=useState("")
    const navigate = useNavigate()
        const handleSubmit=(e)=>{
        e.preventDefault()
        if( email,pass){
            expressApi.post("/user/login",{
                email:email,password:pass
            } ).then((res)=>{
                if(res.status){
                    localStorage.setItem("token",res.data.token)
                    navigate('/')
                }
                
            } ).catch((err)=>console.log("err: "+err))
        }
        else{
            setErr("please enter email and password")
        }
        
            
    }


    return(
        <div>
            <NavBar/>
        <div className="formContainer">
            
        <div className="formWrapper">
            
            <form  onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email"/>
                <input type="password" value={pass} onChange={(e)=>setPass(e.target.value)}  placeholder="Password"/>
                <button type="submit">Sign in</button>
                { err ? <p> {err}</p>:<p></p>}
            </form>
            <p>You don't have an account? <Link to="/register">Register</Link></p>
        </div>
    </div>
    </div>
    );
}



export default Login;