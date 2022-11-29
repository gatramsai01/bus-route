import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import FindORBody from "../components/FindORBody/FindORBody";
function FindOR(){
    return(
        <div className="FindOR">
            <NavBar/>
            <FindORBody/>
            <Footer/>
        </div>
    );
}

export default FindOR;
