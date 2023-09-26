import userPhoto from './../../img/avatar-small.jfif';
import React from 'react';
import styles from './users.module.css';
import { NavLink } from 'react-router-dom';
import axios, * as others from 'axios';
let Users = (props) => {
	//   let pagesCount = Math.ceil(props.setUsersTotalCount / props.pageSize);
	let pages = [];
	for (let i = 1; i <= 10; i++) {
		pages.push(i);
	}
	return (
		<div>
			<div>
				{pages.map((p) => {
					return (
						<span
							onClick={(e) => {
								props.onPageChanged(p);
							}}
							className={
								props.currentPage === p
									? styles.selectedPage
									: styles.paginationPage
							}>
							{p}
						</span>
					);
				})}
			</div>
			{props.users.map((u) => (
				<div key={u.id} className={styles.usersItem}>
					<span>
						<div>
							<NavLink to={'./../profile/' + u.id}>
								<img
									src={
										u.photos.small != null
											? u.photos.small
											: userPhoto
									}
									className={styles.userPhoto}
								/>
							</NavLink>
						</div>
						<div>
							{u.followed ? (
								<button
									onClick={() => {
										axios
											.delete(
												`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,

												{
													withCredentials: true,
												}
											)
											.then((response) => {
												if (
													response.data.resultCode ===
													0
												) {
													props.unfollow(u.id);
												}
											});
									}}>
									Unfollow
								</button>
							) : (
								<button
									onClick={() => {
										axios
											.post(
												`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
												{},
												{
													withCredentials: true,
												}
											)
											.then((response) => {
												if (
													response.data.resultCode ===
													0
												) {
													props.follow(u.id);
												}
											});
									}}>
									Follow
								</button>
							)}
						</div>
					</span>
					<span>
						<span>
							<div>{u.name}</div>
							<div>{u.status}</div>
						</span>
						<span>
							<div>{'u.location.country'}</div>
							<div>{'u.location.city'}</div>
						</span>
					</span>
				</div>
			))}
		</div>
	);
};
export default Users;
