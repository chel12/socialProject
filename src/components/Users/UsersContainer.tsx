import React from 'react';
import { connect } from 'react-redux';
import Users from './Users.tsx';

import { follow, unfollow, requestUsers } from '../../redux/usersReducer.ts';
import Preloader from '../common/Preloader/Preloader';
import { compose } from 'redux';
import {
	getCurrentPage,
	GetFollowingInProgress,
	getIsFetching,
	getPageSize,
	getUsers,
	getUsersTotalCount,
} from '../../redux/users-selectors.ts';
import { UserType } from '../../types/types';
import { AppStateType } from '../../redux/redux-store';

type MapStatePropsType = {
	//пропсы которые берутся из mapStateToProps
	currentPage: number;
	pageSize: number;
	isFetching: boolean;
	setUsersTotalCount: number;
	users: Array<UserType>;
	followingInProgress: Array<number>;
};
type MapDispatchPropsType = {
	//пропсы mapDispatcha
	unfollow: (userId: number) => void;
	follow: (userId: number) => void;
	requestUsers: (currentPage: number, pageSize: number) => void;
};
type OwnPropsType = {
	//прочие пропсы которые в тег пихаем напрямую
	pageTitle: string;
};
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType; //общий тип из мелких типов для каждых пропсов

// type PropsType = { обьединение всех пропсов выше
// 	//делаем тип для пропсов и описываем что у нас тут
// 	pageTitle: string;
// 	currentPage: number;
// 	pageSize: number;
// 	isFetching: boolean;
// 	setUsersTotalCount: number;
// 	users: Array<UserType>;

// 	//колбеки снизу
// 	unfollow: () => void;
// 	follow: () => void;
// 	followingInProgress: Array<number>;
// 	requestUsers: (currentPage: number, pageSize: number) => void;
// };

class UsersContainer extends React.Component<PropsType> {
	//типизация для пропсов которые принимаем
	componentDidMount() {
		const { currentPage, pageSize } = this.props;
		this.props.requestUsers(currentPage, pageSize);
	}
	onPageChanged = (pageNumber: number) => {
		const { pageSize } = this.props;
		this.props.requestUsers(pageNumber, pageSize);
	};
	render() {
		return (
			<>
				<h2>{this.props.pageTitle}</h2>
				{this.props.isFetching ? (
					<Preloader />
				) : (
					<Users
						setUsersTotalCount={this.props.setUsersTotalCount}
						pageSize={this.props.pageSize}
						currentPage={this.props.currentPage}
						onPageChanged={this.onPageChanged}
						users={this.props.users}
						unfollow={this.props.unfollow}
						follow={this.props.follow}
						followingInProgress={this.props.followingInProgress}
					/>
				)}
			</>
		);
	}
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
	return {
		users: getUsers(state),
		pageSize: getPageSize(state),
		setUsersTotalCount: getUsersTotalCount(state),
		currentPage: getCurrentPage(state),
		isFetching: getIsFetching(state),
		followingInProgress: GetFollowingInProgress(state),
	};
};

export default compose(
	connect<
		MapStatePropsType,
		MapDispatchPropsType,
		OwnPropsType,
		AppStateType
	>(mapStateToProps, {
		follow,
		unfollow,
		requestUsers,
	})
	//@ts-ignore
)(UsersContainer);
