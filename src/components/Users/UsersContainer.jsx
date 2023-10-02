import React from 'react';
import { connect } from 'react-redux';
import Users from './Users';
import {
	follow,
	setCurrentPage,
	unfollow,
	getUsers,
	toggleFollowingProgress,
} from '../../redux/usersReducer';
import Preloader from '../common/Preloader/Preloader';
import { compose } from 'redux';
class UsersContainer extends React.Component {
	componentDidMount() {
		this.props.getUsers(this.props.currentPage, this.props.pageSize);
	}
	onPageChanged = (pageNumber) => {
		this.props.getUsers(this.props.pageNumber, this.props.pageSize);
	};
	render() {
		return (
			<>
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

let mapStateToProps = (state) => {
	return {
		users: state.usersPage.users,
		pageSize: state.usersPage.pageSize,
		setUsersTotalCount: state.usersPage.setUsersTotalCount,
		currentPage: state.usersPage.currentPage,
		isFetching: state.usersPage.isFetching,
		followingInProgress: state.usersPage.followingInProgress,
	};
};

export default compose(
	connect(mapStateToProps, {
		follow,
		unfollow,
		setCurrentPage,
		toggleFollowingProgress,
		getUsers,
	})
)(UsersContainer);
