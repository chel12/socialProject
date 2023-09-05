import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Dialogs.module.css';

const DialogItem = (props) => {
	let path = '/dialogs/' + props.id;
	return (
		<div className={classes.dialog + ' ' + classes.active}>
			<NavLink to={path}>{props.name}</NavLink>
		</div>
	);
};
const Message= (props) => {
	return <div className={classes.message}>{props.message}</div>;
};
const Dialogs = () => {
	return (
		<div className={classes.dialogs}>
			<div className={classes.dialogsItems}>
				<DialogItem name="Dimas" id="1" />
				<DialogItem name="Pavel" id="2" />
				<DialogItem name="Piter" id="3" />
				<DialogItem name="Kolya" id="4" />
				<DialogItem name="Anna" id="5" />
				<DialogItem name="Olga" id="6" />
				<DialogItem name="Sveta" id="7" />
				<DialogItem name="Yura" id="8" />
				<DialogItem name="Pancho" id="9" />
			</div>
			<div className={classes.messages}>
				<Message message="Hello" />
				<Message message="You Best" />
				<Message message="Ahaha,cool" />
			</div>
		</div>
	);
};

export default Dialogs;
