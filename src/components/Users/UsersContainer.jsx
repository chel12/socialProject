import React from 'react';
import { connect } from 'react-redux';
import Users from './Users';
import {
	follow,
	setCurrentPage,
	unfollow,
	requestUsers,
	toggleFollowingProgress,
} from '../../redux/usersReducer';
import Preloader from '../common/Preloader/Preloader';
import { compose } from 'redux';
import {
	getCurrentPage,
	GetFollowingInProgress,
	getIsFetching,
	getPageSize,
	getUsers,
	getUsersTotalCount,
} from '../../redux/users-selectors';
class UsersContainer extends React.Component {
	componentDidMount() {
		const { currentPage, pageSize } = this.props;
		this.props.requestUsers(currentPage, pageSize);
	}
	onPageChanged = (pageNumber) => {
		const { pageSize } = this.props;
		this.props.requestUsers(pageNumber, pageSize);
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
		users: getUsers(state),
		pageSize: getPageSize(state),
		setUsersTotalCount: getUsersTotalCount(state),
		currentPage: getCurrentPage(state),
		isFetching: getIsFetching(state),
		followingInProgress: GetFollowingInProgress(state),
	};
};

export default compose(
	connect(mapStateToProps, {
		follow,
		unfollow,
		setCurrentPage,
		toggleFollowingProgress,
		requestUsers,
	})
)(UsersContainer);
