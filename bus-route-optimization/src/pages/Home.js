import NavBar from "../components/NavBar/NavBar";
import HomeBody from "../components/HomeBody/HomeBody";
import Footer  from "../components/Footer/Footer";
function Home(){
    return(
        <div>
            <NavBar/>
            {/* <br></br> */}
            <HomeBody/>
            {/* <br></br> */}
            <Footer/>
        </div>
        
    );
}

export default Home;