const subscribers = {
	'message-received': [] as MessagesReceivedSubscriberType[],
	'status-changed': [] as StatusChangedSubscriberType[],
};

//массив подписчиков
let wsr: WebSocket | null = null;

type EventsNamesType = 'message-received' | 'status-changed';
//
const closeHandler = () => {
	notifySubscribersAboutStatus('pending');
	setTimeout(createChannel, 5000);
};
//
const messageHandler = (e: MessageEvent) => {
	const newMessages = JSON.parse(e.data); //получаем и парсим и получаем массивы новых сообщений
	subscribers['message-received'].forEach((s) => s(newMessages)); //пробегаемся и каждому подписчику передаём новые сообщения
	//из события достать обьекты дата
};
const openHandler = () => {
	notifySubscribersAboutStatus('ready');
};
const errorHandler = () => {
	notifySubscribersAboutStatus('error');
	console.log('Error, RELOAD PAGE');
};

const cleanUp = () => {
	wsr?.removeEventListener('close', closeHandler); //отписка от события
	wsr?.removeEventListener('message', messageHandler); //отписка от сообщений
	wsr?.removeEventListener('open', openHandler); //отписка от события
	wsr?.removeEventListener('error', errorHandler); //отписка от сообщений
};

const notifySubscribersAboutStatus = (status: StatusType) => {
	//чтобы не писать и не делать дубли
	subscribers['status-changed'].forEach((s) => s(status));
};

//
function createChannel() {
	cleanUp();
	wsr?.close();
	wsr = new WebSocket(
		'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx' //создание веб сокета
	);
	notifySubscribersAboutStatus('pending');
	wsr?.addEventListener('close', closeHandler);
	wsr?.addEventListener('message', messageHandler);
	wsr?.addEventListener('open', openHandler);
	wsr?.addEventListener('error', errorHandler);
}

//

export const chatAPI = {
	start() {
		createChannel();
	},
	stop() {
		subscribers['message-received'] = [];
		subscribers['status-changed'] = [];
		cleanUp();
		wsr?.close();
	},
	subscribe(
		eventName: EventsNamesType,
		callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType
	) {
		//@ts-ignore
		subscribers[eventName].push(callback);
		return () => {
			//1 способ отписки
			//отписка
			//@ts-ignore
			subscribers[eventName] = subscribers[eventName].filter(
				//@ts-ignore
				(s) => s !== callback
			);
			//присвоить подписчиков в которых пускаем только тек подписчика который не равен колбеку
		};
	},
	//2 способ отписки
	unsubscribe(
		eventName: EventsNamesType,
		callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType
	) {
		//@ts-ignore
		subscribers[eventName] = subscribers[eventName].filter(
			//@ts-ignore
			(s) => s !== callback
		);
	},
	sendMessage(message: string) {
		wsr?.send(message);
	},
}; //делаем подписчика

//типы
export type ChatMessageApiType = {
	message: string;
	photo: string;
	userId: number;
	userName: string;

};

type MessagesReceivedSubscriberType = (messages: ChatMessageApiType[]) => void; //подписчик в тип запихали
type StatusChangedSubscriberType = (status: StatusType) => void; //подписчик в тип запихали
export type StatusType = 'pending' | 'ready' | 'error';
