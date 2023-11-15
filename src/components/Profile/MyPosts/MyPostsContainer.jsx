import { actions } from '../../../redux/profileReducer.ts';
import MyPosts from './MyPosts';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
	return {
		post: state.profilePage.postData,
		newPostText: state.profilePage.newPostText,
	};
};
let mapDispatchToProps = (dispatch) => {
	return {
		addPost: (newPostText) => {
			dispatch(actions.addPostActionCreator(newPostText));
		},
	};
};
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
