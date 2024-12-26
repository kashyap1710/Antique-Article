import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import authSevices from './appwrite/auth.js'
import { login,logout } from './store/authSlice.js'

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
    .finally(() => setLoading(fasle)) 
  },[])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
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
