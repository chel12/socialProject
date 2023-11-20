import React from 'react';
import s from './MyPost.module.css';
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form';
import {
	maxLengthCreator,
	required,
} from '../../../utils/validators/validators';
import { TextArea } from '../../common/FormsControl/FormsControls';

const maxLength10 = maxLengthCreator(10);
const AddNewPostForm = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<Field
				placeholder="Введите сообщение поста"
				name="newPostText"
				component={TextArea}
				validate={[required, maxLength10]}
			/>
			<div>
				<button>Add post </button>
			</div>
		</form>
	);
};

type AddPostFormValuesType = {
	newPostText: string;
};

const AddNewPostFormRedux = reduxForm({
	form: 'ProfileAddNewPostForm',
})(AddNewPostForm);

const MyPosts = React.memo((props) => {
	let postElements = props.post.map((el) => (
		<Post text={el.message} like={el.likeCount} id={el.id} key={el.id} />
	));
	//ссылочку делаем на значения
	let newPostElement = React.createRef();
	//добавляем значения из текстареа и обнуляем текстареа
	let onAddPost = (values) => {
		props.addPost(values.newPostText);
	};

	return (
		<div className={s.newPost}>
			<div>
				<AddNewPostFormRedux onSubmit={onAddPost} />
			</div>
			<div className={s.posts}>{postElements}</div>
		</div>
	);
});

export default MyPosts;
