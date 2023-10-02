import React from 'react';
import classes from './ProfileInfo.module.css';
class ProfileStatus extends React.Component(this.props) {
	render() {
		return (
			<div>
				<div>
					<span>{this.props.status}</span>
				</div>
				<div>
					<input value={this.props.status}></input>
				</div>
			</div>
		);
	}
}

export default ProfileStatus;
