import react,{useState}from "react"
import NavBar from "../components/NavBar/NavBar";
import add from "../images/Avatar.png"
import { Link, useNavigate } from "react-router-dom";
import "./Register.css"
import { expressApi } from "../api-config";
function Register(){
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [pass, setpass] = useState("")
    const [uid, setuid] = useState("")
    const [ed, seted] = useState("")

    const navigate = useNavigate();



    const handleSubmit=(e)=>{
        e.preventDefault()
        expressApi.post('/user/add',{
            name:name,
            email:email,
            password:pass,
            uid:uid,
            ed:ed
        }).then((res)=>{
            if(res.status===200){
                navigate('/login')
              }
        }).catch((err)=>{console.log(err.response.data)})
    }





    return(
        <div>
            <NavBar/>
        <div className="formContainer">
            <div className="formWrapper">
                <form onSubmit={handleSubmit}>
                    <input type="text" value={name} onChange={(e)=>setname(e.target.value)} placeholder="Display name"/>
                    <input type="email" value={email} onChange={(e)=>setemail(e.target.value)} placeholder="Email"/>
                    <input type="password" value={pass} onChange={(e)=>setpass(e.target.value)} placeholder="Password"/>
                    <input type="text" value={uid} onChange={(e)=>setuid(e.target.value)} placeholder="Uid"/>
                    <input type="text" value={ed} onChange={(e)=>seted(e.target.value)} placeholder="ed"/>

                    <button type="submit">Sign up</button>
                </form>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
        </div>
    );
}

export default Register;