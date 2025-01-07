import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import authSevices from './appwrite/auth.js'
import { login,logout } from './store/authSlice.js'
import { Header, Footer } from './components'
import { Outlet } from 'react-router-dom'

function App() {

  const [loading , setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authSevices.getCurrentUser()
    .then(userData => {
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      } 
    })
    .finally(() => setLoading(false)) 
  },[])

  return !loading ? (
    <div className='flex flex-wrap content-between min-h-screen bg-gray-400'>
      <div className='block w-full'>
        <Header />
        <p>hi</p>
        <main>
        TODO:  <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null

}

export default App
