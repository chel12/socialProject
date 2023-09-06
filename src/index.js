import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
let postData = [
	{ id: 1, message: 'Hello', likeCount: 2 },
	{ id: 2, message: 'Moto Moto', likeCount: 12 },
	{ id: 3, message: 'Ahaha,cool', likeCount: 22 },
];
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
let messagesData = [
	{ id: 1, message: 'Hello' },
	{ id: 2, message: 'You Best' },
	{ id: 3, message: 'Ahaha,cool' },
];
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App
			postData={postData}
			dialogsData={dialogsData}
			messagesData={messagesData}
		/>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
