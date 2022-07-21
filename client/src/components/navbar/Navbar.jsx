import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'

import './Navbar.css'
function Navbar() {
  
  const {user, dispatch} = useContext(AuthContext)

  return (
    <div className='navbar'>
      <div className="navContainer">
        <Link className="router-nav-link" to="/">
        <span className="logo">Booking.com</span>
        </Link>
        <div className="navItems">
          { user ? 
          <>
          <span className="userDisplay">{user.username}</span> 
          <button onClick={() => dispatch({type: "LOGOUT"})}className="navButton">Logout</button>
          </>
          : 
          <>
          <button className="navButton">Register</button>
          <Link to="/login">
          <button className="navButton">Login</button>
          </Link> 
          </>
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar