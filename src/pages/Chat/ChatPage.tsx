import React, { useEffect, useState } from 'react';

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
	// Так замудренно для того чтобы не было утечки памяти
	const [ws, setWs] = useState<WebSocket | null>(null);

	useEffect(() => {
		let wsr: WebSocket;
		const closeHandler = () => {
			setTimeout(createChannel, 5000);
		};

		function createChannel() {
			wsr?.removeEventListener('close', closeHandler);
			wsr?.close();

			wsr = new WebSocket(
				'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'
			);
			wsr?.addEventListener('close', closeHandler);
			setWs(wsr);
		}
		createChannel();

		return () => {
			// это как componentDidUnmoant (делает зачистку)
			wsr.removeEventListener('close', closeHandler);
			wsr.close(); //закрыть канал
		};
	}, []);

	return (
		<div>
			<Messages ws={ws} />
			<AddMessageForm ws={ws} />
		</div>
	);
};
const Messages: React.FC<{ ws: WebSocket | null }> = ({ ws }) => {
	const [messages, setMessages] = useState<ChatMessageType[]>([]);
	//для синхронизации

	useEffect(() => {
		let messageHandler = (e: MessageEvent) => {
			let newMessages = JSON.parse(e.data);
			setMessages((prevMessages) => [...prevMessages, ...newMessages]); //из события достать обьекты дата
		};
		ws?.addEventListener('message', messageHandler);

		return () => {
			ws?.removeEventListener('message', messageHandler);
		};
	}, [ws]);

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
const AddMessageForm: React.FC<{ ws: WebSocket | null }> = ({ ws }) => {
	const [message, setMessage] = useState('');
	const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>(
		'pending'
	);

	useEffect(() => {
		let openHandler = () => {
			setReadyStatus('ready');
		};
		ws?.addEventListener('open', openHandler);
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
