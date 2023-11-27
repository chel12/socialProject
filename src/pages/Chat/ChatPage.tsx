import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	startMessagesListening,
	stopMessagesListening,
} from '../../redux/chat-reducer';
import { AppStateType } from '../../redux/redux-store';

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
	const dispatch = useDispatch();
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

	useEffect(() => {
		let openHandler = () => {
			setReadyStatus('ready');
		};
		ws?.addEventListener('open', openHandler); //подписка на событие
		return () => {
			ws?.removeEventListener('open', openHandler);
		};
	}, [ws]);

	const sendMessage = () => {
		if (!message) {
			return;
		} else {
			ws?.send(message);
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
				<button
					onClick={sendMessage}
					disabled={ws === null || readyStatus !== 'ready'}>
					Send
				</button>
			</div>
		</div>
	);
};

export default ChatPage;
