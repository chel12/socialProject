import './App.css';
import React, { ComponentType, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer, {
	withRouter,
} from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { Provider, connect } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import { compose } from 'redux';
import Preloader from './components/common/Preloader/Preloader';
import Page404 from './components/Pages/Page404';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import Home from './components/Home/Home';
import UsersPage from './components/Users/UsersContainer';
import { BrowserRouter } from 'react-router-dom';
import store, { AppStateType } from './redux/redux-store';
import ChatPage from './pages/Chat/ChatPage';


// const DialogsContainer = lazy(() =>
// 	import('./components/Dialogs/DialogsContainer')
// );
const ChatPages = React.lazy(() =>
	import('./components/Dialogs/DialogsContainer')
);

class App extends React.Component<MapPropsType & DispatchPropsType> {
	catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
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
									element={<DialogsContainer />}>

								</Route>
								<Route path="/home" element={<Home />}></Route>
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
									element={
										<UsersPage
											pageTitle={'Пользователи '}
										/>
									}></Route>
								<Route
									path="/login"
									element={<Login />}></Route>
								<Route path="*" element={<Page404 />}></Route>
								<Route
									path="/chat"
									element={<ChatPage />}></Route>
							</Routes>
						</Suspense>
					</div>
				</div>
			);
		}
	}
}
const mapStateToProps = (state: AppStateType) => ({
	initialized: state.app.initialized,
});

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
	initializeApp: () => void;
};

let AppContainer = compose<ComponentType>(
	withRouter,
	connect(mapStateToProps, { initializeApp })
)(App);

const SamuraiJSApp: React.FC = () => {
	return (
		<BrowserRouter>
			<Provider store={store}>
				<AppContainer />
			</Provider>
		</BrowserRouter>
	);
};
export default SamuraiJSApp;
// export default compose(
// 	withRouter,
// 	connect(mapStateToProps, { initializeApp })
// )(App);
