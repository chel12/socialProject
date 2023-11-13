import React from 'react';
import Profile from './Profile';
import {
	getUserProfile,
	getStatus,
	updateStatus,
	savePhoto,
	saveProfile,
} from '../../redux/profileReducer.ts';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

export function withRouter(Children) {
	return (props) => {
		const match = { params: useParams() };
		return <Children {...props} match={match} />;
	};
}
class ProfileContainer extends React.Component {
	refreshProfile = () => {
		let userId = this.props.match.params.userId; //match из визроутера ( HOC)
		if (!userId) {
			userId = this.props.authorizedUserId;
			if (!userId) {
				this.props.history.push('/login'); //системный ридерект
			}
		}
		this.props.getUserProfile(userId);
		this.props.getStatus(userId);
	};
	componentDidMount() {
		this.refreshProfile();
	}
	componentDidUpdate(prevProps, prevState) {
		if (this.props.match.params.userId != this.props.match.params.userId) {
			this.refreshProfile();
		}
	}
	render() {
		return (
			<Profile
				{...this.props}
				isOwner={!this.props.match.params.userId}
				profile={this.props.profile}
				status={this.props.status}
				updateStatus={this.props.updateStatus}
				savePhoto={this.props.savePhoto}
			/>
		);
	}
}

let mapStateToProps = (state) => ({
	profile: state.profilePage.profile,
	status: state.profilePage.status,
	authorizedUserId: state.auth.userId,
	isAuth: state.auth.isAuth,
});

export default compose(
	connect(mapStateToProps, {
		getUserProfile,
		getStatus,
		updateStatus,
		savePhoto,
		saveProfile,
	}),
	withRouter,
	withAuthRedirect
)(ProfileContainer);
