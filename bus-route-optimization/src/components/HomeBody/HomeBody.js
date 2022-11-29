import "./HomeBody.css";
import rt from "../../images/rgt.png";
import { Link } from "react-router-dom";
// import "./FindOR.js" from "./"
function HomeBody(){
    return(
        <div className="HomeBody">
            <div className="Body">
                <div className="LeftBody">
                    <h1>Welcome to</h1>
                    <h2>BML Munjal Universitry Bus, Route Optimization Services</h2>
                    <h2>Bus Route Optimization</h2>
                    <div className="LeftBodyBOttom">
                        <p className="p">
                            <h3 style={{color:"white"}}>For Students</h3>
                            There are many variations of passages of Lorem Ipsum available, but the majority have suffered 
                            alteration in some form, by injected humour, or randomised words which don't look even slightly 
                            believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't 
                            anything embarrassing hidden in the middle of text.
                            <br/>
                            <button>Click Here</button>
                        </p>
                        
                        <p className="p">
                            <h3 style={{color:"white"}}>For Drivers</h3>
                            There are many variations of passages of Lorem Ipsum available, but the majority have suffered 
                            alteration in some form, by injected humour, or randomised words which don't look even slightly 
                            believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't 
                            anything embarrassing hidden in the middle of text. 
                            <button>Click Here</button>
                        </p>
                        <p className="p">
                            <h3 style={{color:"white"}}>For Admins</h3>
                            There are many variations of passages of Lorem Ipsum available, but the majority have suffered 
                            alteration in some form, by injected humour, or randomised words which don't look even slightly 
                            believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't 
                            anything embarrassing hidden in the middle of text.
                            <Link to="/findor" >
                            <button>Click Here</button></Link>
                        </p>
                    </div>
                </div>
                <div className="RightBody">
                    <img src={rt}/>
                </div>
            </div>
        </div>
    );
}
export default HomeBody;