import React from 'react';
import s from './MyPost.module.css';
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form';
import {
	maxLengthCreator,
	required,
} from '../../../utils/validators/validators';
import { TextArea } from '../../common/FormsControl/FormsControls';
import { GetStringKeys, PostDataType } from '../../../types/types';

type PropsType = {
	posts: Array<PostDataType>;
	addPost: (newPostText: string) => void;
};

const maxLength10 = maxLengthCreator(10);
const AddNewPostForm: React.FC<any> = (props) => {
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
type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>;

const AddNewPostFormRedux = reduxForm<AddPostFormValuesType, PropsType>({
	form: 'ProfileAddNewPostForm',
})(AddNewPostForm);

const MyPosts: React.FC<PropsType> = (props) => {
	let postElements = [...props.posts]
		.reverse()
		.map((el) => (
			<Post text={el.message} like={el.likeCount} key={el.id} />
		));
	//ссылочку делаем на значения
	let newPostElement = React.createRef();
	//добавляем значения из текстареа и обнуляем текстареа
	let onAddPost = (values: AddPostFormValuesType) => {
		props.addPost(values.newPostText);
	};

	return (
		<div className={s.newPost}>
			<div>
				<AddNewPostForm onSubmit={onAddPost} />
			</div>
			<div className={s.posts}>{postElements}</div>
		</div>
	);
};

const MyPostsMemorized = React.memo(MyPosts);
export default MyPostsMemorized;
