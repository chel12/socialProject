import React, { useEffect, useState } from 'react';
import styles from './Paginator.module.css';
let Paginator = ({
	setUsersTotalCount,
	pageSize,
	currentPage,
	onPageChanged,
	portionSize = 10,
}) => {
	let pagesCount = Math.ceil(setUsersTotalCount / pageSize);
	let pages = [];
	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i);
	}
	let portionCount = Math.ceil(pagesCount / portionSize);
	let [portionNumber, setPortionNumber] = useState(1);
	let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
	let rightPortionPageNumber = portionNumber * portionSize;
	useEffect(
		() => setPortionNumber(Math.ceil(currentPage / portionSize)),
		[currentPage]
	);
	return (
		<div className={styles.paginator}>
			{portionNumber > 1 && (
				<button
					onClick={() => {
						setPortionNumber(portionNumber - 1);
					}}>
					&#8592;
				</button>
			)}
			{pages
				.filter(
					(p) =>
						p >= leftPortionPageNumber &&
						p <= rightPortionPageNumber
				)
				.map((p) => {
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
			{portionCount > portionNumber && (
				<button
					onClick={() => {
						setPortionNumber(portionNumber + 1);
					}}>
					&#8594;
				</button>
			)}
		</div>
	);
};
export default Paginator;
