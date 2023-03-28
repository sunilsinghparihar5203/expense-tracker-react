import React from 'react'
import { Link } from 'react-router-dom'

import classes  from './Header.module.css'
function Header() {
  return (
    <div className={classes.Header}>
      <div>Welcome to expence tracker</div>
      <div>Your profile is incomplete. <Link to={'/update-profile'}>Complete now</Link></div>
    </div>
  )
}

export default Header