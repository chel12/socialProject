import './App.css';
import Header from './components/Header/Header';
import Nav from './components/Navbar/Navbar';
import Content from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Profile from './components/Profile/Profile';
import Navbar from './components/Navbar/Navbar';
function App(props) {
	return (
		<BrowserRouter>
			<div className="app-wrapper">
				<Header />
				<Navbar />
				<div className="app-wrapper-conten">
					<Routes>
						<Route
							path="/dialogs"
							element={
								<Dialogs
									dialogsData={props.dialogsData}
									messagesData={props.messagesData}
								/>
							}></Route>
						<Route
							path="/profile"
							element={
								<Profile postData={props.postData} />
							}></Route>
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
