import React from 'react'; 
import { BrowserRouter , Router, Route, Routes} from 'react-router-dom'
import Landing from './Pages/LandingPage/Landing';
import Create from './Pages/CreateToken/CreateToken' ;
import Buy from './Pages/buytoken/BuyToken'
function App() {
  return (
  
    
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing/>} />
             <Route path="/create" element={<Create/>} />
            <Route path="/buy" element={<Buy/>} />
          </Routes>
        </BrowserRouter>
      
   
  )
}

export default App;



