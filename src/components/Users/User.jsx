import userPhoto from './../../img/avatar-small.jfif';
import React from 'react';
import styles from './users.module.css';
import { NavLink } from 'react-router-dom';

let User = ({ user, followingInProgress, unfollow, follow }) => {
	return (
		<div className={styles.usersItem}>
			<span>
				<div>
					<NavLink to={'./../profile/' + user.id}>
						<img
							src={
								user.photos.small != null
									? user.photos.small
									: userPhoto
							}
							className={styles.userPhoto}
						/>
					</NavLink>
				</div>

				<div>
					{user.followed ? (
						<button
							disabled={followingInProgress.some(
								(id) => id === user.id
							)}
							onClick={() => {
								unfollow(user.id);
							}}>
							Unfollow
						</button>
					) : (
						<button
							disabled={followingInProgress.some(
								(id) => id === user.id
							)}
							onClick={() => {
								follow(user.id);
							}}>
							Follow
						</button>
					)}
				</div>
			</span>
			<span>
				<span>
					<div>{'----------------'}</div>
				</span>
				<span>
					<div>{user.name}</div>
					<div>{user.status}</div>
				</span>
				<span>
					<div>{'----------------'}</div>
				</span>
			</span>
		</div>
	);
};

export default User;
