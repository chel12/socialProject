import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import {
	sendMessage,
	startMessagesListening,
	stopMessagesListening,
} from '../../redux/chat-reducer';
import store, { AppStateType } from '../../redux/redux-store';
import { ChatMessageApiType } from '../../api/chat-api';

export type AppDispatch = ThunkDispatch<AppStateType, any, AppAction>;
type AppAction = ReturnType<typeof store.dispatch>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
//для диспатча типизация


const ChatPage: React.FC = () => {
	return (
		<div>
			<Chat />
		</div>
	);
};

const Chat: React.FC = () => {
	const status = useSelector((state: AppStateType) => state.chat.status);
	const dispatch: AppDispatch = useDispatch();
	useEffect(() => {
		dispatch(startMessagesListening());
		return () => {
			dispatch(stopMessagesListening());
		};
	}, []);

	return (
		<div>
			{status === 'error' && <div> Refresh Page </div>}

			<>
				<div>
					<Messages />
					<AddMessageForm />
				</div>
			</>
		</div>
	);
};
const Messages: React.FC<{}> = () => {
	const messages = useSelector((state: AppStateType) => state.chat.messages);
	const messagesAnchorRef = useRef<HTMLDivElement>(null);
	const [isAutoScroll, setIsAutoScroll] = useState(false); //чтобы за параметрами не было авто скролла
	const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
		//скролл
		var element = e.currentTarget;
		if (
			//условия скролла
			Math.abs(
				element.scrollHeight - element.scrollTop - element.clientHeight
			) < 300
		) {
			!isAutoScroll && setIsAutoScroll(true);
		} else {
			isAutoScroll && setIsAutoScroll(false);
		}
	};
	//делаем якорь через ref и пустой див и затем при синхронизации нативным JS крутим к нему
	useEffect(() => {
		if (isAutoScroll) {
			messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' });
		}
	}, [messages]);

	return (
		<div
			style={{ height: '400px', overflowY: 'auto' }}
			onScroll={scrollHandler}>
			{messages.map((m, index) => (
				<Message key={m.id} message={m} />
			))}
			<div ref={messagesAnchorRef}></div>
		</div> //перебираем и передаем в компоненту сообщения
	);
};

const Message: React.FC<{ message: ChatMessageApiType }> = React.memo(
	//мемоизация чтобы сообещеньки не перерисовывались
	({ message }) => {
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
	}
);
const AddMessageForm: React.FC<{}> = () => {
	const [message, setMessage] = useState('');
	const status = useSelector((state: AppStateType) => state.chat.status);

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
				<button
					disabled={status !== 'ready'}
					onClick={sendMessageHandler}>
					Send
				</button>
			</div>
		</div>
	);
};

export default ChatPage;
