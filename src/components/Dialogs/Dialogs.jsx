import React from 'react';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import classes from './Dialogs.module.css';
import { sendMessageCreator, updateNewMessageBodyCreator } from '../../redux/state';

const Dialogs = (props) => {
	let state = props.store.getState().dialogsPage
	let dialogsElements = state.dialogsData.map((el) => (
		<DialogItem name={el.name} id={el.id} />
	));
	let messagesElements = state.messagesData.map((el) => (
		<Message message={el.message} id={el.id} />
	));
	let newMessageBody=state.newMessageBody;
	let onSendMessageClick = ()=>{
		props.store.dispatch(sendMessageCreator())
	}
	let onNewMessageChange = (e)=>{
		let body = e.target.value;
		props.store.dispatch(updateNewMessageBodyCreator(body))
	}


	return (
		<div className={classes.dialogs}>
			<div className={classes.dialogsItems}>{dialogsElements}</div>
			<div className={classes.messages}>
				<div>{messagesElements}</div> 
				<div>
					<div><textarea onChange={onNewMessageChange} value={newMessageBody} placeholder='Enter your message'></textarea></div>
					<div><button onClick={onSendMessageClick} >Send</button></div>
				</div>
				</div>
		</div>
	);
};

export default Dialogs;
