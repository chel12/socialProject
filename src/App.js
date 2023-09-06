import './App.css';
import { Route, Routes } from 'react-router';
import Header from './components/Header/Header';
import Dialogs from './components/Dialogs/Dialogs';
import Profile from './components/Profile/Profile';
import Navbar from './components/Navbar/Navbar';
import { addPost } from './redux/state';

function App(props) {
	return (
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
							<Profile
								state={props.state.profilePage}
								addPost={addPost}
							/>
						}></Route>
				</Routes>
			</div>
		</div>
	);
}

export default App;
