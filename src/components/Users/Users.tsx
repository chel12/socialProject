import React, { useEffect } from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import styles from './users.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
	GetFollowingInProgress,
	getCurrentPage,
	getPageSize,
	getUsers,
	getUsersTotalCount,
} from '../../redux/users-selectors';
import { FilterType, requestUsers } from '../../redux/usersReducer';
import { AppDispatch } from '../../redux/redux-store';
import { AnyAction } from 'redux';
import { Formik } from 'formik';
import UsersSearchForm from './UsersSearchForm';

export const Users: React.FC = () => {
	const users = useSelector(getUsers);
	const setUsersTotalCount = useSelector(getUsersTotalCount);
	const currentPage = useSelector(getCurrentPage);
	const pageSize = useSelector(getPageSize);
	const followingInProgress = useSelector(GetFollowingInProgress);

	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		dispatch(
			requestUsers(currentPage, pageSize, '') as unknown as AnyAction
		);
	}, []);

	const onPageChanged = (pageNumber: number) => {
		dispatch(
			requestUsers(pageNumber, pageSize, '') as unknown as AnyAction
		);
	};

	const unfollow = (userId: number) => {
		dispatch(follow(userId) as unknown as AnyAction);
	};
	const follow = (userId: number) => {
		dispatch(unfollow(userId) as unknown as AnyAction);
	};
	const onFilterChanged = (filter: FilterType) => {
		dispatch(
			requestUsers(1, pageSize, filter.term) as unknown as AnyAction
		);
	};

	return (
		<div className={styles.usersContainer}>
			<UsersSearchForm onFilterChanged={onFilterChanged} />
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
						followingInProgress={followingInProgress}
						unfollow={unfollow}
						follow={follow}
					/>
				))}
			</div>
		</div>
	);
};
