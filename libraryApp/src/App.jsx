import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Users from './components/Users'
import { useLocation } from 'react-router-dom';
import Usernav from './components/Usernav'
import EditUser from './components/EditUser'
import Admin from './components/Admin'
import Adminnav from './components/Adminnav'

function App() {
  const [count, setCount] = useState(0)
  const location = useLocation();
  const isUserRoute = ['/users', '/edituser'].some(path => location.pathname.startsWith(path));
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
       {isAdminRoute ? <Adminnav /> : isUserRoute ? <Usernav /> : <Navbar />}
      <Routes>
        <Route path='/'element={<Home/>}></Route>
        <Route path='/login'element={<Login/>}></Route>
        <Route path='/signup'element={<Signup/>}></Route>
        <Route path='/users'element={<Users/>}></Route>
        <Route path='/edituser'element={<EditUser/>}></Route>
        <Route path='/admin' element={<Admin/>}></Route>
      </Routes>
    </>
  )
}

export default App