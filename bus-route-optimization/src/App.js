import './App.css';
import Login from "./pages/Login.js"
import Register from './pages/Register';
import Home from './pages/Home.js';
import FindOR from './pages/FindOR';
import ProtectedRoute from './components/ProtectedRoute'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
      <BrowserRouter>
    <Routes>
        <Route index element={<Home />} />
        <Route path='/' exact element={<Home/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />

        <Route element={ <ProtectedRoute/> } >
          <Route path='/findor' element={<FindOR/>} />
       </Route>
        
        
    </Routes>
  </BrowserRouter>
  );
}
export default App;
