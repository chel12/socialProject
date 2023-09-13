import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router';
import Header from './components/Header/Header';
import Dialogs from './components/Dialogs/Dialogs';
import Profile from './components/Profile/Profile';
import Navbar from './components/Navbar/Navbar';

function App(props) {
	return (
		<div className="app-wrapper">
			<Header />
			<Navbar />
			<div className="app-wrapper-conten">
				<Routes>
					<Route
						path="/dialogs"
						element={<Dialogs store={props.store} />}></Route>
					<Route
						path="/profile"
						element={
							<Profile
								dispatch={props.dispatch}
								profilePage={props.state.profilePage}
							/>
						}></Route>
				</Routes>
			</div>
		</div>
	);
}

export default App;
