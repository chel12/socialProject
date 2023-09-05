import React from 'react'
import NewPost from './NewPost/NewPost'
import Post from './Post/Post'

const MyPosts = () => {
  return (
	<div>
	<NewPost/>
	
	<div>
		<Post text='Hello' like='23'/>
		<Post text='Moto Moto' like='2'/>
	</div>
  </div>
  )
}

export default MyPosts