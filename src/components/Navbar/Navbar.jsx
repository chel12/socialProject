import React from 'react';
import classes from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
const Navbar = () => {
	return (
		<nav className={classes.nav}>
			<ul>
				<li className={classes.item}>
					<NavLink
						to={'/users'}
						className={({ isActive }) =>
							isActive ? classes.active : ''
						}>
						Users
					</NavLink>
				</li>
				<li className={classes.item}>
					<NavLink
						to={'/profile'}
						className={({ isActive }) =>
							isActive ? classes.active : ''
						}>
						Profile
					</NavLink>
				</li>
				<li className={classes.item}>
					<NavLink
						to={'/dialogs'}
						className={({ isActive }) =>
							isActive ? classes.active : ''
						}>
						Dialogs
					</NavLink>
				</li>
				<li className={classes.item}>
					<NavLink
						to={'/chat'}
						className={({ isActive }) =>
							isActive ? classes.active : ''
						}>
						Chat
					</NavLink>
				</li>
				<li className={classes.item}>
					<NavLink
						to={'/about'}
						className={({ isActive }) =>
							isActive ? classes.active : ''
						}>
						About
					</NavLink>
				</li>
				<li className={classes.item}>
					<NavLink
						to={'/home'}
						className={({ isActive }) =>
							isActive ? classes.active : ''
						}>
						Home
					</NavLink>
				</li>
				<li className={classes.item}>
					<NavLink
						to={'/contacts'}
						className={({ isActive }) =>
							isActive ? classes.active : ''
						}>
						Contacts
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
