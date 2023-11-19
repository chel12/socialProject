import React from 'react';
import { useSelector } from 'react-redux';
import Preloader from '../common/Preloader/Preloader';
import { getIsFetching } from '../../redux/users-selectors';
import { Users } from './Users';


// type MapStatePropsType = {
	//пропсы которые берутся из mapStateToProps
// 	currentPage: number;
// 	pageSize: number;
// 	isFetching: boolean;
// 	setUsersTotalCount: number;
// 	users: Array<UserType>;
// 	followingInProgress: Array<number>;
// };
// type MapDispatchPropsType = {
	//пропсы mapDispatcha
// 	unfollow: (userId: number) => void;
// 	follow: (userId: number) => void;
// 	requestUsers: (currentPage: number, pageSize: number) => void;
// };
// type OwnPropsType = {
// 	//прочие пропсы которые в тег пихаем напрямую
// 	pageTitle: string;
// };
// type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType; //общий тип из мелких типов для каждых пропсов
type UsersPagePropsType = {
	pageTitle: string;
	
};
const UsersPage: React.FC<UsersPagePropsType> = (props) => {
	const isFetching = useSelector(getIsFetching);
	return (
		<>
			<h2>{props.pageTitle}</h2>
			{isFetching ? <Preloader /> : null}
			<Users/>
	</>
	);
};
export default UsersPage;
