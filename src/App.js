import './App.css';
import Header from './components/Header/Header';
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
								<Dialogs state={props.state.dialogsPage} />
							}></Route>
						<Route
							path="/profile"
							element={
								<Profile state={props.state.profilePage} />
							}></Route>
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
