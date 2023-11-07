import './App.css';
import React, { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import Navbar from './components/Navbar/Navbar';
// import DialogsContainer from './components/Dialogs/DialogsContainer';

import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer, {
	withRouter,
} from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import { connect } from 'react-redux';
import { initializeApp } from './redux/app-reducer.ts';
import { compose } from 'redux';
import Preloader from './components/common/Preloader/Preloader';
import Page404 from './components/Pages/Page404';
const DialogsContainer = lazy(() =>
	import('./components/Dialogs/DialogsContainer')
);
class App extends React.Component {
	catchAllUnhandledErrors = (promiseRejectionEvent) => {
		alert('some error occured');
		// console.error(promiseRejectionEvent);
	};
	componentDidMount() {
		this.props.initializeApp();
		window.addEventListener(
			//sideEffect
			'unhandledrejection',
			this.catchAllUnhandledErrors
		);
	}

	componentWillUnmount() {
		window.removeEventListener(
			//sideEffect чистка  (компонента уходит и это уборка мусора)
			'unhandledrejection',
			this.catchAllUnhandledErrors
		);
	}

	render() {
		if (!this.props.initialized) {
			return <Preloader />;
		} else {
			return (
				<div className="app-wrapper">
					<HeaderContainer />
					<Navbar />
					<div className="app-wrapper-conten">
						<Suspense fallback={<Preloader />}>
							<Routes>
								<Route
									path="/"
									element={<Navigate to="/profile" />}
								/>
								<Route
									path="/dialogs"
									element={<DialogsContainer />}></Route>
								<Route
									path="/profile"
									element={<ProfileContainer />}>
									<Route
										path=":userId"
										element={<ProfileContainer />}
									/>
								</Route>
								<Route
									path="/users"
									element={<UsersContainer />}></Route>
								<Route
									path="/login"
									element={<LoginPage />}></Route>
								<Route path="*" element={<Page404 />}></Route>
							</Routes>
						</Suspense>
					</div>
				</div>
			);
		}
	}
}
const mapStateToProps = (state) => ({ initialized: state.app.initialized });

export default compose(
	withRouter,
	connect(mapStateToProps, { initializeApp })
)(App);
