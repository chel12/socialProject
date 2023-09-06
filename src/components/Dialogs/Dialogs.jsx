import React from 'react';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import classes from './Dialogs.module.css';

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
	let dialogsElements = dialogsData.map((el) => (
		<DialogItem name={el.name} id={el.id} />
	));
	let messagesData = [
		{ id: 1, message: 'Hello' },
		{ id: 2, message: 'You Best' },
		{ id: 3, message: 'Ahaha,cool' },
	];
	let messagesElements = messagesData.map((el) => (
		<Message message={el.message} id={el.id} />
	));
	return (
		<div className={classes.dialogs}>
			<div className={classes.dialogsItems}>{dialogsElements}</div>
			<div className={classes.messages}>{messagesElements}</div>
		</div>
	);
};

export default Dialogs;
