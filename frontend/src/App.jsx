import React from 'react'
import { BrowserRouter , Router, Route, Routes} from 'react-router-dom'
import Landing from './Pages/LandingPage/Landing'
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App