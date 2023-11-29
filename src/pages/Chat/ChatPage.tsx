import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import {
	sendMessage,
	startMessagesListening,
	stopMessagesListening,
} from '../../redux/chat-reducer';
import store, { AppStateType } from '../../redux/redux-store';

export type AppDispatch = ThunkDispatch<AppStateType, any, AppAction>;
type AppAction = ReturnType<typeof store.dispatch>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
//для диспатча типизация

export type ChatMessageType = {
	//тип того что с сервака приходит
	message: string;
	photo: string;
	userId: number;
	userName: string;
};

const ChatPage: React.FC = () => {
	return (
		<div>
			<Chat />
		</div>
	);
};

const Chat: React.FC = () => {
	const dispatch: AppDispatch = useDispatch();
	useEffect(() => {
		dispatch(startMessagesListening());
		return () => {
			dispatch(stopMessagesListening());
		};
	}, []);

	return (
		<div>
			<Messages />
			<AddMessageForm />
		</div>
	);
};
const Messages: React.FC<{}> = () => {
	const messages = useSelector((state: AppStateType) => state.chat.messages);

	return (
		<div style={{ height: '400px', overflowY: 'auto' }}>
			{messages.map((m, index) => (
				<Message key={index} message={m} />
			))}
		</div> //перебираем и передаем в компоненту сообщения
	);
};

const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {
	//дастать пропсы сообщения
	return (
		<div>
			<img style={{ width: '40px' }} src={message.photo} />

			<b>{message.userName}</b>
			<br />
			{message.message}
			<hr />
		</div>
	);
};
const AddMessageForm: React.FC<{}> = () => {
	const [message, setMessage] = useState('');
	const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>(
		'pending'
	);
	const dispatch: AppDispatch = useDispatch();

	const sendMessageHandler = () => {
		if (!message) {
			return;
		} else {
			dispatch(sendMessage(message));
			setMessage(' ');
		}
	};
	return (
		<div>
			<div>
				<textarea
					onChange={(e) => setMessage(e.currentTarget.value)}
					value={message}></textarea>
			</div>
			<div>
				<button onClick={sendMessageHandler}>Send</button>
			</div>
		</div>
	);
};

export default ChatPage;
