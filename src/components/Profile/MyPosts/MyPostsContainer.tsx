import { actions } from '../../../redux/profileReducer';
import MyPosts from './MyPosts';
import { connect } from 'react-redux';

let mapStateToProps = (state: any) => {
	return {
		post: state.profilePage.postData,
		newPostText: state.profilePage.newPostText,
	};
};
let mapDispatchToProps = (dispatch: any) => {
	return {
		addPost: (newPostText: any) => {
			dispatch(actions.addPostActionCreator(newPostText));
		},
	};
};
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
