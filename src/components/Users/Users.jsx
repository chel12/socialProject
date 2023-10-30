import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import styles from './users.module.css';
let Users = ({
	currentPage,
	onPageChanged,
	setUsersTotalCount,
	pageSize,
	users,
	...props
}) => {
	return (
		<div className={styles.usersContainer}>
			<Paginator
				currentPage={currentPage}
				onPageChanged={onPageChanged}
				setUsersTotalCount={setUsersTotalCount}
				pageSize={pageSize}
			/>
			<div>
				{users.map((u) => (
					<User
						key={u.id}
						user={u}
						followingInProgress={props.followingInProgress}
						unfollow={props.unfollow}
						follow={props.follow}
					/>
				))}
			</div>
		</div>
	);
};
export default Users;
