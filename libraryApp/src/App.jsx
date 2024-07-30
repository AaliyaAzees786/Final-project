import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import Navbar from './components/Navbar'
import { Route, Routes, useParams } from 'react-router-dom'
import Users from './components/Users'
import { useLocation } from 'react-router-dom';
import Usernav from './components/Usernav'
import EditUser from './components/EditUser'
import Admin from './components/Admin'
import Adminnav from './components/Adminnav'
import BookDetail from './components/BookDetail'
import Addbook from './components/Addbook'
import ManageUsers from './components/Manageusers'
import ManageBooks from './components/Managebooks'

function App() {
  const [count, setCount] = useState(0)
  const location = useLocation();
  const isUserRoute = ['/users', '/edituser'].some(path => location.pathname.startsWith(path));
  const isAdminRoute = ['/admin', '/addbook'].some(path => location.pathname.startsWith(path));
  const userId = location.pathname.startsWith('/users/') ? location.pathname.split('/')[2] : null

  return (
    <>
       {isAdminRoute ? <Adminnav /> : isUserRoute ? <Usernav userId={userId}/> : <Navbar />}
      <Routes>
        <Route path='/'element={<Home/>}></Route>
        <Route path='/login'element={<Login/>}></Route>
        <Route path='/signup'element={<Signup/>}></Route>
        {/* <Route path='/users'element={<Users/>}></Route> */}
        <Route path='/users/:id'element={<Users/>}></Route>
        <Route path='/edituser/:id'element={<EditUser/>}></Route>
        <Route path='/admin' element={<Admin/>}></Route>
        <Route path='/book/:id'element={<BookDetail/>}></Route>
        <Route path='/addbook' element={<Addbook/>}></Route>
        <Route path='/manage-users' element={<ManageUsers/>}></Route>
        <Route path='/manage-books' element={<ManageBooks/>}></Route>
      </Routes>
    </>
  )
}

export default App
