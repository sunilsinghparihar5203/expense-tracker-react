import React,{useContext} from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../Store/Context'

function Home() {
 const authCtx = useContext(AuthContext)
 const history = useHistory()

 if(!authCtx.isLoggedIn){
  history.push('/login')
 }
 console.log({authCtx:authCtx})

  return (
    <div>
      Welcome to expence tracker
    </div>
  )
}

export default Home