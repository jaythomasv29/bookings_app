import axios from "axios"
import { useState, useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { navigate, useNavigate } from 'react-router-dom'

import './login.css'
const Login = () => {
  const navigate = useNavigate()
  const { user, loading, error, dispatch } = useContext(AuthContext)
  console.log(user)
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials({
      ...credentials,
      [name]: value
    })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    dispatch({
      type: "LOGIN_START"
    })
    try {
      const res = await axios.post("/auth/login", credentials)
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
      navigate('/')

    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data })
    }
  }

  return <div className="login">
    <h2>Booking.com</h2>
    <p className="secondaryTitle">Login</p>
    <div className="formControl">
      <input type="text" className="inputField" placeholder="username" name="username" value={credentials.username} onChange={handleChange} />
    </div>
    <div className="formControl">
      <input type="text" className="inputField" placeholder="password" name="password" value={credentials.password} onChange={handleChange} />
    </div>
      <div className="formAction">
        <button disabled={loading} onClick={handleLogin} className="loginBtn">Login</button>
        {error && <span>{error.message}</span>}
      </div>
  </div>
}
export default Login