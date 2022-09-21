import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LoginUser, reset } from '../../Features/authSlice'
import {FaLock} from 'react-icons/fa'
import {MdEmail} from 'react-icons/md'
import { TabTitle } from '../../Utils/Title'

const Login = () => {
  TabTitle('Pariwisata Pulau Flores: Login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user, isError, isLoading, isSuccess, message} = useSelector((state: any) => state.auth)

  useEffect(()=>{
    if(user || isSuccess){
      navigate('/halaman-utama')
    }
    dispatch(reset())
  }, [user, isSuccess, dispatch, navigate])

  const Auth = (e: any) => {
    e.preventDefault()
    dispatch(LoginUser({email, password}) as any)
  }
  return (
    <div className='login'>
        <div className="main-login">
          <p>Login</p>
          <form onSubmit={Auth}>
            {isError && <p className='error'>{message}</p>}
            <div className="input">
              <label htmlFor="email"><MdEmail/></label>
              <input type="email" id='email' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="input">
              <label htmlFor="password"><FaLock/></label>
              <input type="password" id='password' placeholder='Password'  value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <button className='btn' type='submit'>{isLoading ? 'Loading...' : 'Login'}</button>
          </form>
        </div>
    </div>
  )
}

export default Login