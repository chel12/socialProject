import React from 'react';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import classes from './Dialogs.module.css';

const Dialogs = (props) => {
	let dialogsElements = props.state.dialogsData.map((el) => (
		<DialogItem name={el.name} id={el.id} />
	));

	let messagesElements = props.state.messagesData.map((el) => (
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
