import './App.css'
import AdminPanel from './panel'
import SignIn from './SignIn'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
function App() {
  return(
    <Router>
      <Routes>
        <Route path='/' element={<SignIn/>}/>
        <Route path='/ScorePanel' element={<AdminPanel/>}/>
      </Routes>
    </Router>
  )
}

export default App
