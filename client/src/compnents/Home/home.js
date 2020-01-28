import React from 'react'
import Login from '../Login/login'
import {Link} from 'react-router-dom'

function Home (){
  return(
<div>
  <Login/>
  <Link to="/password">
   <p>Forget Pin</p>
  </Link>
</div>
  )
}
export default Home