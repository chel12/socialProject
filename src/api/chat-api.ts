let subscribers = [] as SubscriberType[];
//массив подписчиков
let wsr: WebSocket;
//
const closeHandler = () => {
	setTimeout(createChannel, 5000);
};
//
const messageHandler = (e: MessageEvent) => {
	const newMessages = JSON.parse(e.data); //получаем и парсим и получаем массивы новых сообщений
	subscribers.forEach((s) => s(newMessages)); //пробегаемся и каждому подписчику передаём новые сообщения
	//из события достать обьекты дата
};
//
function createChannel() {
	wsr?.removeEventListener('close', closeHandler); //отписка от события
	wsr?.close();
	wsr = new WebSocket(
		'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx' //создание веб сокета
	);
	wsr?.addEventListener('close', closeHandler);
}

//

export const chatAPI = {
	subscribe(callback: SubscriberType) {
		subscribers.push(callback);
		return () => {
			//1 способ отписки
			//отписка
			subscribers = subscribers.filter((s) => s !== callback);
			//присвоить подписчиков в которых пускаем только тек подписчика который не равен колбеку
		};
	},
	//2 способ отписки
	unsubscribe(callback: SubscriberType) {
		subscribers = subscribers.filter((s) => s !== callback);
	},
}; //делаем подписчика

//типы
type ChatMessageType = {
	message: string;
	photo: string;
	userId: number;
	userName: string;
};

type SubscriberType = (messages: ChatMessageType[]) => void; //подписчик в тип запихали
