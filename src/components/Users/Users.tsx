import React from 'react';
import Paginator from '../common/Paginator/Paginator.tsx';
import User from './User';
import styles from './users.module.css';
import { UserType } from '../../types/types.ts';

type PropsType = {
	setUsersTotalCount: number;
	pageSize: number;
	currentPage: number;
	onPageChanged: (pageNumber: number) => void;
	users: Array<UserType>;
	followingInProgress: Array<number>;
	unfollow: (userId: number) => void;
	follow: (userId: number) => void;
};

let Users: React.FC<PropsType> = ({
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
