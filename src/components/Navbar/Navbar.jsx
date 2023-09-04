import React from 'react'
import classes from './Navbar.module.css'
import { NavLink } from 'react-router-dom'
const Navbar = () => {
  return (
	<nav className={classes.nav}>
	<ul>
		<li className={classes.item}>
			<NavLink to={'/profile'}>Profile</NavLink>
		</li>
		<li className={classes.item}>
		<NavLink to={'/dialogs'}>Dialogs</NavLink>
		</li>
		<li className={classes.item}>
		<NavLink to={'/about'}>About</NavLink>
		</li>
		<li className={classes.item}>
		<NavLink to={'/home'}>Home</NavLink>
		</li>
		<li className={classes.item}>
		<NavLink to={'/contacts'}>Contacts</NavLink>
		</li>
	</ul>
  </nav>
  )
}

export default Navbar