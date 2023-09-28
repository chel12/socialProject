import userPhoto from './../../img/avatar-small.jfif';
import React from 'react';
import styles from './users.module.css';
import { NavLink } from 'react-router-dom';
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
									disabled={props.followingInProgress.some(
										(id) => id === u.id
									)}
									onClick={() => {
										props.unfollow(u.id);
									}}>
									Unfollow
								</button>
							) : (
								<button
									disabled={props.followingInProgress.some(
										(id) => id === u.id
									)}
									onClick={() => {
										props.follow(u.id);
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
