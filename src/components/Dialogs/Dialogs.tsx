import React from 'react';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import classes from './Dialogs.module.css';
import { InitialStateType } from './../../redux/dialogsReducer';
import AddMessageForm from './AddMessageForm/AddMessageForm.js';

const Dialogs: React.FC<PropsType> = (props) => {
	let state = props.dialogsPage;

	let dialogsElements = state.dialogsData.map((el) => (
		<DialogItem name={el.name} key={el.id} id={el.id} />
	));

	let messagesElements = state.messagesData.map((el) => (
		<Message message={el.message} key={el.id} id={el.id} />
	));

	let addNewMessage = (values: NewMessageFormValuesType) => {
		props.sendMessage(values.newMessageBody);
	};

	return (
		<div className={classes.dialogs}>
			<div className={classes.dialogsItems}>{dialogsElements}</div>
			<div className={classes.messages}>
				<div>{messagesElements}</div>
			</div>

			<AddMessageForm //@ts-ignore
				onSubmit={addNewMessage}
			/>
		</div>
	);
};

export default Dialogs;

//типы
type PropsType = {
	dialogsPage: InitialStateType;
	sendMessage: (messageText: string) => void;
};

export type NewMessageFormValuesType = {
	newMessageBody: string;
};
