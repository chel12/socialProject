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
const Message = (props) => {
	return <div className={classes.message}>{props.message}</div>;
};

const Dialogs = () => {
	let dialogsData = [
		{ id: 1, name: 'Dimas' },
		{ id: 2, name: 'Pavel' },
		{ id: 3, name: 'Piter' },
		{ id: 4, name: 'Kolya' },
		{ id: 5, name: 'Anna' },
		{ id: 6, name: 'Olga' },
		{ id: 7, name: 'Sveta' },
		{ id: 8, name: 'Yura' },
		{ id: 9, name: 'Pancho' },
	];
	let messagesData = [
		{ id: 1, message: 'Hello' },
		{ id: 2, message: 'You Best' },
		{ id: 3, message: 'Ahaha,cool' },
	];
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
