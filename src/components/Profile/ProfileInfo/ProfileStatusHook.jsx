import React, { useEffect, useState } from 'react';
const ProfileStatusHook = (props) => {
	const [status, setStatus] = useState(props.status);
	const [editMode, setEditMode] = useState(false);

	useEffect(() => {
		setStatus(props.status);
	}, [props.status]);

	const activateEditMode = () => {
		setEditMode(true);
	};
	const deactivateEditMode = () => {
		setEditMode(false);
		props.updateStatus(status);
	};

	const onStatusChange = (e) => {
		setStatus(e.currentTarget.value);
	};
	return (
		<div>
			{!editMode && (
				<div>
					<b>Status : </b>
					<span onDoubleClick={activateEditMode}>
						{props.status || 'none status'}
					</span>
				</div>
			)}
			{editMode && (
				<div>
					<input
						onChange={onStatusChange}
						autoFocus={true}
						onBlur={deactivateEditMode}
						value={status}></input>
				</div>
			)}
		</div>
	);
};

export default ProfileStatusHook;
