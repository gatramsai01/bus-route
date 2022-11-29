import "./NavBar.css";
import {Link, useNavigate} from 'react-router-dom'
function NavBar(){

  const navigate =useNavigate()
  
  const logoutHandler=()=>{
    localStorage.clear()
    navigate('/login')

    console.log("in logout handler")
  }

  let auth = localStorage.getItem('token')
    return(
        <div className="topnav" id="myTopnav">
            <Link to="/" className="active">Optimized Route Service</Link>
           

        <Link to='/' className="active">Home</Link>

        {
          auth ? 
          <button onClick={()=>logoutHandler()} className="px-4 py-1 rounded-md h-fit bg-blue-500 hover:bg-blue-600">logout</button>
          
      :
             
      <div className="dropdown">
          <button className="dropbtn">Login As
          <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content">
          <Link to="/login">Student</Link>
          <Link to="/login">Admin</Link>
          <Link to="/login">Driver</Link>
          </div>
      </div>


        }

       

        </div>
    );
}

export default NavBar;