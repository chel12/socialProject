import React from 'react';
import styles from './Paginator.module.css';
let Paginator = ({
	setUsersTotalCount,
	pageSize,
	currentPage,
	onPageChanged,
}) => {
	let pagesCount = Math.ceil(setUsersTotalCount / pageSize);
	let pages = [];
	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i);
	}
	return (
		<div>
			{pages.map((p) => {
				return (
					<span
						onClick={(e) => {
							onPageChanged(p);
						}}
						className={
							currentPage === p
								? styles.selectedPage
								: styles.paginationPage
						}>
						{p}
					</span>
				);
			})}
		</div>
	);
};
export default Paginator;
